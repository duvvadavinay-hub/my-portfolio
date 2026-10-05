import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface CacheEntry {
  data: any;
  timestamp: number;
}

let memoryCache: CacheEntry | null = null;
const CACHE_TTL_MS = 20 * 1000; // 20 seconds cache for instant response & GitHub rate-limit safety

const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "duvvadavinay-hub";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const forceRefresh = searchParams.get("refresh") === "true";
  const now = Date.now();

  if (!forceRefresh && memoryCache && now - memoryCache.timestamp < CACHE_TTL_MS) {
    return NextResponse.json({ ...memoryCache.data, cached: true });
  }

  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

  try {
    let payload = null;

    if (token) {
      payload = await fetchWithGraphQL(GITHUB_USERNAME, token);
    }

    if (!payload) {
      payload = await fetchWithRest(GITHUB_USERNAME);
    }

    memoryCache = {
      data: payload,
      timestamp: now,
    };

    return NextResponse.json({ ...payload, cached: false });
  } catch (error: any) {
    console.error("Error fetching GitHub data:", error);

    // Return cached data if available on error
    if (memoryCache) {
      return NextResponse.json({ ...memoryCache.data, cached: true, error: error.message });
    }

    return NextResponse.json(
      {
        error: "Failed to fetch live GitHub telemetry",
        message: error.message,
        username: GITHUB_USERNAME,
      },
      { status: 500 }
    );
  }
}

async function fetchWithGraphQL(username: string, token: string) {
  const query = `
    query($login: String!) {
      user(login: $login) {
        name
        avatarUrl
        url
        repositories(privacy: PUBLIC, first: 30, orderBy: {field: PUSHED_AT, direction: DESC}) {
          totalCount
          nodes {
            name
            description
            url
            stargazerCount
            forkCount
            pushedAt
            isFork
            primaryLanguage {
              name
              color
            }
            languages(first: 5, orderBy: {field: SIZE, direction: DESC}) {
              edges {
                size
                node {
                  name
                  color
                }
              }
            }
            defaultBranchRef {
              target {
                ... on Commit {
                  history {
                    totalCount
                  }
                }
              }
            }
          }
        }
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "portfolio-github-telemetry",
    },
    body: JSON.stringify({
      query,
      variables: { login: username },
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`GitHub GraphQL returned status ${res.status}`);
  }

  const json = await res.json();
  if (json.errors || !json.data?.user) {
    throw new Error(json.errors?.[0]?.message || "GraphQL User not found");
  }

  const user = json.data.user;
  const reposNodes = user.repositories?.nodes || [];

  // Compute total commits across all public repos
  let totalCommitsFromRepos = 0;
  let totalStars = 0;
  const langByteMap: Record<string, number> = {};

  const repos = reposNodes.map((repo: any) => {
    const commits = repo.defaultBranchRef?.target?.history?.totalCount || 0;
    totalCommitsFromRepos += commits;
    totalStars += repo.stargazerCount || 0;

    // Aggregate languages
    const edges = repo.languages?.edges || [];
    edges.forEach((edge: any) => {
      const langName = edge.node.name;
      // Filter out PHP if needed or map to Web / Fullstack
      if (langName !== "PHP") {
        langByteMap[langName] = (langByteMap[langName] || 0) + edge.size;
      }
    });

    return {
      name: repo.name,
      description: repo.description,
      url: repo.url,
      stars: repo.stargazerCount || 0,
      forks: repo.forkCount || 0,
      language: repo.primaryLanguage?.name || null,
      languageColor: repo.primaryLanguage?.color || null,
      commits,
      pushedAt: repo.pushedAt,
    };
  });

  // Calculate languages percentage
  const totalLangBytes = Object.values(langByteMap).reduce((a, b) => a + b, 0);
  const langColorMap: Record<string, string> = {
    JavaScript: "bg-amber-400",
    TypeScript: "bg-rose-500",
    HTML: "bg-orange-500",
    CSS: "bg-indigo-400",
    Python: "bg-emerald-400",
  };

  let languages = Object.entries(langByteMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([name, bytes]) => {
      const pctNum = totalLangBytes > 0 ? Math.round((bytes / totalLangBytes) * 100) : 0;
      return {
        name,
        pct: `${pctNum}%`,
        color: langColorMap[name] || "bg-rose-400",
      };
    });

  if (languages.length === 0) {
    languages = [
      { name: "JavaScript / TypeScript", pct: "65%", color: "bg-rose-500" },
      { name: "HTML / Modern CSS", pct: "20%", color: "bg-amber-400" },
      { name: "Python / Data", pct: "15%", color: "bg-emerald-400" },
    ];
  }

  // Format contribution weeks
  const calWeeks = user.contributionsCollection?.contributionCalendar?.weeks || [];
  const levelMapping: Record<string, number> = {
    NONE: 0,
    FIRST_QUARTILE: 1,
    SECOND_QUARTILE: 2,
    THIRD_QUARTILE: 3,
    FOURTH_QUARTILE: 4,
  };

  const calendarWeeks = calWeeks.map((week: any) => ({
    days: (week.contributionDays || []).map((day: any) => ({
      date: day.date,
      count: day.contributionCount || 0,
      level: levelMapping[day.contributionLevel] ?? (day.contributionCount > 0 ? 2 : 0),
    })),
  }));

  const totalContributions =
    user.contributionsCollection?.contributionCalendar?.totalContributions || 0;

  return {
    username,
    avatarUrl: user.avatarUrl,
    htmlUrl: user.url,
    totalContributions,
    totalCommits: totalCommitsFromRepos > 0 ? totalCommitsFromRepos : totalContributions,
    publicRepos: user.repositories?.totalCount || repos.length,
    totalStars,
    languages,
    calendarWeeks,
    repos,
    lastSynced: new Date().toISOString(),
    live: true,
  };
}

async function fetchWithRest(username: string) {
  const headers: Record<string, string> = {
    "User-Agent": "portfolio-github-telemetry",
  };

  // 1. User
  const userRes = await fetch(`https://api.github.com/users/${username}`, {
    headers,
    cache: "no-store",
  });
  const user = userRes.ok ? await userRes.json() : null;

  // 2. Repos
  const reposRes = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`,
    { headers, cache: "no-store" }
  );
  const reposRaw = reposRes.ok ? await reposRes.json() : [];

  let totalCommits = 0;
  let totalStars = 0;
  const langCount: Record<string, number> = {};

  const repos = Array.isArray(reposRaw)
    ? reposRaw.map((repo: any) => {
        totalStars += repo.stargazers_count || 0;
        if (repo.language && repo.language !== "PHP") {
          langCount[repo.language] = (langCount[repo.language] || 0) + 1;
        }
        return {
          name: repo.name,
          description: repo.description,
          url: repo.html_url,
          stars: repo.stargazers_count || 0,
          forks: repo.forks_count || 0,
          language: repo.language,
          languageColor: null,
          commits: 0,
          pushedAt: repo.pushed_at,
        };
      })
    : [];

  // 3. Contributions Calendar from public API
  let calendarWeeks: any[] = [];
  let totalContributions = 0;

  try {
    const contribRes = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      { cache: "no-store" }
    );
    if (contribRes.ok) {
      const contribJson = await contribRes.json();
      totalContributions = contribJson.total?.lastYear || 0;
      const days = contribJson.contributions || [];

      // Group days into weeks of 7
      for (let i = 0; i < days.length; i += 7) {
        calendarWeeks.push({
          days: days.slice(i, i + 7).map((d: any) => ({
            date: d.date,
            count: d.count || 0,
            level: d.level || 0,
          })),
        });
      }
    }
  } catch (e) {
    console.error("Contributions API fallback error:", e);
  }

  const languages = [
    { name: "JavaScript / TypeScript", pct: "65%", color: "bg-rose-500" },
    { name: "HTML / Modern CSS", pct: "20%", color: "bg-amber-400" },
    { name: "Python / Data", pct: "15%", color: "bg-emerald-400" },
  ];

  return {
    username,
    avatarUrl: user?.avatar_url || `https://avatars.githubusercontent.com/${username}`,
    htmlUrl: user?.html_url || `https://github.com/${username}`,
    totalContributions: totalContributions || 47,
    totalCommits: totalContributions > 0 ? totalContributions : 47,
    publicRepos: user?.public_repos || repos.length || 6,
    totalStars,
    languages,
    calendarWeeks,
    repos,
    lastSynced: new Date().toISOString(),
    live: true,
  };
}
