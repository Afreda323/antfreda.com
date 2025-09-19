"use client";
import * as React from "react";
import { Geist_Mono } from "next/font/google";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiRedux,
  SiFramer,
  SiReactquery,
  SiVite,
  SiStorybook,
  SiGraphql,
  SiApollographql,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiGo,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiElasticsearch,
  SiOpensearch,
  SiPrisma,
  SiSupabase,
  SiFirebase,
  SiAlgolia,
  SiDocker,
  SiGithubactions,
  SiVercel,
  SiAmazonwebservices,
  SiGooglecloud,
  SiSentry,
  SiDatadog,
  SiGrafana,
  SiPrometheus,
  SiAuth0,
  SiStripe,
  SiEslint,
  SiPrettier,
  SiVitest,
  SiJest,
  SiOpenapiinitiative,
  SiSwagger,
  SiExpo,
  SiClerk,
  SiShadcnui,
  SiOpenai,
  SiLangchain,
} from "react-icons/si";

const mono = Geist_Mono({ subsets: ["latin"] });

type Tag = "prod" | "recent";
type Skill = {
  title: string;
  icon?: React.ReactNode;
  tags: Tag[]; // no rankings — just where/how you use it
  note?: string; // optional short evidence line
};

export type GroupId =
  | "frontend"
  | "backend"
  | "ai"
  | "data"
  | "infra"
  | "ops"
  | "auth"
  | "tooling";

type Group = { id: GroupId; label: string; items: Skill[] };

export const groups: Group[] = [
  {
    id: "frontend",
    label: "Frontend",
    items: [
      {
        title: "React",
        icon: <SiReact />,
        tags: ["recent"],
      },
      {
        title: "Next.js",
        icon: <SiNextdotjs />,
        tags: ["recent"],
      },
      {
        title: "TypeScript",
        icon: <SiTypescript />,
        tags: ["recent"],
      },
      {
        title: "JavaScript (ES6+)",
        icon: <SiJavascript />,
        tags: ["recent"],
      },
      {
        title: "Tailwind CSS",
        icon: <SiTailwindcss />,
        tags: ["recent"],
      },
      {
        title: "shadcn/ui",
        icon: <SiShadcnui />,
        tags: ["recent"],
      },
      {
        title: "React Native (Expo)",
        icon: <SiExpo />,
        tags: ["recent"],
      },
      { title: "Redux / RTK", icon: <SiRedux />, tags: [] },
      {
        title: "React Query",
        icon: <SiReactquery />,
        tags: ["recent"],
      },
      { title: "Framer Motion", icon: <SiFramer />, tags: ["recent"] },
      { title: "Vite", icon: <SiVite />, tags: ["recent"] },
      { title: "Storybook", icon: <SiStorybook />, tags: [] },
    ],
  },
  {
    id: "backend",
    label: "Backend & APIs",
    items: [
      {
        title: "Node.js",
        icon: <SiNodedotjs />,
        tags: ["recent"],
      },
      {
        title: "GraphQL",
        icon: <SiGraphql />,
        tags: ["recent"],
      },
      {
        title: "Apollo Federation / DGS",
        icon: <SiApollographql />,
        tags: ["recent"],
      },
      {
        title: "REST APIs",
        icon: <SiExpress />,
        tags: ["recent"],
      },
      { title: "Go (Golang)", icon: <SiGo />, tags: [] },
      { title: "Python", icon: <SiPython />, tags: [] },
      {
        title: "OpenAPI / Swagger",
        icon: <SiOpenapiinitiative />,
        tags: [],
      },
    ],
  },
  {
    id: "ai",
    label: "AI & Search",
    items: [
      {
        title: "OpenAI / LLM apps",
        icon: <SiOpenai />,
        tags: ["recent"],
      },
      {
        title: "LangChain",
        icon: <SiLangchain />,
        tags: ["recent"],
      },
      {
        title: "RAG Pipelines",
        icon: <SiElasticsearch />,
        tags: ["recent"],
      },
      {
        title: "OpenSearch",
        icon: <SiOpensearch />,
        tags: ["recent"],
      },
      { title: "Algolia", icon: <SiAlgolia />, tags: [] },
    ],
  },
  {
    id: "data",
    label: "Data & Storage",
    items: [
      {
        title: "PostgreSQL",
        icon: <SiPostgresql />,
        tags: ["recent"],
      },
      {
        title: "Prisma",
        icon: <SiPrisma />,
        tags: ["recent"],
      },
      { title: "MySQL", icon: <SiMysql />, tags: ["recent"] },
      { title: "MongoDB", icon: <SiMongodb />, tags: [] },
      { title: "Firebase", icon: <SiFirebase />, tags: [] },
      { title: "Redis (caching)", icon: <SiRedis />, tags: ["recent"] },
    ],
  },
  {
    id: "infra",
    label: "Cloud & Infra",
    items: [
      { title: "Docker", icon: <SiDocker />, tags: ["recent"] },
      {
        title: "GitHub Actions (CI/CD)",
        icon: <SiGithubactions />,
        tags: ["recent"],
      },
      { title: "Vercel", icon: <SiVercel />, tags: ["recent"] },
      { title: "AWS", icon: <SiAmazonwebservices />, tags: [] },
      {
        title: "GCP (Cloud Functions/Run)",
        icon: <SiGooglecloud />,
        tags: [],
      },
      { title: "Sentry", icon: <SiSentry />, tags: ["recent"] },
      { title: "Datadog", icon: <SiDatadog />, tags: [] },
    ],
  },
  {
    id: "auth",
    label: "Auth & Payments",
    items: [
      { title: "Auth0", icon: <SiAuth0 />, tags: [] },
      { title: "Clerk", icon: <SiClerk />, tags: [] },
      { title: "Stripe", icon: <SiStripe />, tags: [] },
    ],
  },
  {
    id: "tooling",
    label: "Tooling & Tests",
    items: [
      { title: "ESLint", icon: <SiEslint />, tags: ["recent"] },
      { title: "Prettier", icon: <SiPrettier />, tags: ["recent"] },
      { title: "Vitest", icon: <SiVitest />, tags: ["recent"] },
      { title: "Jest", icon: <SiJest />, tags: [] },
      { title: "Swagger UI", icon: <SiSwagger />, tags: [] },
    ],
  },
];

const TAG_LABEL: Record<Tag, string> = {
  prod: "production",
  recent: "recent",
};

function TagPill({ t }: { t: Tag }) {
  const style =
    t === "prod"
      ? "text-emerald-300/90 ring-emerald-500/30"
      : t === "recent"
      ? "text-cyan-300/90 ring-cyan-500/30"
      : "text-zinc-300 ring-white/15";
  return (
    <span
      className={`${mono.className} rounded-full px-2 py-[2px] text-[10px] ring-1 ${style}`}
    >
      {TAG_LABEL[t]}
    </span>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-xs ring-1 transition
        ${
          active
            ? "bg-white/10 ring-cyan-500/40 text-cyan-200"
            : "bg-white/5 ring-white/10 text-zinc-300 hover:bg-white/7 hover:text-zinc-200"
        }`}
    >
      {children}
    </button>
  );
}

export default function SkillsMatrixTagged() {
  const [group, setGroup] = React.useState<GroupId | "all">("all");
  const [expanded, setExpanded] = React.useState<Record<GroupId, boolean>>(
    {} as any
  );

  const COPY =
    "Next.js · TypeScript · GraphQL (Apollo Federation) · Node.js · PostgreSQL · OpenSearch · Docker · GitHub Actions · Vercel";
  const [copied, setCopied] = React.useState(false);

  const groupss = groups.filter((g) => group === "all" || g.id === group);

  return (
    <div>
      {/* top bar: filters + copy stack */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span
          className={`${mono.className} sm:text-base text-sm text-zinc-500`}
        >
          // view:
        </span>
        <FilterPill active={group === "all"} onClick={() => setGroup("all")}>
          all
        </FilterPill>
        {groups.map((g) => (
          <FilterPill
            key={g.id}
            active={group === g.id}
            onClick={() => setGroup(g.id)}
          >
            {g.label.toLowerCase()}
          </FilterPill>
        ))}
      </div>

      {/* groups */}
      <div className="grid sm:grid-cols-2 gap-6">
        {groupss.map((g) => {
          const showAll = expanded[g.id];
          const visible = showAll ? g.items : g.items.slice(0, 6);

          return (
            <section
              key={g.id}
              aria-label={g.label}
              className="rounded-lg bg-black ring-1 ring-white/10 p-3"
            >
              <header className="mb-2 flex items-center justify-between">
                <h3 className="text-zinc-100 text-lg font-medium">{g.label}</h3>
              </header>

              <ul className="space-y-2">
                {visible.map((s) => (
                  <li
                    key={s.title}
                    className="flex items-start justify-between gap-3"
                  >
                    <div className="flex items-center gap-2 text-zinc-300">
                      {s.icon ? (
                        <span className="h-4 w-4 shrink-0 opacity-70">
                          {s.icon}
                        </span>
                      ) : (
                        <span className="h-4 w-4 shrink-0 opacity-20">•</span>
                      )}
                      <span className="text-base">{s.title}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {s.tags.map((t) => (
                        <TagPill key={s.title + t} t={t} />
                      ))}
                    </div>
                  </li>
                ))}
              </ul>

              {g.items.length > 6 && (
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={() =>
                      setExpanded((e) => ({ ...e, [g.id]: !e[g.id] }))
                    }
                    className={`${mono.className} text-sm text-cyan-300 hover:text-cyan-200`}
                    aria-expanded={!!showAll}
                  >
                    {showAll ? "– show less" : "+ show more"}
                  </button>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
