import { chapters, profile, skills, YEARS, type Chapter } from "./resume";

/**
 * The pack: one card per resume section, in pull order. Everything a card
 * says comes from resume.ts; this file only adds how each card looks (type,
 * rarity, art) and names each move with a term from the real skills list.
 */
export type CardType = "ai" | "platform" | "web" | "finance" | "early" | "partner";
/** Only the cards about Anthony carry a rarity; no employer is ranked. */
export type Rarity = "standard" | "rare" | "secret";

export type Move = { name: string; text: string; href?: string };

export type Card = {
  id: string;
  /** Big name on the card. */
  name: string;
  /** The line under the art: role or card class. */
  role: string;
  /** Top-right slot, where a monster card would print its HP. */
  stat: string;
  type: CardType;
  rarity: Rarity;
  art: string;
  artAlt: string;
  moves: Move[];
  /** Italic flavour text, when the card has one. */
  flavor?: string;
};

const TYPE_LABEL: Record<CardType, string> = {
  ai: "AI",
  platform: "Platform",
  web: "Web",
  finance: "Finance",
  early: "Early",
  partner: "Partner",
};
export const typeLabel = (t: CardType) => TYPE_LABEL[t];

const job = (id: string): Chapter => {
  const c = chapters.find((x) => x.id === id);
  if (!c) throw new Error(`no chapter ${id}`);
  return c;
};

/** Move names are skills from resume.ts, matched to the bullet they describe. */
function jobCard(
  id: string,
  type: CardType,
  rarity: Rarity,
  artAlt: string,
  moveNames: string[],
): Card {
  const c = job(id);
  const [lead, ...rest] = c.bullets;
  return {
    id,
    name: c.company,
    role: c.role,
    stat: c.dates,
    type,
    rarity,
    art: `/art/${id}.webp`,
    artAlt,
    flavor: lead,
    moves: rest.map((text, k) => ({ name: moveNames[k] ?? "", text })),
  };
}

export const cards: Card[] = [
  {
    id: "trainer",
    name: profile.name,
    role: profile.title,
    stat: `${YEARS} yrs`,
    type: "partner",
    rarity: "rare",
    art: "/art/trainer.webp",
    artAlt: "A blue-grey French bulldog sitting on a developer's desk beside a glowing laptop at night.",
    flavor: profile.line,
    moves: [
      { name: "Based in", text: "Charlotte, NC" },
      { name: "Now", text: `${chapters[0].role} at ${chapters[0].company}` },
    ],
  },
  {
    id: "about",
    name: "About",
    role: "Charlotte, NC",
    stat: "",
    type: "partner",
    rarity: "standard",
    art: "/art/about.webp",
    artAlt: "A street of old oaks and porch lights at golden hour, a city skyline at the end of it.",
    flavor: profile.about[0],
    moves: [
      { name: "Previously", text: profile.about[1] },
      { name: "Product and design", text: profile.about[2] },
    ],
  },
  jobCard("yum", "platform", "standard", "A roadside fast-food strip at dusk, its drive-thrus and food trucks linked by strings of lights.", [
    "Apollo Federation",
    "AI adoption",
    "Spec-driven development",
    "AI pull-request review",
    "",
  ]),
  jobCard("digitalocean", "ai", "standard", "A lighthouse sweeping its beam across a dark sea of glowing drifting pages.", [
    "Hybrid search",
    "Reranking",
    "Tree-sitter",
    "Function calling",
    "",
  ]),
  jobCard("1v1me", "web", "standard", "An esports arena stage with two gaming setups facing off under spotlights.", ["Next.js", "", ""]),
  jobCard("p00ls", "web", "standard", "A stone wishing well overflowing with glowing golden tokens in a forest clearing.", ["GraphQL"]),
  jobCard("movement", "platform", "standard", "A cosy suburban house at dusk with warm glowing windows.", ["React"]),
  jobCard("diligent", "platform", "standard", "An office tower being assembled from glowing modular blocks at dawn.", [""]),
  jobCard("bofa", "finance", "standard", "Gold and bronze medals on red velvet inside an open bank vault.", [""]),
  {
    ...jobCard("earlier", "early", "standard", "A garden-shed workshop at night with an old CRT computer and a warm bulb.", []),
    role: "Web development",
    flavor: undefined,
    // the two roles in resume.ts's "Web Developer, BRK Global Marketing · Freelance full-stack", each said once
    moves: [
      { name: "BRK Global Marketing", text: "Web Developer" },
      { name: "Freelance", text: "Full-stack" },
    ],
  },
  {
    id: "skills",
    name: "Skills",
    role: "Languages, AI, platforms",
    stat: `${skills.reduce((n, g) => n + g.items.length, 0)} skills`,
    type: "partner",
    rarity: "standard",
    art: "/art/skills.webp",
    artAlt: "A signpost of blank arrows on a hilltop under floating violet, teal and coral orbs.",
    moves: skills.map((g) => ({ name: g.group, text: g.items.join(" · ") })),
  },
  {
    id: "contact",
    name: "Contact",
    role: profile.name,
    stat: "",
    type: "partner",
    rarity: "secret",
    art: "/art/contact.webp",
    artAlt: "A red mailbox on a cliff under a shimmering night sky.",
    moves: [
      { name: "Email", text: profile.email, href: `mailto:${profile.email}?subject=${encodeURIComponent("Hello from antfreda.com")}` },
      { name: "LinkedIn", text: profile.linkedin.replace("https://www.", ""), href: profile.linkedin },
      { name: "GitHub", text: profile.github.replace("https://", ""), href: profile.github },
    ],
  },
];

export const TOTAL = cards.length;
