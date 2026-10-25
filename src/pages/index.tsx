import * as React from "react";
import { MAILTO } from "@/lib/contact";
import Head from "next/head";
import { cards } from "@/content/cards";
import { chapters, profile, skills } from "@/content/resume";
import { Holo } from "@/components/Holo";
import { About, Collection, Experience, Highlights, Proof } from "@/components/Sections";
import { Inspect } from "@/components/Inspect";
import { Pack } from "@/components/Pack";
import { Reveal } from "@/components/Reveal";
import { SoundToggle } from "@/components/SoundToggle";
import dynamic from "next/dynamic";
import { resetPackState } from "@/components/pack3d/store";

const PackScene = dynamic(() => import("@/components/pack3d/PackScene"), { ssr: false });

const SITE = "https://antfreda.com";
const URL = `${SITE}/`;
const TITLE = "Anthony Freda — Lead Software Engineer";
const DESCRIPTION =
  "Anthony Freda is a lead software engineer in Charlotte, NC, building AI agents, the tooling around them, and the platforms they run on.";
const OG_ALT = "A trading-card booster pack printed with a blue-grey French bulldog and the name Anthony Freda, Lead Software Engineer.";

function Seo() {
  const current = chapters[0];
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        url: URL,
        name: profile.name,
        description: DESCRIPTION,
        inLanguage: "en-US",
        publisher: { "@id": `${SITE}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE}/#profile`,
        url: URL,
        name: TITLE,
        isPartOf: { "@id": `${SITE}/#website` },
        mainEntity: { "@id": `${SITE}/#person` },
        primaryImageOfPage: `${SITE}/og.png`,
        inLanguage: "en-US",
      },
      {
        "@type": "Person",
        "@id": `${SITE}/#person`,
        name: profile.name,
        url: URL,
        email: `mailto:${profile.email}`,
        jobTitle: profile.title,
        description: profile.line,
        image: `${SITE}/og.png`,
        worksFor: { "@type": "Organization", name: current.company },
        address: { "@type": "PostalAddress", addressLocality: "Charlotte", addressRegion: "NC", addressCountry: "US" },
        knowsAbout: skills.flatMap((g) => [...g.items]),
        sameAs: [profile.linkedin, profile.github],
      },
    ],
  };
  return (
    <Head>
      <title>{TITLE}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <meta name="description" content={DESCRIPTION} />
      <link rel="canonical" href={URL} />
      <meta name="author" content={profile.name} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
      <meta name="format-detection" content="telephone=no" />

      <meta property="og:type" content="profile" />
      <meta property="profile:first_name" content="Anthony" />
      <meta property="profile:last_name" content="Freda" />
      <meta property="og:url" content={URL} />
      <meta property="og:site_name" content={profile.name} />
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESCRIPTION} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content={`${SITE}/og.png`} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={OG_ALT} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={TITLE} />
      <meta name="twitter:description" content={DESCRIPTION} />
      <meta name="twitter:image" content={`${SITE}/og.png`} />
      <meta name="twitter:image:alt" content={OG_ALT} />

      <link rel="preload" as="image" href="/art/pack.webp" type="image/webp" fetchPriority="high" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
    </Head>
  );
}

function useReducedMotion() {
  const [calm, setCalm] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setCalm(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return calm;
}

/** Copies the address, for desktops without a mail app; says so when it has. */
function CopyEmail() {
  const [done, setDone] = React.useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setDone(true);
      window.setTimeout(() => setDone(false), 2200);
    } catch {
      setDone(false);
    }
  };
  return (
    <button type="button" className="copy-btn" onClick={copy} aria-label={done ? "Email address copied" : "Copy email address"}>
      <span aria-hidden>{done ? "Copied" : "Copy"}</span>
      <span className="sr-only" aria-live="polite">
        {done ? "Copied" : ""}
      </span>
    </button>
  );
}

/** True once the element is near the viewport (mounts live parts lazily). */
function useNear<T extends HTMLElement>() {
  const ref = React.useRef<T>(null);
  const [near, setNear] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setNear(e.isIntersecting), { rootMargin: "200px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, near] as const;
}

export default function Home() {
  const calm = useReducedMotion();
  const [stage, setStage] = React.useState<"sealed" | "revealing" | "opened">("sealed");
  // a new pack is a new component: its tear, phase and timers all start clean
  const [packGen, setPackGen] = React.useState(0);
  const ripAnother = React.useCallback(() => {
    resetPackState();
    setPackGen((g) => g + 1);
    setStage("sealed");
  }, []);
  const [inspecting, setInspecting] = React.useState<number | null>(null);
  const lastPocket = React.useRef<HTMLElement | null>(null);
  const openCard = React.useCallback((i: number) => {
    lastPocket.current = document.activeElement as HTMLElement;
    setInspecting(i);
  }, []);
  // printing: every experience row's details open, so the printed page is the whole resume
  React.useEffect(() => {
    let opened: HTMLDetailsElement[] = [];
    const before = () => {
      opened = [...document.querySelectorAll<HTMLDetailsElement>("details:not([open])")];
      opened.forEach((d) => (d.open = true));
    };
    const after = () => opened.forEach((d) => (d.open = false));
    window.addEventListener("beforeprint", before);
    window.addEventListener("afterprint", after);
    return () => {
      window.removeEventListener("beforeprint", before);
      window.removeEventListener("afterprint", after);
    };
  }, []);
  // past the pack, the header sticks with an Email me button
  const [pastHero, setPastHero] = React.useState(false);
  React.useEffect(() => {
    const on = () => setPastHero(window.scrollY > window.innerHeight * 0.7);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const [closeRef, closeNear] = useNear<HTMLElement>();
  const [askRef, askNear] = useNear<HTMLElement>();
  // the WebGL pack: mounted when motion is welcome and WebGL exists; the DOM pack covers until it draws
  const [webgl, setWebgl] = React.useState(false);
  const [glReady, setGlReady] = React.useState(false);
  React.useEffect(() => {
    try {
      const c = document.createElement("canvas");
      setWebgl(!!(c.getContext("webgl2") || c.getContext("webgl")));
    } catch {
      setWebgl(false);
    }
  }, []);
  const use3d = webgl && !calm;
  // the pack only renders while the opening is on screen and nothing covers it
  const [openingInView, setOpeningInView] = React.useState(true);
  React.useEffect(() => {
    const el = document.querySelector(".opening");
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOpeningInView(e.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const onGlReady = React.useCallback(() => setGlReady(true), []);
  // the flat pack is held back before first paint (see _document) while the 3D one loads; let it show if 3D is off or slow
  const [glGaveUp, setGlGaveUp] = React.useState(false);
  React.useEffect(() => {
    const root = document.documentElement;
    if (glReady) return void root.classList.remove("gl-wait");
    if (!use3d) {
      // webgl is decided after mount; calm is too
      const t = window.setTimeout(() => !use3dRef.current && root.classList.remove("gl-wait"), 400);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => {
      setGlGaveUp(true);
      root.classList.remove("gl-wait");
    }, 7000);
    return () => window.clearTimeout(t);
  }, [glReady, use3d]);
  const use3dRef = React.useRef(use3d);
  use3dRef.current = use3d;

  // while the pack is being revealed, the page underneath is locked and inert
  React.useEffect(() => {
    const on = stage === "revealing" || inspecting !== null;
    document.documentElement.classList.toggle("locked", on);
    document.querySelectorAll<HTMLElement>("body .app > header, body .app > main, body .app > footer, body .app > .dock, body .app > .skip").forEach((el) => {
      el.inert = on;
    });
  }, [stage, inspecting]);

  const toBinder = React.useCallback(() => {
    setStage("opened");
    requestAnimationFrame(() => {
      // after the pack, land on the pitch: the highlights (scroll-margin clears the stuck header), focus without a second scroll
      document.getElementById("highlights")?.scrollIntoView({ behavior: calm ? "auto" : "smooth", block: "start" });
      document.getElementById("highlights-title")?.focus({ preventScroll: true });
    });
  }, [calm]);

  return (
    <>
      <Seo />
      <a className="skip" href="#highlights">
        Skip to content
      </a>

      <header className="top" data-stuck={pastHero || undefined}>
        <a className="top-name" href="#main">
          {profile.name}
        </a>
        <nav aria-label="Page">
          <a href="#experience">Experience</a>
          <a href="#binder">Cards</a>
          <a className="nav-contact" href="#contact">
            Contact
          </a>
          <SoundToggle />
          <a className="btn btn-small top-cta" href={MAILTO}>
            Email me
          </a>
        </nav>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="opening" aria-labelledby="name">
          <div className="lamp" aria-hidden />
          {use3d && !glGaveUp ? (
            <div className="pack-scene-wrap" aria-hidden data-ready={glReady || undefined}>
              <PackScene onReady={onGlReady} name={profile.name} title={profile.title} active={stage !== "revealing" && openingInView} />
            </div>
          ) : null}
          <div className="opening-pack">
            <Pack
              key={packGen}
              calm={calm}
              gl={use3d && !glGaveUp && glReady}
              opened={stage === "opened"}
              onOpened={() => setStage("revealing")}
              onReset={ripAnother}
            />
          </div>
          <div className="opening-copy">
            <p className="opening-line">{profile.line}</p>
            <div className="actions">
              <a className="btn" href={MAILTO}>
                Email me
              </a>
              <a className="link" href={profile.linkedin} rel="me noopener" target="_blank">
                LinkedIn
              </a>
              <a className="link" href={profile.github} rel="me noopener" target="_blank">
                GitHub
              </a>
            </div>
          </div>
        </section>

        <Proof />
        <Highlights onOpen={openCard} />
        <Experience onOpen={openCard} />
        {/* the decision point: right after the work, one plain ask */}
        <section className="ask" aria-labelledby="ask-title" ref={askRef}>
          <div className="ask-copy">
            <h2 id="ask-title" className="ask-line">
              Hiring for AI, platform, or product engineering?
            </h2>
            <p className="ask-sub">
              {profile.about[2]}
            </p>
          </div>
          <div className="ask-actions">
            <a className="btn btn-big" href={MAILTO}>
              Email me
            </a>
            <span className="close-email-row">
              <a className="close-email" href={MAILTO}>
                {profile.email}
              </a>
              <CopyEmail />
            </span>
          </div>
        </section>
        <Collection onOpen={openCard} />
        <About />
      </main>

      <footer id="contact" className="close" ref={closeRef}>
        <div className="close-card" aria-hidden>
          <Holo card={cards[cards.length - 1]} index={cards.length - 1} live={closeNear && stage !== "revealing" && inspecting === null} headingLevel={4} />
        </div>
        <div className="close-copy">
          <h2>Say hello</h2>
          <p className="close-line">Email is the fastest way to reach me.</p>
          <div className="close-actions">
            <a className="btn btn-big" href={MAILTO}>
              Email me
            </a>
            <span className="close-email-row">
              <a className="close-email" href={MAILTO}>
                {profile.email}
              </a>
              <CopyEmail />
            </span>
          </div>
          <p className="close-links">
            <a href={profile.linkedin} rel="me noopener" target="_blank">
              LinkedIn
            </a>
            <a href={profile.github} rel="me noopener" target="_blank">
              GitHub
            </a>
          </p>
          <button
            type="button"
            className="text-btn close-again"
            onClick={() => {
              ripAnother();
              window.scrollTo({ top: 0, behavior: calm ? "auto" : "smooth" });
            }}
          >
            Rip another pack
          </button>
        </div>
        <p className="close-bar">
          © {new Date().getFullYear()} {profile.name} · Charlotte, NC
        </p>
      </footer>

      <a className="dock btn" href={MAILTO} data-hidden={!pastHero || closeNear || askNear || inspecting !== null || undefined}>
        Email me
      </a>

      {stage === "revealing" ? <Reveal calm={calm} onDone={toBinder} /> : null}
      {inspecting !== null ? (
        <Inspect
          index={inspecting}
          onStep={setInspecting}
          onClose={() => {
            setInspecting(null);
            requestAnimationFrame(() => lastPocket.current?.focus());
          }}
        />
      ) : null}
    </>
  );
}
