import LogoLoop from "../components/LogoLoop";
import Beams from "@/components/Beams";

import { Geist, Geist_Mono } from "next/font/google";
import React from "react";
import Pill from "@/components/Pill";
import CommandPalette from "@/components/CommandPalette";
import CommandHint from "@/components/CommandHint";
import SectionDivider from "@/components/SectionDivider";
import SectionHeading from "@/components/SectionHeading";
import Role from "@/components/Role";
import StatusBar from "@/components/StatusBar";
import SkillsMatrix, { GroupId, groups } from "@/components/SkillsMatrix";
import ContactLinks from "@/components/Contacts";
import Head from "next/head";
import { Effect } from "@/components/animate-ui/primitives/effects/effect";
import Squares from "@/components/Squares";
import PixelBlast from "@/components/PixelBlast";

const geistSans = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

type LoopItem = { node: React.ReactNode; title: string };

const groupToRow: Record<GroupId, 0 | 1 | 2> = {
  frontend: 0,
  backend: 1,
  ai: 1,
  data: 2,
  infra: 2,
  ops: 2,
  auth: 2,
  tooling: 2,
};

export const [frontendLoop, backendAiLoop, dataInfraOpsLoop] = groups.reduce<
  LoopItem[][]
>(
  (acc, group) => {
    const idx = groupToRow[group.id];
    group.items.forEach((s) => {
      // de-dupe by title within a row
      if (!acc[idx].some((i) => i.title === s.title)) {
        acc[idx].push({
          node: s.icon,
          title: s.title,
        });
      }
    });
    return acc;
  },
  [[], [], []]
);

const Meta = () => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <link rel="canonical" href="https://antfreda.com/" />

      <title>Anthony Freda — Senior Full-Stack Engineer & Tech Lead</title>
      <meta
        name="description"
        content="Senior Full-Stack Engineer shipping scalable backends, crisp UIs, and production-grade AI systems. 9+ years across fintech, SaaS, and GenAI."
      />
      <meta
        name="keywords"
        content="Anthony Freda, Full-Stack Engineer, Tech Lead, TypeScript, React, Next.js, GraphQL, Node.js, OpenSearch, RAG, Generative AI"
      />
      <meta name="author" content="Anthony Freda" />
      <meta name="robots" content="index,follow" />

      <link rel="icon" href="/favicon.ico" />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0ea5e9" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://antfreda.com/" />
      <meta property="og:site_name" content="Anthony Freda" />
      <meta
        property="og:title"
        content="Anthony Freda — Senior Full-Stack Engineer & Tech Lead"
      />
      <meta
        property="og:description"
        content="Building scalable systems, intuitive UIs, and AI-powered platforms."
      />

      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Anthony Freda — Senior Full-Stack Engineer & Tech Lead"
      />
      <meta
        name="twitter:description"
        content="Building scalable systems, intuitive UIs, and AI-powered platforms."
      />
    </Head>
  );
};

/* --------------------------------
   Page
--------------------------------- */
export default function Home() {
  return (
    <div className={`relative  text-zinc-200 ${geistSans.className}`}>
      <Meta />
      <CommandPalette />
      <CommandHint />
      <div aria-hidden className="pointer-events-none fixed inset-0">
        <Squares speed={0.3} borderColor="#1f1f1f" />
      </div>

      {/* HERO */}
      <header
        id="top"
        role="banner"
        className="relative overflow-hidden z-10 bg-black"
      >
        <div className="relative z-10 mx-auto max-w-5xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-24 min-h-[100vh] flex flex-col justify-center">
          <div className="mb-6 flex flex-wrap gap-2 sm:gap-3">
            <Effect inViewOnce fade slide={{ offset: 10 }} delay={0}>
              <Pill>Full-Stack</Pill>
            </Effect>
            <Effect inViewOnce fade slide={{ offset: 10 }} delay={100}>
              <Pill>GenAI</Pill>
            </Effect>
            <Effect inViewOnce fade slide={{ offset: 10 }} delay={200}>
              <Pill>Tech Lead</Pill>
            </Effect>
          </div>
          <Effect inViewOnce fade slide={{ offset: 10 }} delay={0}>
            <h1 className="text-5xl sm:text-7xl font-semibold leading-[1.05] tracking-tight text-zinc-100">
              Anthony Freda
            </h1>
          </Effect>

          <Effect inViewOnce fade slide={{ offset: 10 }} delay={100}>
            <p className="text-lg sm:text-2xl text-zinc-300">
              Senior Full-Stack Engineer & Tech Lead
            </p>
          </Effect>
          <Effect inViewOnce fade slide={{ offset: 10 }} delay={300}>
            <p className="text-base sm:text-xl text-zinc-400 leading-relaxed mt-4 sm:mt-6 max-w-prose">
              I design and ship high-velocity platforms: scalable backends,
              crisp UIs, and production-grade AI systems. 9+ years building
              things users touch — and teams trust.
            </p>
          </Effect>

          {/* Nav */}
          <nav aria-label="Primary" className="mt-12">
            <ul className="flex flex-wrap sm:flex-row flex-col gap-x-6 gap-y-1 text-zinc-400">
              {[
                ["About", "#about"],
                ["Skills", "#skills"],
                ["Experience", "#experience"],
                ["What's Next", "#whats-next"],
                ["Contact", "#contact"],
              ].map(([label, href], i) => (
                <li key={label} className="group">
                  <Effect
                    inViewOnce
                    fade
                    slide={{ offset: 10 }}
                    delay={500 + i * 100}
                  >
                    <a
                      href={href}
                      className="inline-flex text-base sm:text-lg items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/70 rounded-sm"
                    >
                      <span className="transition-transform translate-x-0 group-hover:translate-x-0.5 text-cyan-400">
                        ›
                      </span>
                      <span className="group-hover:text-zinc-100 transition-colors">
                        {label}
                      </span>
                    </a>
                  </Effect>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="absolute inset-0">
          <PixelBlast
            pixelSize={4}
            color="#2c6e9d"
            edgeFade={0.25}
            autoPauseOffscreen
            patternDensity={1.5}
          />
          {/* <Beams
            beamWidth={2}
            beamHeight={15}
            beamNumber={14}
            lightColor="#3fa7f0"
            speed={1.6}
            noiseIntensity={1.0}
            rotation={26}
          /> */}
        </div>
      </header>
      <main id="content" className="relative">
        {/* ABOUT */}
        <section
          id="about"
          aria-labelledby="about-heading"
          className="min-h-[100vh] flex flex-col justify-start"
        >
          <SectionDivider label="About" />
          <div className="mx-auto max-w-5xl px-6 mb-32 flex flex-col justify-center flex-1">
            <SectionHeading id="about-heading">About Me</SectionHeading>
            <div className="space-y-3 text-sm sm:text-base leading-relaxed text-zinc-200/95">
              <p>
                I've led builds across fintech, SaaS, and AI — from federated
                GraphQL backends to multi-agent platforms and polished front-end
                systems. Most recently at Yum Brands and DigitalOcean, my focus
                was reliability, scale, and developer velocity.
              </p>
              <p>
                Strengths: <strong className="italic">architecture</strong>,{" "}
                <strong className="italic">mentorship</strong>, and{" "}
                <strong className="italic">product taste</strong>. I like
                pragmatic patterns, clean contracts, and removing toil with
                automation.
              </p>
              <p className="mb-10">
                Lately I've been exploring{" "}
                <strong className="italic">game development</strong> — applying
                systems thinking to interactive experiences.
              </p>
              <p
                className={`${geistMono.className} text-xs sm:text-sm text-cyan-400`}
              >
                // 9+ years → fintech, SaaS, AI
              </p>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section
          id="skills"
          aria-labelledby="skills-heading"
          className="min-h-[100vh] flex flex-col justify-start mb-32"
        >
          <SectionDivider label="Skills" />
          <div className="mx-auto max-w-5xl px-6 mb-16 w-full flex-1 flex flex-col justify-center">
            <SectionHeading id="skills-heading">Skills</SectionHeading>
            <SkillsMatrix />
            <p
              className={`${geistMono.className} mt-10 text-xs sm:text-sm text-cyan-400`}
            >
              // Note this is not an exhaustive list
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <LogoLoop
              logos={frontendLoop}
              speed={26}
              direction="left"
              logoHeight={42}
              gap={18}
              fadeOut
              fadeOutColor="#000"
              ariaLabel="Core Tech"
            />
            <LogoLoop
              logos={backendAiLoop}
              speed={26}
              direction="right"
              logoHeight={42}
              gap={18}
              fadeOut
              fadeOutColor="#000"
              ariaLabel="Backend & Databases"
            />
            <LogoLoop
              logos={dataInfraOpsLoop}
              speed={26}
              direction="left"
              logoHeight={42}
              gap={18}
              fadeOut
              fadeOutColor="#000"
              ariaLabel="Cloud & Infra"
            />
          </div>
        </section>

        {/* EXPERIENCE */}
        <section
          id="experience"
          aria-labelledby="experience-heading"
          className="min-h-[100vh] flex flex-col justify-start"
        >
          <SectionDivider label="Experience" />
          <div className="mx-auto max-w-5xl px-6 mb-32 flex-1 flex flex-col justify-center">
            <SectionHeading id="experience-heading">Experience</SectionHeading>

            <div className="space-y-18">
              <Role
                id="yum-heading"
                company="Yum Brands (Contract)"
                title="Lead Software Engineer"
                from="2025-06"
                to="present"
                tags={[
                  "Apollo Federation",
                  "GraphQL",
                  "DGS",
                  "Node.js",
                  "TypeScript",
                  "React",
                ]}
                summary1={
                  <>
                    Led the design and rollout of{" "}
                    <strong className="italic">
                      federated GraphQL schemas
                    </strong>{" "}
                    using <strong className="italic">Apollo Federation</strong>{" "}
                    for nationwide inventory. Bootstrapped{" "}
                    <strong className="italic">DGS</strong> with{" "}
                    <strong className="italic">Node.js</strong> +{" "}
                    <strong className="italic">TypeScript</strong>.
                  </>
                }
                summary2={
                  <>
                    Built <strong className="italic">React/TypeScript</strong>{" "}
                    internal tools, set code standards, mentored, and partnered
                    with ops to cut inventory mismatches.
                  </>
                }
              />

              <Role
                id="do-heading"
                company="DigitalOcean"
                title="Senior Software Engineer II / Tech Lead"
                from="2024-01"
                to="2025-05"
                tags={[
                  "GenAI",
                  "Multi-agent",
                  "RAG",
                  "OpenSearch",
                  "Python",
                  "Go",
                  "TypeScript",
                  "tRPC",
                  "CI/CD",
                ]}
                summary1={
                  <>
                    Drove the{" "}
                    <strong className="italic">GenAI agent platform</strong>:{" "}
                    <strong className="italic">
                      multi-agent orchestration
                    </strong>
                    , hardened <strong className="italic">RAG</strong> over{" "}
                    <strong className="italic">OpenSearch</strong>, shipped
                    services in{" "}
                    <strong className="italic">Python/Go/TypeScript</strong>.
                  </>
                }
                summary2={
                  <>
                    Upgraded <strong className="italic">chatbot widgets</strong>{" "}
                    (a11y, theming), migrated GPU workflows to{" "}
                    <strong className="italic">tRPC + TypeScript</strong>, and
                    implemented <strong className="italic">CI/CD</strong>.
                    Mentored a team of 8 and raised delivery predictability.
                  </>
                }
              />

              <Role
                id="1v1me-heading"
                company="1V1ME"
                title="Senior Software Engineer"
                from="2022-06"
                to="2024-01"
                tags={["Next.js", "Electron", "Payments", "CI/CD", "Real-time"]}
                summary1={
                  <>
                    Built the{" "}
                    <strong className="italic">
                      esports competition platform
                    </strong>{" "}
                    with staking + rewards and an{" "}
                    <strong className="italic">
                      immersive live match experience
                    </strong>{" "}
                    (multi-perspective + chat).
                  </>
                }
                summary2={
                  <>
                    Owned <strong className="italic">CI/CD</strong>,{" "}
                    <strong className="italic">Electron</strong> apps with
                    auto-updaters, and payment integrations. Balanced security,
                    performance, and UX at scale.
                  </>
                }
              />

              <Role
                id="p00ls-heading"
                company="P00lS"
                title="Senior Software Engineer"
                from="2021-12"
                to="2022-06"
                tags={[
                  "Next.js",
                  "Firebase",
                  "GraphQL",
                  "ERC20",
                  "Localization",
                  "Accessibility",
                ]}
                summary1={
                  <>
                    Delivered a <strong className="italic">custom CMS</strong> +
                    consumer app with{" "}
                    <strong className="italic">Next.js</strong>,{" "}
                    <strong className="italic">Firebase</strong>,{" "}
                    <strong className="italic">GraphQL</strong>. Built{" "}
                    <strong className="italic">ERC20 gamification</strong>.
                  </>
                }
                summary2={
                  <>
                    Launched localization + a11y frameworks; sped up campaign
                    launches via flexible content models.
                  </>
                }
              />

              <Role
                id="movement-heading"
                company="Movement Mortgage"
                title="Lead Software Engineer"
                from="2021-04"
                to="2021-12"
                tags={[
                  "TypeScript",
                  "React/Redux",
                  "Agile",
                  "Hiring",
                  "Process",
                ]}
                summary1={
                  <>
                    Led <strong className="italic">hiring</strong>, onboarding,
                    and <strong className="italic">Agile SDLC</strong>; drove
                    migrations from{" "}
                    <strong className="italic">JavaScript → TypeScript</strong>.
                  </>
                }
                summary2={
                  <>
                    Built a <strong className="italic">custom CRM</strong> in{" "}
                    <strong className="italic">React/Redux</strong>; improved
                    dev productivity and release cadence with tighter
                    review/planning.
                  </>
                }
              />
            </div>

            <div className="mt-10">
              <p
                className={`${geistMono.className} text-xs sm:text-sm text-cyan-400 mb-2`}
              >
                // <strong>Dec 2019 – Apr 2021 · Diligent Corporation</strong> —
                scaled React/TypeScript apps to 200,000+ users; introduced
                micro-frontends across products.
              </p>
              <p
                className={`${geistMono.className} text-xs sm:text-sm text-cyan-400 mb-2`}
              >
                //{" "}
                <strong>
                  Jul 2017 – Dec 2019 · Bank of America (AVP; Senior Software
                  Engineer)
                </strong>{" "}
                — built Next.js/GraphQL UIs for internal platforms; earned Gold
                & Bronze performance awards.
              </p>
              <p
                className={`${geistMono.className} text-xs sm:text-sm text-cyan-400 mb-2`}
              >
                // <strong>2017 · BRK Global Marketing</strong> — shipped
                marketing sites & CMS features with React/Node; rapid iterations
                with tight brand requirements.
              </p>
              <p
                className={`${geistMono.className} text-xs sm:text-sm text-cyan-400`}
              >
                // <strong>2015 – 2017 · Freelance</strong> — delivered
                React/Node apps, REST APIs, and custom CMS builds end-to-end for
                small businesses.
              </p>
            </div>
          </div>
        </section>

        {/* WHAT'S NEXT */}
        <section
          id="whats-next"
          aria-labelledby="whats-next-heading"
          className="min-h-[100vh] flex flex-col justify-start"
        >
          <SectionDivider label="What's Next" />
          <div className="mx-auto max-w-5xl px-6 mb-32 relative flex-1 flex flex-col w-full justify-center">
            <SectionHeading id="whats-next-heading">What's Next</SectionHeading>
            <p className="text-base sm:text-xl leading-relaxed max-w-prose text-zinc-200/95 mb-4">
              Exploring <strong className="italic">game development</strong> as
              a creative outlet — bringing systems thinking, polish, and play to
              interactive experiences.
            </p>
            <p className="text-base sm:text-xl leading-relaxed max-w-prose text-zinc-200/95 mb-10">
              I'm seeking roles where I can{" "}
              <strong className="italic">lead and build</strong> — scaling AI
              systems, shipping great UI, and mentoring high-impact teams.
            </p>
            <p
              className={`${geistMono.className} text-xs sm:text-sm text-cyan-400`}
            >
              // Next chapter: leadership × creativity × scale
            </p>
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="min-h-[100vh] flex flex-col justify-start relative"
        >
          <div className="absolute inset-0 mt-12">
            <PixelBlast
              pixelSize={4}
              color="#2c6e9d"
              edgeFade={0.25}
              autoPauseOffscreen
              patternDensity={1.5}
            />
          </div>
          <SectionDivider label="contact" />
          <div className="mx-auto max-w-5xl px-6 mb-24 flex-1 flex flex-col w-full justify-center">
            <div className="relative bg-black border border-white/10 rounded-lg py-8 p-4 sm:p-8  overflow-hidden">
              <div className="relative z-10">
                <SectionHeading id="contact-heading">Contact</SectionHeading>

                <div className="grid  gap-6 items-start">
                  <div className="space-y-2">
                    <p className="text-base sm:text-xl leading-relaxed max-w-prose text-zinc-300">
                      Open to leadership & IC roles, advisory, and
                      collaborations. Let’s connect:
                    </p>
                  </div>
                  <ContactLinks />
                  <p
                    className={`${geistMono.className} text-xs sm:text-sm mt-10 text-cyan-400`}
                  >
                    // anthonyfreda323@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer
        role="contentinfo"
        className="mx-auto max-w-5xl px-6 pb-14 bg-black relative z-10"
      >
        <div className="flex items-center justify-between border-t border-white/10 pt-6">
          <p className="text-[10px] text-zinc-500">
            &copy; <span>{new Date().getFullYear()}</span> Anthony Freda. All
            rights reserved.
          </p>
          <a
            href="#top"
            className="text-[10px] text-cyan-300 hover:text-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/70 rounded-sm"
          >
            Back to top
          </a>
        </div>
      </footer>

      <StatusBar />
    </div>
  );
}
