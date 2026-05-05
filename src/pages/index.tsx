import React from "react";
import Head from "next/head";
import { useTheme } from "next-themes";

const Meta = () => {
  const title =
    "Anthony Freda — Staff Software Engineer (Distributed Systems, GraphQL, GenAI)";
  const description =
    "Staff-level engineer specializing in scalable systems and AI-augmented development workflows. TypeScript/React/Node.js, Python, Go. Federated GraphQL, distributed systems, RAG, OpenSearch.";
  const url = "https://antfreda.com/";

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="theme-color" content="#0a0a0a" />
      <link rel="canonical" href={url} />

      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="Anthony Freda, Staff Engineer, Staff Software Engineer, Distributed Systems, System Design, TypeScript, React, Next.js, Node.js, Python, Go, GraphQL, Apollo Federation, DGS, Microservices, RAG, OpenSearch, GenAI, LLM, AI Engineering"
      />
      <meta name="author" content="Anthony Freda" />
      <meta name="robots" content="index,follow" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Anthony Freda" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Anthony Freda",
            url,
            email: "mailto:anthonyfreda323@gmail.com",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Charlotte",
              addressRegion: "NC",
              addressCountry: "US",
            },
            jobTitle: "Staff Software Engineer",
            knowsAbout: [
              "Distributed systems",
              "System design",
              "TypeScript",
              "React",
              "Next.js",
              "Node.js",
              "Python",
              "Go",
              "GraphQL",
              "Apollo Federation",
              "Domain Graph Service (DGS)",
              "Microservices",
              "RAG",
              "OpenSearch",
              "LLM application development",
            ],
            sameAs: [
              "https://www.linkedin.com/in/antfreda323",
              "https://github.com/Afreda323",
            ],
          }),
        }}
      />
    </Head>
  );
};

/* --------------------------------
   Page
--------------------------------- */
export default function Home() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-screen bg-white text-zinc-950 dark:bg-black dark:text-zinc-100">
      <Meta />
      <main className="mx-auto max-w-3xl px-6 py-14 sm:py-20 text-[15px] leading-7">
        <header className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.08]">
              Anthony Freda
            </h1>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300">
              Staff-level engineer specializing in scalable systems and AI-augmented
              development workflows.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-zinc-700 dark:text-zinc-300">
            <span className="text-zinc-600 dark:text-zinc-400">Charlotte, NC</span>
            <span className="text-zinc-300 dark:text-zinc-700">·</span>
            <a
              className="underline underline-offset-4 decoration-zinc-300 hover:decoration-zinc-950 dark:decoration-zinc-700 dark:hover:decoration-zinc-200"
              href="mailto:anthonyfreda323@gmail.com"
            >
              anthonyfreda323@gmail.com
            </a>
            <span className="text-zinc-300 dark:text-zinc-700">·</span>
            <a
              className="underline underline-offset-4 decoration-zinc-300 hover:decoration-zinc-950 dark:decoration-zinc-700 dark:hover:decoration-zinc-200"
              href="https://www.linkedin.com/in/antfreda323"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <span className="text-zinc-300 dark:text-zinc-700">·</span>
            <a
              className="underline underline-offset-4 decoration-zinc-300 hover:decoration-zinc-950 dark:decoration-zinc-700 dark:hover:decoration-zinc-200"
              href="https://github.com/Afreda323"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
        </header>

        <section className="mt-12 space-y-4 border-t border-zinc-200/70 dark:border-white/10 pt-8">
          <h2 className="text-xl font-semibold tracking-tight">Summary</h2>
          <p className="leading-relaxed text-zinc-800 dark:text-zinc-200">
            Staff-level engineer building <strong>AI-enabled platforms</strong> and{" "}
            <strong>distributed systems</strong> end-to-end. Deep experience in{" "}
            <strong>RAG</strong>, <strong>multi-agent orchestration</strong>,{" "}
            <strong>embeddings</strong>, and <strong>search</strong> (OpenSearch), plus{" "}
            <strong>GraphQL federation</strong> and system design at scale. Expert in{" "}
            <strong>TypeScript</strong>, <strong>React</strong>, <strong>Node.js</strong>,{" "}
            <strong>Python</strong>, and <strong>Go</strong>, with a track record of driving
            architecture, improving developer productivity with{" "}
            <strong>AI-augmented workflows</strong>, and shipping high-impact systems.
          </p>
        </section>

        <section className="mt-12 space-y-3 border-t border-zinc-200/70 dark:border-white/10 pt-8">
          <h2 className="text-xl font-semibold tracking-tight">Skills</h2>
          <dl className="grid gap-x-6 gap-y-2 text-sm leading-relaxed text-zinc-800 dark:text-zinc-200 sm:grid-cols-[140px_1fr]">
            <dt className="font-semibold text-zinc-950 dark:text-zinc-100">
              Languages
            </dt>
            <dd>TypeScript, JavaScript (ES6+), Python, Go</dd>

            <dt className="font-semibold text-zinc-950 dark:text-zinc-100">
              Frameworks
            </dt>
            <dd>React, Next.js, Node.js, NestJS, Tailwind</dd>

            <dt className="font-semibold text-zinc-950 dark:text-zinc-100">
              Architecture
            </dt>
            <dd>
              Federated GraphQL (Apollo Federation, DGS), Microservices, Distributed Systems,
              Domain-Driven Design
            </dd>

            <dt className="font-semibold text-zinc-950 dark:text-zinc-100">
              AI & Productivity
            </dt>
            <dd>RAG, embeddings, vector databases, Cursor workflows, AI-assisted development</dd>

            <dt className="font-semibold text-zinc-950 dark:text-zinc-100">
              Infrastructure
            </dt>
            <dd>Docker, GitHub Actions, Vercel, OpenSearch, PostgreSQL, MySQL</dd>
          </dl>
        </section>

        <section className="mt-12 space-y-6 border-t border-zinc-200/70 dark:border-white/10 pt-8">
          <h2 className="text-xl font-semibold tracking-tight">Experience</h2>

          <article className="space-y-2">
            <header className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <h3 className="font-semibold tracking-tight">
                <strong>Yum Brands</strong> — Lead Software Engineer
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                June 2025 – Present
              </p>
            </header>
            <ul className="list-disc pl-5 space-y-1 text-sm text-zinc-800 dark:text-zinc-200">
              <li>
                Architected a <strong>federated GraphQL</strong> platform (Apollo Federation) powering nationwide inventory systems
                across <strong>Taco Bell</strong>, <strong>Pizza Hut</strong>, and <strong>KFC</strong>.
              </li>
              <li>
                Designed <strong>Domain Graph Service (DGS)</strong> architecture enabling multi-tenant scalability and long-term extensibility.
              </li>
              <li>
                Introduced <strong>AI-driven engineering workflows</strong> (Cursor + LLM tooling) to improve developer velocity and code quality.
              </li>
              <li>
                Established <strong>spec-driven development</strong> and standardized GraphQL + TypeScript patterns.
              </li>
            </ul>
          </article>

          <article className="space-y-2 border-t border-zinc-200/50 dark:border-white/10 pt-6">
            <header className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <h3 className="font-semibold tracking-tight">
                <strong>DigitalOcean</strong> — Senior Software Engineer II (Tech Lead)
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Jan 2024 – May 2025
              </p>
            </header>
            <ul className="list-disc pl-5 space-y-1 text-sm text-zinc-800 dark:text-zinc-200">
              <li>
                Promoted to <strong>Tech Lead</strong>, mentoring and guiding a{" "}
                <strong>team of 8</strong> engineers.
              </li>
              <li>
                Defined and executed roadmap for a <strong>Generative AI agent platform</strong>.
              </li>
              <li>
                Built a <strong>cloud-native GenAI platform</strong> across{" "}
                <strong>Python</strong>, <strong>Go</strong>, <strong>MySQL</strong>, and{" "}
                <strong>TypeScript/React</strong>.
              </li>
              <li>
                Enhanced <strong>RAG pipelines</strong> with multi-agent orchestration and{" "}
                <strong>OpenSearch</strong>.
              </li>
              <li>
                Implemented <strong>function calling</strong> for dynamic, context-aware agents.
              </li>
            </ul>
          </article>

          <article className="space-y-2 border-t border-zinc-200/50 dark:border-white/10 pt-6">
            <header className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <h3 className="font-semibold tracking-tight">
                <strong>1V1ME</strong> — Senior Software Engineer
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                June 2022 – Jan 2024
              </p>
            </header>
            <ul className="list-disc pl-5 space-y-1 text-sm text-zinc-800 dark:text-zinc-200">
              <li>
                Built web apps with <strong>Next.js</strong>, <strong>TypeScript</strong>, and{" "}
                <strong>Tailwind</strong>, plus internal React tools.
              </li>
              <li>
                Implemented <strong>CI/CD</strong> using <strong>GitHub Actions</strong> and{" "}
                <strong>Vercel</strong>.
              </li>
              <li>
                Built a <strong>real-time</strong> match viewing experience with chat and multi-perspective viewing.
              </li>
              <li>
                Developed <strong>Electron</strong> desktop apps with auto-updates; integrated payments and esports APIs.
              </li>
            </ul>
          </article>

          <article className="space-y-2 border-t border-zinc-200/50 dark:border-white/10 pt-6">
            <header className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <h3 className="font-semibold tracking-tight">
                <strong>P00LS</strong> — Senior Software Engineer
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Dec 2021 – June 2022
              </p>
            </header>
            <ul className="list-disc pl-5 space-y-1 text-sm text-zinc-800 dark:text-zinc-200">
              <li>
                Built CMS and consumer apps using <strong>Next.js</strong>,{" "}
                <strong>TypeScript</strong>, <strong>Firebase</strong>, and{" "}
                <strong>GraphQL</strong>.
              </li>
              <li>
                Implemented a gamified <strong>ERC20 token</strong> earning system and
                delivered <strong>localization</strong> + <strong>accessibility</strong>{" "}
                features.
              </li>
            </ul>
          </article>

          <article className="space-y-2 border-t border-zinc-200/50 dark:border-white/10 pt-6">
            <header className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <h3 className="font-semibold tracking-tight">
                <strong>Movement Mortgage</strong> — Lead Software Engineer
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Apr 2021 – Dec 2021
              </p>
            </header>
            <ul className="list-disc pl-5 space-y-1 text-sm text-zinc-800 dark:text-zinc-200">
              <li>
                Led <strong>hiring</strong> and established <strong>Agile SDLC</strong>{" "}
                processes.
              </li>
              <li>
                Built a custom <strong>CRM</strong> using <strong>React/Redux</strong>;
                migrated apps from <strong>JavaScript → TypeScript</strong>.
              </li>
            </ul>
          </article>

          <section className="pt-6 border-t border-zinc-200/50 dark:border-white/10">
            <h3 className="font-semibold tracking-tight">Earlier experience</h3>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              <strong>Diligent Corporation</strong> (Dec 2019 – Apr 2021) ·{" "}
              <strong>Bank of America</strong> (Jul 2017 – Dec 2019) ·{" "}
              <strong>BRK Global Marketing</strong> (2017) ·{" "}
              <strong>Freelance Full-Stack Developer</strong> (2015–2017)
            </p>
          </section>
        </section>

        <footer className="mt-14 border-t border-zinc-200 dark:border-white/10 pt-6 text-xs text-zinc-500">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Anthony Freda</p>
            <div className="flex items-center justify-between gap-3 sm:justify-end">
              <div className="text-zinc-500">
                {mounted ? (
                  <span>
                    theme:{" "}
                    <span className="text-zinc-700 dark:text-zinc-300">
                      {theme === "system" ? `system (${resolvedTheme})` : theme}
                    </span>
                  </span>
                ) : (
                  <span>theme: …</span>
                )}
              </div>
              <div className="inline-flex rounded-full border border-zinc-200 dark:border-white/10 p-1">
                {[
                  ["system", "System"],
                  ["light", "Light"],
                  ["dark", "Dark"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setTheme(value)}
                    className={`rounded-full px-3 py-1 text-[11px] transition ${
                      theme === value
                        ? "bg-zinc-950 text-white dark:bg-white dark:text-black"
                        : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
