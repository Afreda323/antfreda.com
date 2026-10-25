---
version: 1
slug: "src-pages-index-tsx"
primary_target: "src/pages/index.tsx"
related_targets: []
---

# Surface brief: home (booster pack)

Scope: the whole home route. Mode: Experience (the artifact leads from the first viewport), with Persuade's duty kept: Email me is visible and working from the first viewport.

Audience and job: hiring managers and recruiters skimming in under two minutes, often on phones. They need who, what, and how to reach Anthony fast; the pack is the reason they remember him. Proof is the real resume copy in src/content/resume.ts; nothing else is claimed.

Constraints: all card content is server-rendered as real HTML under the pack (SEO, print, no-JS, reduced motion). Dark only; no light theme. Original card design: no Pokémon trade dress, logos, names, or the yellow border. Card art is PS2-era game art generated with Codex, finished with scripts/print-finish.mjs so it reads as printed; the dog is drawn from dog.glb and the dog concept.

## Direction contract

THESIS: The resume is a booster pack you rip open: every section is a collectible card, the contact is the secret-rare holo, and the binder afterwards is the readable resume. It refuses the one-page scroll of hero, about, timeline and contact.

OWN-WORLD: A night table under one warm lamp: deep plum-black ground with a warm pool of light and soft falloff. The pack is a glossy foil wrapper (violet to teal to gold) printed with PS2-style French bulldog art and a crimped tear strip. Cards: cream inner panel, thick frames coloured by type (violet AI, teal platform, coral web, gold finance, slate early career, pink partner for the player, field, toolkit and chase cards), PS2-style art windows, chunky display lettering for names, set number at the foot (rarity pips only on the player card and the contact secret rare). The holo carries a rainbow foil sheen and glints that follow the hand.

STORY: The visitor sees Anthony's name and title printed on a sealed pack with Email me at its foot, rips it, flips through the cards (all face up except the secret rare), and lands on a calm, scannable page that sells: who he has shipped for, the highlights, the experience in full, the full set of cards to pick up, skills, and one clear ask to email.

FIRST VIEWPORT: The sealed pack is the hero, centred under the lamp at about two thirds of the viewport tall, tilted a few degrees and resting on a soft table shadow. The page's h1 (the name) and the title are printed on the wrapper; a "Rip here" tab on the tear strip carries the rip. Directly at its foot, centred: the line, then Email me as the primary button with LinkedIn and GitHub beside it. Cards and Contact links sit in the header. Phone: the same pack, large, with the line and links under it and Email me pinned at the bottom.

SIGNATURE INTERACTION: The rip. Dragging along the crimp tears the foil along a jagged line that follows the finger, the flap peels and flies off spinning, foil shards burst, light floods out of the pack, the screen kicks, phones buzz, and the card stack rises. Tap or swipe flicks each card away. The secret rare shakes the stack and flips in a burst. Motion grammar: violent and fast for the rip (under 400ms), springy for cards, calm for everything else.

FORM: user-pinned booster pack (the user's own concept, 2026-10-24; no roll was run because the user pinned the form), position 1 of 1. seed: none (user-pinned; no roll)

REVISION (user, 2026-10-24): The pack hero is approved as is. Everything below it follows high-converting landing-page structure, on a calm plum-black ground with the card art and type colours carrying the colour: a proof strip of employers as wordmarks; a highlights bento of quoted outcomes on card art; an experience list (dates, company, role, lead line, skill tags, expandable details, the job's card beside it); a mid-page ask right after the experience; about; skills; the full set as one flickable row; a closing Contact band with one primary Email me, and a sticky header with Email me past the hero. The user also ruled: never print the dog's name anywhere (since relaxed: it now appears once, only in the About me line; see SHIPPED); no corny copy (plain, direct wording only); no rarity on employer cards (only the player card is rare and the contact card the secret rare); cards come out face up, only the secret rare turns.

SHIPPED (2026-10-25, recorded from the code): the dog's name appears once, only in the About me line (profile.home in resume.ts); everywhere else, including alt text and metadata, it is a French bulldog. DigitalOcean carries a confirmed scope line (Chapter.scope), shown on its experience row and recent-work tile; it is a fact Anthony confirmed, not a resume bullet. The lamp is one warm layer (no purple lamp layer).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Shipped page, in order

1. Opening: the sealed 3D pack under the lamp (h1 name and title printed on it, Rip here tab, tear-line "heart monitor" pulse while untouched; a foil loading blank keeps the name visible and gives up to the flat pack after 2.5s), the pack hint, the line, a facts line (now at Yum Brands, before that tech lead on the GenAI agent platform at DigitalOcean), then Email me with LinkedIn and GitHub.
2. Where I've worked: employer wordmarks, current one in full ink.
3. Recent work: four tiles, each a written headline plus a supporting line on its own art (digitalocean, yum, yum-kitchen, yum-review); each opens its card.
4. Experience: full rows for 2022 on (lead, inline or "Show N more" lines, tags, art crop), compact rows for 2021 and earlier; DigitalOcean's scope line under its role.
5. The ask: "Hiring for AI, platform, or product engineering?", the product-and-design line, big Email me, address and Copy.
6. Cards: all twelve in one scroll-snap row; any opens inspect.
7. About me (with the one mention of the dog's name), then Skills as a plain list.
8. Say hello band: one ask (Email me, address, Copy) beside the secret-rare holo, with a footer bar (LinkedIn, GitHub, Rip another pack).

Reveal: every card face up except the secret rare, which gets a build-up (hush, slow throw, heartbeat pulse with thump and haptics) and a payoff (light ring, rainbow rays, foil rain). 3D flip on Chrome and Firefox desktop; 2D squeeze turn on phones and Safari. A Next card / Turn it over button sits under the stack.

Inspect: Close is a top-right x; one footer row (back, Email me, forward); "Card N of 12" in the panel; the desktop text panel is fixed to the card's height.

Buttons: foil-struck primary (ramp, inset highlight and lip, one glint on hover, pressed state), soft-chip secondary, three tiers (60/52/44). Card faces: foil frame, gold keyline, 4:3 art window, stat top-right, paper grain; card back with the AF medallion.

## Unresolved
- Arrival, scene and sound were asked and not answered; defaults taken: pack is the hero, night-lamp table, sound after first gesture with mute.
