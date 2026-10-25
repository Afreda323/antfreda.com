# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
(Confirmed by the user, 2026-10-22.)

The site is mainly for hiring managers and recruiters filling Staff/Lead individual-contributor roles in full-stack, frontend/product, AI and developer-tools engineering. Target companies are big tech, streaming, gaming, and creative-AI companies.

Visitors usually arrive from a job application or a LinkedIn profile. They skim in under two minutes, often on a phone, to decide whether to start a conversation.

## Product Purpose
This is Anthony Freda's personal portfolio and resume site (antfreda.com). In one visit it should show:
- the career story: since 2015 (the "N+ years" figure is derived from START_YEAR), now Lead Software Engineer at Yum Brands;
- agentic AI depth: led the GenAI agent platform and shipped hybrid search/RAG at DigitalOcean, and drove agentic development at Yum Brands;
- product and craft taste.

Success means a qualified hiring manager reaches out by email (the primary action). LinkedIn and GitHub are secondary links.

## Positioning
A lead engineer whose through-line is agentic AI (led the GenAI agent platform at DigitalOcean, drove agentic development at Yum Brands), combining hands-on AI retrieval work (hybrid search, query expansion, reranking, evals), zero-to-one distributed platform leadership (federated GraphQL), and team-wide AI adoption, with real product and design sensibility. Roughly half of the work week goes to product and design work.

## Operating Context
Visitors come from application links, LinkedIn, and GitHub. The resume is also printed or saved to PDF from the page, so print must stay clean.

## Capabilities and Constraints
- Next.js 15 Pages Router, Tailwind v4, three.js / react-three-fiber.
- Custom 3D models come from Tripo3D (free plan, so the models are public) via concept images generated with Codex. On hand in public/models: Ellie (dog), 12 landmarks (doghouse, tree, foodstand, lighthouse, arcade, well, house, office, bank, shed, signpost, mailbox), 7 props, and a gothic 'd-' set of the 12 landmarks plus 4 props.
- No public resume PDF, because the master resume includes a phone number.
- GatherDay (unreleased side project) is deliberately left off for now.

## Brand Commitments
- Name: Anthony Freda.
- Title: "Lead Software Engineer". Staff/Principal scope is positioning only, never stated as a title.
- Voice (confirmed): first person, plain, understated, close to the approved resume wording, no hype.
- Core experience pinned by the user (2026-10-24, replacing the earlier walking-Ellie concept): the site is a trading-card booster pack the visitor rips open. Each card is a resume piece. Ripping "needs to feel crazy", like opening a rare pack. A super-rare holo at the end can carry the contact info. Ellie must feature on the site; the user likes the dog.glb model. Great SEO is a requirement. Original card design only: no Pokémon trade dress, logos, or names.
- Rejected looks: synthwave/neon, chrome helmet, corny 80s, PS2 low-poly as a requirement for the 3D world, generic dark neon. (For the card pack, the user then asked for PS2-style card art, 2026-10-24: "Id love the cards to have ps2 style art.") Also rejected (2026-10-24, "broken and like shit"): the scroll-driven island turntable (Toy Box) and the spiral night hill (Burton), and the hero-diorama compromise.

## Evidence on Hand
- The approved resume copy is `~/Desktop/jobs/resumes/master_resume.md` (mirrored in `src/content/resume.ts`).
- Contact: email, GitHub (Afreda323), LinkedIn (antfreda323).
- Must not be fabricated or shown:
  - unverified metrics (user counts, RPS, number of people mentored, percentages);
  - any degree;
  - the Epic Games / J2 contract;
  - testimonials;
  - private details (health, salary, location constraints).

## Product Principles
1. Truth over impressiveness: every claim traces to the approved resume.
2. Skimmable without the spectacle: all content is real, readable HTML, even when the 3D fails.
3. The site itself is a work sample of product craft and frontend engineering.
4. Fast to the point: who, what, and how to reach Anthony within the first viewport.

## Accessibility & Inclusion
- Reduced-motion users and devices without WebGL get a complete static experience.
- Text must meet WCAG AA contrast over any backdrop.
- Full keyboard navigation (including ⌘K).

## Surface world (this variant)
Variant e: the booster pack. Open to impeccable's new-work decision on world and material.
