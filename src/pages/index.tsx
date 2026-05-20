import React from "react";
import Head from "next/head";
import ReadingProgress from "@/components/ReadingProgress";
import SectionNav from "@/components/SectionNav";
import { Reveal, RevealContainer } from "@/components/Reveal";
import ThemeColophon from "@/components/ThemeColophon";

const linkClass =
  "book-link text-[var(--book-ink)] underline decoration-[var(--book-rule)] underline-offset-[3px] hover:decoration-[var(--book-accent)]";

const Meta = () => {
  const title =
    "Anthony Freda — Staff Software Engineer (Distributed Systems, GraphQL, GenAI)";
  const description =
    "Staff-level engineer specializing in scalable systems and AI-augmented development workflows. TypeScript, React, Node.js, Python, Go. Federated GraphQL, distributed systems, RAG, OpenSearch.";
  const url = "https://antfreda.com/";

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
      <meta name="theme-color" content="#0a0a0a" media="(prefers-color-scheme: dark)" />
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

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.28em] text-[var(--book-muted)]"
    >
      {children}
    </h2>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[1.05rem] leading-[1.75] text-[var(--book-ink)]">{children}</p>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5 text-[1.02rem] leading-[1.7] marker:text-[var(--book-muted)]">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function Chapter({
  title,
  company,
  titleRole,
  dates,
  items,
}: {
  title: string;
  company: string;
  titleRole: string;
  dates: string;
  items: string[];
}) {
  return (
    <section className="chapter-block -mx-3 break-inside-avoid rounded-sm px-3 py-2 transition-colors duration-300">
      <header className="mb-4 flex flex-col gap-1 border-b border-[var(--book-rule)] pb-3 sm:flex-row sm:items-baseline sm:justify-between">
        <div>
          <p className="font-sans text-[0.65rem] uppercase tracking-[0.28em] text-[var(--book-muted)]">
            {title}
          </p>
          <h3 className="text-[1.35rem] font-semibold leading-tight text-[var(--book-ink)]">
            <span className="font-normal italic text-[var(--book-muted)]">{company}</span>
            <span className="text-[var(--book-muted)]"> — </span>
            {titleRole}
          </h3>
        </div>
        <p className="shrink-0 font-sans text-[0.7rem] tabular-nums text-[var(--book-muted)]">
          {dates}
        </p>
      </header>
      <Bullets items={items} />
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--book-paper)] text-[var(--book-ink)]">
      <Meta />
      <a
        href="#main"
        className="book-link no-print sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-[var(--book-paper)] focus:px-3 focus:py-2 focus:font-sans focus:text-sm"
      >
        Skip to content
      </a>
      <ReadingProgress />
      <SectionNav />

      <main
        id="main"
        className="mx-auto max-w-[42rem] px-6 pb-20 pt-14 sm:px-10 sm:pt-20"
      >
        <RevealContainer>
          <header className="mb-14 border-b border-[var(--book-rule)] pb-10 text-center sm:text-left">
            <Reveal i={0}>
              <p className="font-sans text-[0.7rem] uppercase tracking-[0.35em] text-[var(--book-muted)]">
                Staff Software Engineer
              </p>
              <h1 className="mt-2 text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-tight text-[var(--book-ink)]">
                Anthony Freda
              </h1>
            </Reveal>
            <Reveal i={1}>
              <div className="mt-8 space-y-4 text-center sm:text-left">
                <p className="text-[1.02rem] italic text-[var(--book-muted)]">Charlotte, NC</p>
                <p className="text-[1.05rem] leading-[1.75] text-[var(--book-ink)]">
                  <a href="mailto:anthonyfreda323@gmail.com" className={linkClass}>
                    anthonyfreda323@gmail.com
                  </a>
                  <span className="text-[var(--book-muted)]"> · </span>
                  <a
                    href="https://www.linkedin.com/in/antfreda323"
                    target="_blank"
                    rel="noreferrer"
                    className={linkClass}
                  >
                    LinkedIn
                  </a>
                  <span className="text-[var(--book-muted)]"> · </span>
                  <a
                    href="https://github.com/Afreda323"
                    target="_blank"
                    rel="noreferrer"
                    className={linkClass}
                  >
                    GitHub
                  </a>
                </p>
                <div className="pt-2">
                  <p className="font-sans text-[0.65rem] uppercase tracking-[0.28em] text-[var(--book-muted)]">
                    Open to opportunities
                  </p>
                  <p className="mt-2 text-[1.05rem] leading-[1.75] text-[var(--book-ink)]">
                    Staff and lead IC roles — <em>remote only</em>.{" "}
                    <a href="mailto:anthonyfreda323@gmail.com" className={linkClass}>
                      Email
                    </a>
                    {" or "}
                    <a
                      href="https://www.linkedin.com/in/antfreda323"
                      target="_blank"
                      rel="noreferrer"
                      className={linkClass}
                    >
                      LinkedIn
                    </a>
                    .
                  </p>
                </div>
              </div>
            </Reveal>
          </header>
        </RevealContainer>

        <RevealContainer>
          <section id="summary" aria-labelledby="summary-heading" className="scroll-mt-20">
            <Reveal i={0}>
              <SectionTitle id="summary-heading">Summary</SectionTitle>
            </Reveal>
            <Reveal i={1} className="mt-4">
              <Prose>
            Staff-level engineer specializing in scalable systems and AI-augmented development
            workflows. Expert in TypeScript, React, Node.js, Python, and Go, with deep experience
            in distributed systems and system design. Proven track record of driving architecture,
            improving developer productivity, and delivering high-impact platforms at scale.
              </Prose>
            </Reveal>
          </section>
        </RevealContainer>

        <RevealContainer className="mt-14">
          <section id="skills" aria-labelledby="skills-heading" className="scroll-mt-20">
            <Reveal i={0}>
              <SectionTitle id="skills-heading">Skills</SectionTitle>
            </Reveal>
            <Reveal i={1} className="mt-4">
          <dl className="space-y-4 text-[0.98rem] leading-[1.65]">
            {(
              [
                ["Languages", "TypeScript, JavaScript (ES6+), Python, Go"],
                ["Frameworks", "React, Next.js, Node.js, NestJS, Tailwind"],
                [
                  "Architecture",
                  "Federated GraphQL (Apollo Federation, DGS), microservices, distributed systems, domain-driven design",
                ],
                [
                  "AI & productivity",
                  "RAG, embeddings, vector databases, Cursor workflows, AI-assisted development",
                ],
                [
                  "Infrastructure",
                  "Docker, GitHub Actions, Vercel, OpenSearch, PostgreSQL, MySQL",
                ],
              ] as const
            ).map(([label, value]) => (
              <div
                key={label}
                className="sm:grid sm:grid-cols-[6.75rem_1fr] sm:gap-x-6"
              >
                <dt className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-[var(--book-muted)] sm:pt-0.5">
                  {label}
                </dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
            </Reveal>
          </section>
        </RevealContainer>

        <RevealContainer className="mt-16">
          <section id="experience" aria-labelledby="experience-heading" className="scroll-mt-20">
            <Reveal i={0}>
              <SectionTitle id="experience-heading">Experience</SectionTitle>
            </Reveal>

          <div className="mt-10 space-y-12">
            <Reveal i={1}>
            <Chapter
              title="I"
              company="Yum Brands"
              titleRole="Lead Software Engineer"
              dates="June 2025 – Present"
              items={[
                "Architected federated GraphQL (Apollo Federation) for nationwide inventory across 3 brands — Taco Bell, Pizza Hut, and KFC",
                "Designed Domain Graph Service architecture for multi-tenant scale and long-term extensibility",
                "Built distributed systems handling 1,000+ requests per second with strong performance and observability",
                "Introduced AI-driven engineering workflows (Cursor + LLM tooling) to improve velocity and code quality",
                "Established spec-driven development to reduce frontend/backend misalignment",
                "Standardized GraphQL and TypeScript patterns to cut tech debt and improve maintainability",
                "Led hiring, mentorship, and onboarding for engineers on a complex distributed platform",
              ]}
            />
            </Reveal>

            <Reveal i={2}>
            <Chapter
              title="II"
              company="DigitalOcean"
              titleRole="Senior Software Engineer II (Tech Lead)"
              dates="Jan 2024 – May 2025"
              items={[
                "Promoted to Tech Lead; mentored and guided a team of 8 engineers",
                "Defined and executed the roadmap for a generative AI agent platform",
                "Built a cloud-native GenAI stack across 4 languages/stacks — Python, Go, MySQL, and TypeScript/React",
                "Enhanced RAG pipelines with multi-agent orchestration and OpenSearch",
                "Implemented function calling for dynamic, context-aware agents",
                "Delivered major React/TypeScript chatbot improvements for customization and accessibility",
                "Migrated GPU workflows to TypeScript/tRPC for better maintainability",
                "Built CI/CD pipelines for seamless deployment",
                "Improved team efficiency through mentorship and process improvements",
              ]}
            />
            </Reveal>

            <Reveal i={3}>
            <Chapter
              title="III"
              company="1V1ME"
              titleRole="Senior Software Engineer"
              dates="June 2022 – January 2024"
              items={[
                "Built user-facing web apps with Next.js, TypeScript, and Tailwind",
                "Developed internal React/TypeScript tools to streamline workflows",
                "Implemented CI/CD with GitHub Actions and Vercel",
                "Shipped real-time match viewing with chat and multi-perspective experiences",
                "Built Electron desktop apps with auto-update systems",
                "Integrated payment systems and 3 esports APIs (Call of Duty, Apex Legends, Fortnite)",
                "Partnered with product and engineering on feature planning and execution",
              ]}
            />
            </Reveal>

            <Reveal i={4}>
            <Chapter
              title="IV"
              company="P00LS"
              titleRole="Senior Software Engineer"
              dates="December 2021 – June 2022"
              items={[
                "Built CMS and consumer apps with Next.js, TypeScript, Firebase, and GraphQL",
                "Implemented a gamified ERC20 token earning system",
                "Delivered localization and accessibility features",
              ]}
            />
            </Reveal>

            <Reveal i={5}>
            <Chapter
              title="V"
              company="Movement Mortgage"
              titleRole="Lead Software Engineer"
              dates="April 2021 – December 2021"
              items={[
                "Led hiring and established Agile SDLC processes",
                "Built a custom CRM with React and Redux",
                "Migrated applications from JavaScript to TypeScript",
              ]}
            />
            </Reveal>

            <Reveal i={6}>
            <Chapter
              title="VI"
              company="Diligent Corporation"
              titleRole="Senior Software Engineer"
              dates="December 2019 – April 2021"
              items={[
                "Scaled React/TypeScript applications to serve 200,000+ users",
                "Implemented micro-frontend architecture across multiple products",
              ]}
            />
            </Reveal>

            <Reveal i={7}>
            <Chapter
              title="VII"
              company="Bank of America"
              titleRole="AVP, Senior Software Engineer"
              dates="July 2017 – December 2019"
              items={[
                "Earned 2 performance awards (Gold and Bronze) for exceptional performance",
                "Built scalable Next.js and GraphQL-based applications",
              ]}
            />
            </Reveal>

            <Reveal i={8}>
            <section className="border-t border-[var(--book-rule)] pt-8">
              <h3 className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.2em] text-[var(--book-muted)]">
                Earlier experience
              </h3>
              <Bullets
                items={[
                  "Web Developer — BRK Global Marketing (2017)",
                  "Freelance Full-Stack Developer (2015–2017, 2+ years)",
                ]}
              />
            </section>
            </Reveal>
          </div>
          </section>
        </RevealContainer>

        <footer className="no-print mt-16 border-t border-[var(--book-rule)] pt-8 font-sans text-[0.7rem] text-[var(--book-muted)]">
          <p>© {new Date().getFullYear()} Anthony Freda</p>
          <ThemeColophon />
        </footer>
      </main>
    </div>
  );
}
