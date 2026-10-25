// Single source of truth for site copy and planet layout.
// Copy mirrors the approved master resume; do not add unverified metrics.

/** The first year on the timeline below ("Before that", 2015). Every "N+ years" on the site comes from it, so the count can't contradict the dates. */
export const START_YEAR = 2015;
const years = new Date().getFullYear() - START_YEAR;
/** Rounded down to a clean figure: 11 years reads "10+". */
export const YEARS = `${years >= 10 ? Math.floor(years / 5) * 5 : years}+`;

export const profile = {
  name: "Anthony Freda",
  title: "Lead Software Engineer",
  line: "I build AI agents, the tooling around them, and the platforms they run on.",
  email: "anthonyfreda323@gmail.com",
  github: "https://github.com/Afreda323",
  linkedin: "https://www.linkedin.com/in/antfreda323",
  about: [
    "I'm a lead software engineer. Right now I lead zero-to-one platform work and team-wide AI adoption at Yum Brands.",
    "Before that I built customer-facing retrieval at DigitalOcean: hybrid search, query expansion, reranking, and the evaluations to choose between them.",
    `I've been shipping production software for ${YEARS} years, and I spend about half my week on product and design.`,
  ],
  /** Off the clock. The dog is named here and nowhere else on the site. */
  home: "I live in Charlotte with my wife and our French bulldog, Ellie. She's the one on the pack.",
};

export const skills = [
  { group: "Languages", items: ["TypeScript", "JavaScript", "Python", "Go"] },
  {
    group: "AI & retrieval",
    items: [
      "RAG",
      "Hybrid search",
      "Query expansion",
      "Reranking",
      "Retrieval evaluation",
      "Tree-sitter",
      "OpenSearch",
      "Agent workflows",
      "Function calling",
    ],
  },
  {
    group: "Platforms",
    items: [
      "React",
      "Next.js",
      "Node.js",
      "GraphQL",
      "Apollo Federation",
      "PostgreSQL",
      "MySQL",
      "Docker",
      "GitHub Actions",
      "Spec-driven development",
    ],
  },
] as const;

/** Landmark model under /public/models/<name>.glb; a primitive stands in until it exists. */
export type Landmark =
  | "doghouse"
  | "tree"
  | "foodstand"
  | "lighthouse"
  | "arcade"
  | "well"
  | "house"
  | "office"
  | "bank"
  | "shed"
  | "signpost"
  | "mailbox";

/** Every model the planet can load, in walk order, plus the player character. */
export const modelNames = [
  "dog",
  "doghouse",
  "tree",
  "foodstand",
  "lighthouse",
  "arcade",
  "well",
  "house",
  "office",
  "bank",
  "shed",
  "signpost",
  "mailbox",
] as const;

export type Chapter = {
  id: string;
  company: string;
  role: string;
  dates: string;
  bullets: string[];
  /** The breadth of the role, confirmed by Anthony (not a resume bullet). */
  scope?: string;
  landmark?: Landmark;
};

export const chapters: Chapter[] = [
  {
    id: "yum",
    company: "Yum Brands",
    role: "Lead Software Engineer",
    dates: "2025 – now",
    landmark: "foodstand",
    bullets: [
      "Leading zero-to-one development of a federated GraphQL inventory platform, driving the major architecture decisions ahead of planned store production use in 2027.",
      "Designed the Domain Graph Service architecture for a multi-tenant platform on Apollo Federation, with shared GraphQL and TypeScript patterns.",
      "Drove AI-assisted development across the team. Every engineer now uses AI daily.",
      "Set up shared AI instructions and codebase context, and introduced spec-driven development.",
      "Shipped automated AI pull-request review with final human sign-off, plus reusable AI tooling for team workflows.",
      "Lead hiring, mentorship, and onboarding for a complex distributed system.",
    ],
  },
  {
    id: "digitalocean",
    company: "DigitalOcean",
    role: "Senior Software Engineer II",
    dates: "2024 – 2025",
    landmark: "lighthouse",
    // confirmed by Anthony, 2026-10-25: he worked across the whole AI platform, not one feature
    scope: "Worked across DigitalOcean's entire AI platform: agents, function calling, retrieval and evaluations.",
    bullets: [
      "Technical lead on the GenAI agent platform, guiding engineers and shaping the roadmap.",
      "Personally implemented hybrid search and query expansion for RAG capabilities released to customers.",
      "Implemented reranking and wrote evaluations comparing retrieval strategies and configurations.",
      "Used Tree-sitter to parse code into searchable chunks for RAG pipelines.",
      "Built agent function calling and OpenSearch retrieval across Python, Go, MySQL, TypeScript, and React.",
      "Delivered chatbot customization and accessibility work; migrated GPU workflows to TypeScript and tRPC.",
    ],
  },
  {
    id: "1v1me",
    company: "1V1ME",
    role: "Senior Software Engineer",
    dates: "2022 – 2024",
    landmark: "arcade",
    bullets: [
      "Built Next.js, TypeScript, and Tailwind apps, including real-time match viewing with chat and multiple viewing perspectives.",
      "Developed Electron desktop apps with automatic updates.",
      "Integrated payments and esports APIs for Call of Duty, Apex Legends, and Fortnite.",
    ],
  },
  {
    id: "p00ls",
    company: "P00LS",
    role: "Senior Software Engineer",
    dates: "2021 – 2022",
    landmark: "well",
    bullets: [
      "Built content management and consumer apps with Next.js, TypeScript, Firebase, and GraphQL.",
      "Implemented a gamified ERC20 token earning system; delivered localization and accessibility features.",
    ],
  },
  {
    id: "movement",
    company: "Movement Mortgage",
    role: "Lead Software Engineer",
    dates: "2021",
    landmark: "house",
    bullets: [
      "Led hiring and set up Agile development processes.",
      "Built a custom CRM in React and Redux; migrated applications from JavaScript to TypeScript.",
    ],
  },
  {
    id: "diligent",
    company: "Diligent",
    role: "Senior Software Engineer",
    dates: "2019 – 2021",
    landmark: "office",
    bullets: [
      "Built and scaled React and TypeScript applications across multiple products.",
      "Implemented a micro-frontend architecture.",
    ],
  },
  {
    id: "bofa",
    company: "Bank of America",
    role: "AVP, Senior Software Engineer",
    dates: "2017 – 2019",
    landmark: "bank",
    bullets: ["Built Next.js and GraphQL applications.", "Received Gold and Bronze performance awards."],
  },
  {
    id: "earlier",
    company: "Before that",
    role: "Web Developer, BRK Global Marketing · Freelance full-stack",
    dates: "2015 – 2017",
    landmark: "shed",
    bullets: [],
  },
];

export type Section = { id: string; label: string; landmark?: Landmark };

/** Every scroll section in order; drives nav, ⌘K and where the planet stops. */
export const sections: Section[] = [
  { id: "hero", label: "Start", landmark: "doghouse" },
  { id: "about", label: "About", landmark: "tree" },
  ...chapters.map((c) => ({ id: c.id, label: c.company, landmark: c.landmark })),
  { id: "skills", label: "Skills", landmark: "signpost" },
  { id: "contact", label: "Contact", landmark: "mailbox" },
];
