import { NextResponse } from "next/server";

export const revalidate = 60; // Cache for 60 seconds

const GITHUB_USERNAME = "duvvadavinay-hub";
const FALLBACK_COMMITS = 48;
const FALLBACK_REPOS = 4;

export async function GET() {
  try {
    let repos = FALLBACK_REPOS;
    let commits = FALLBACK_COMMITS;

    // 1. Fetch public profile for real-time repository count
    try {
      const headers: Record<string, string> = {
        "User-Agent": "portfolio-github-telemetry",
      };
      if (process.env.GITHUB_TOKEN) {
        headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
      }

      const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
        headers,
        next: { revalidate: 60 },
      });

      if (userRes.ok) {
        const userData = await userRes.json();
        if (typeof userData.public_repos === "number") {
          repos = userData.public_repos;
        }
      }
    } catch {
      // Use fallback if rate-limited or offline
    }

    // 2. Fetch real-time commit/contribution telemetry
    try {
      const contribRes = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
        { next: { revalidate: 60 } }
      );

      if (contribRes.ok) {
        const contribData = await contribRes.json();
        const total = contribData?.total?.lastYear;
        if (typeof total === "number" && total > 0) {
          commits = total;
        }
      }
    } catch {
      // Use fallback if rate-limited or offline
    }

    return NextResponse.json({
      commits,
      repos,
      username: GITHUB_USERNAME,
    });
  } catch {
    return NextResponse.json({
      commits: FALLBACK_COMMITS,
      repos: FALLBACK_REPOS,
      username: GITHUB_USERNAME,
    });
  }
}
