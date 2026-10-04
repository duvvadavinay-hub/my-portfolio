export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  role: string;
  year: string;
  liveUrl?: string;
  githubUrl?: string;
  image: string;
  collageImages?: string[];
  collageLabels?: [string, string];
  summary: string;
  overview: string;
  problem: string;
  designProcess: string;
  development: string;
  technologies: string[];
  metrics: { label: string; value: string }[];
  result: string;
  keyFeatures: string[];
}

export const PROJECTS: Project[] = [
  {
    id: "academic-ledger",
    number: "01",
    title: "Academic Ledger",
    category: "Academic Web Application",
    role: "Fullstack Web Developer",
    year: "2026",
    liveUrl: "https://academic-ledger.onrender.com/",
    image: "/images/academic-ledger-dashboard.png",
    collageImages: [
      "/images/academic-ledger-dashboard.png",
      "/images/academic-ledger-login.png",
    ],
    collageLabels: [
      "01 // Live Performance Dashboard",
      "02 // Student Authentication Portal",
    ],
    summary:
      "An independently developed academic web application built from concept through deployment.",
    overview:
      "An independently developed academic web application built from concept through deployment to track, analyze, and manage academic performance.",
    problem:
      "Difficulty in calculating and visualizing cumulative grades, credit requirements, and semester trajectories across multi-course workloads.",
    designProcess:
      "Designed an intuitive dashboard interface providing clear visual previews of academic trajectory and progress metrics.",
    development:
      "Independently engineered from scratch, implementing core calculation logic, database management, and full deployment on Render.",
    technologies: ["JavaScript", "Python", "PostgreSQL", "CSS3", "HTML5", "Render"],
    metrics: [
      { label: "Architecture", value: "Independent Build" },
      { label: "Status", value: "Deployed on Render" },
      { label: "Interface", value: "Dashboard Preview" },
    ],
    result:
      "Successfully created and deployed an independent academic tool giving students direct control over academic tracking.",
    keyFeatures: [
      "Interactive academic dashboard visual preview",
      "Real-time grade and credit calculations",
      "Semester performance trajectory visualization",
      "Cloud deployment on Render",
    ],
  },
  {
    id: "csd-csit-dept",
    number: "02",
    title: "CSD-CSIT Department Website",
    category: "Department Website / UI/UX / PHP",
    role: "Frontend & UI/UX Developer",
    year: "2026",
    liveUrl: "https://srkrcsdcsit.in/",
    image: "/images/csd-csit.png",
    summary:
      "A modern department website focused on improving interface design, user experience and web presentation.",
    overview:
      "A modern department website focused on improving interface design, user experience and web presentation for Computer Science & Design and CSIT students and faculty.",
    problem:
      "Fragmented academic information and lack of intuitive interface design for accessing department roadmaps, notices, and course details.",
    designProcess:
      "Focused on clean typography, responsive layout hierarchy, high contrast readability, and accessible navigation.",
    development:
      "Built with HTML5, CSS3, JavaScript, and PHP with MySQL database integration for managing dynamic notices and department updates.",
    technologies: ["PHP", "JavaScript", "HTML5", "CSS3", "MySQL", "UI/UX Design"],
    metrics: [
      { label: "Deployment", value: "Production Live" },
      { label: "Experience", value: "Modern UI/UX" },
      { label: "Platform", value: "Web / Mobile" },
    ],
    result:
      "Delivered an improved modern interface and streamlined user experience for department web presentation.",
    keyFeatures: [
      "Intuitive course and curriculum presentation",
      "Dynamic department circulars and updates",
      "Responsive navigation across desktop and mobile",
      "Structured faculty and student information",
    ],
  },
  {
    id: "tennis-auction",
    number: "03",
    title: "Tennis League Auction",
    category: "Team Project / Live Auction / Draft Room",
    role: "Frontend Developer",
    year: "2026",
    liveUrl: "https://tennis-p7lb.onrender.com/",
    image: "/images/tennis-auction-live.png",
    collageImages: [
      "/images/tennis-auction-live.png",
      "/images/tennis-auction-admin.png",
    ],
    collageLabels: [
      "01 // Live Stadium Arena Draft Board",
      "02 // Admin Player Pool Management",
    ],
    summary:
      "A collaborative web application designed for the Tennis League Auction in Bhimavaram.",
    overview:
      "A collaborative web application designed for the Tennis League Auction in Bhimavaram featuring a live auction draft room experience.",
    problem:
      "Coordinating in-person player bidding with real-time budget updates, team roster allocations, and dynamic player ratings.",
    designProcess:
      "Crafted player-card style UI, live auction inspired motion, animated transitions, and an interactive draft room dashboard preview.",
    development:
      "Developed collaborative live auction logic, real-time bid tracking, team budget calculation, and interactive draft board state management.",
    technologies: ["React", "JavaScript", "Tailwind CSS", "Framer Motion", "Render"],
    metrics: [
      { label: "Project Type", value: "Team Project" },
      { label: "Deployment", value: "Render Cloud" },
      { label: "Feature", value: "Live Draft Room" },
    ],
    result:
      "Successfully delivered a visually dynamic platform powering the live league auction in Bhimavaram.",
    keyFeatures: [
      "Live auction inspired motion and transitions",
      "Player-card style UI with performance metrics",
      "Real-time franchise budget and bidding counters",
      "Interactive draft room dashboard preview",
    ],
  },
];
