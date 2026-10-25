---
name: Anthony Freda, the booster pack
description: A resume you rip open. A foil pack under one warm lamp, twelve collectible cards, then a calm plum-black page that sells.
colors:
  ground: "#16111d"
  ground-2: "#211929"
  ground-3: "#2d2338"
  reveal-plum: "#3a2650"
  reveal-deep: "#0e0a14"
  lamp: "#ffc37a"
  lamp-highlight: "#ffdcae"
  lamp-lip: "#f0a654"
  lamp-hover: "#ffca86"
  ink: "#f7efe3"
  ink-soft: "#d7cadd"
  muted: "#a99bb5"
  rule: "rgba(247, 239, 227, 0.14)"
  chip-fill: "rgba(247, 239, 227, 0.06)"
  cream: "#fbf3e3"
  card-ink: "#20182a"
  card-soft: "#5b4d63"
  keyline-gold: "#ecd39a"
  card-back: "#3b2a57"
  pack-print: "#2a1d3d"
  pack-stroke: "#2a1240"
  type-ai: "#7d5cff"
  type-platform: "#17a898"
  type-web: "#ff6a55"
  type-finance: "#e2ad3c"
  type-early: "#7f8ca6"
  type-partner: "#ef7fb0"
  holo-silver: "#b9c0d8"
  secret-gold: "#8a5a00"
typography:
  pack-brand:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(2.2rem, 6.6vh, 4.4rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 80, 'opsz' 96"
  display:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(3rem, 7vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 86, 'opsz' 96"
  headline:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(2.2rem, 4.4vw, 3.6rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 88, 'opsz' 72"
  title:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.4vw, 2rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 88, 'opsz' 36"
  tile-headline:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(1.35rem, 2vw, 1.8rem)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 90, 'opsz' 36"
  opening-line:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(1.2rem, 1.7vw, 1.5rem)"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 90, 'opsz' 36"
  card-name:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "7.4cqw"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 85, 'opsz' 36"
  card-move:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "3.6cqw"
    fontWeight: 800
    letterSpacing: "-0.01em"
  card-body:
    fontFamily: "Onest, system-ui, sans-serif"
    fontSize: "3.15cqw"
    fontWeight: 400
    lineHeight: 1.32
  body:
    fontFamily: "Onest, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
  lead:
    fontFamily: "Onest, system-ui, sans-serif"
    fontSize: "clamp(1.1rem, 1.4vw, 1.3rem)"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Onest, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1
  pack-label:
    fontFamily: "Onest, system-ui, sans-serif"
    fontSize: "clamp(0.72rem, 1.5vh, 0.95rem)"
    fontWeight: 700
    letterSpacing: "0.08em"
rounded:
  card: "4.6cqw"
  card-inner: "2.6cqw"
  card-art: "1cqw"
  pack: "10px"
  xp-art: "12px"
  focus: "6px"
  inspect: "18px"
  tile: "20px"
  band: "28px"
  pill: "999px"
spacing:
  gutter: "clamp(20px, 4.5vw, 64px)"
  tag-gap: "8px"
  bento-gap: "16px"
  set-gap: "20px"
  row: "30px"
  section-sm: "80px"
  section: "120px"
  content-max: "1180px"
components:
  button-primary:
    backgroundColor: "{colors.lamp}"
    textColor: "{colors.card-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 28px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.lamp-hover}"
    textColor: "{colors.card-ink}"
  button-big:
    backgroundColor: "{colors.lamp}"
    textColor: "{colors.card-ink}"
    rounded: "{rounded.pill}"
    padding: "0 36px"
    height: "60px"
  button-compact:
    backgroundColor: "{colors.lamp}"
    textColor: "{colors.card-ink}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "44px"
  button-quiet:
    backgroundColor: "{colors.chip-fill}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 28px"
    height: "52px"
  button-close:
    backgroundColor: "{colors.chip-fill}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    size: "44px"
  rip-tab:
    backgroundColor: "{colors.lamp}"
    textColor: "{colors.card-ink}"
    rounded: "{rounded.pill}"
    padding: "5px 10px 5px 8px"
  card-frame:
    backgroundColor: "{colors.type-partner}"
    textColor: "{colors.card-ink}"
    rounded: "{rounded.card}"
    padding: "2.8cqw"
  card-panel:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.card-ink}"
    rounded: "{rounded.card-inner}"
    padding: "2.2cqw 2.6cqw 2cqw"
  card-back:
    backgroundColor: "{colors.card-back}"
    rounded: "{rounded.card}"
    padding: "3.2cqw"
  highlight-tile:
    backgroundColor: "{colors.ground-2}"
    textColor: "{colors.ink}"
    typography: "{typography.tile-headline}"
    rounded: "{rounded.tile}"
  xp-tag:
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "5px 11px"
  inspect-panel:
    backgroundColor: "{colors.ground-2}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.inspect}"
    padding: "28px 28px 24px"
  contact-band:
    backgroundColor: "{colors.ground-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.band}"
    padding: "clamp(36px, 5vw, 72px)"
  header-stuck:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink-soft}"
    padding: "12px clamp(20px, 4.5vw, 64px)"
---

# Design System: Anthony Freda, the booster pack

## Overview

**Creative North Star: "One Pack Under the Lamp"**

The first viewport is a night table with one warm lamp over it, and on it a sealed foil booster pack printed with the page's h1 (the name) and the title. The visitor rips it open. Twelve collectible cards, one per resume section, rise out of the pack and are flicked through one at a time. Then the spectacle stops. Everything below the pack is a calm, scannable landing page on the same plum-black ground. It sells in a fixed order: where he has worked, four pieces of recent work, the experience, one plain ask, the cards, about me, skills, and a closing Say hello band. On that page the colour comes from the card art and the six type colours. The chrome stays dark and quiet, and one lamp-amber accent marks every action.

There are two registers. The pack and the reveal are violent, glossy and physical: foil, crinkle, light, shards, a heartbeat and haptics. The page under them is editorial and restrained: rows, rules, tags and plain lists. The cards join the two registers, because the same printed card face appears in the reveal, in inspect and in the Say hello band, and the cards row shows each card as art and name. All content is real HTML and is server-rendered under the pack, so the page is complete without WebGL, without JavaScript motion, and on paper.

The world is dark only: there is no light theme (`color-scheme: dark`, theme-color the ground). It refuses the one-page scroll of hero, about, timeline and contact. It also refuses synthwave and neon, generic dark-neon glow, and any Pokémon trade dress (no yellow border, no logos, no names).

**Key Characteristics:**
- A plum-black ground (never pure black), dark only, with a single warm lamp pool behind the pack.
- One accent, lamp amber, struck like foil on every primary action, and used for the focus ring and the selection.
- Six card type colours carry all the hue below the fold, through card frames, row tints, tags and art borders.
- Bricolage Grotesque, heavy and narrowed on its width axis, for every name and heading; Onest for everything you read.
- A WebGL foil pack that tears for real, and a reveal where every card comes out face up except the secret rare, which gets a build-up and a payoff.
- Cards are printed objects: foil frame, gold keyline, paper grain, and art with a print finish.
- Every card opens into inspect, which shows a big tilting card beside its full text.

## Colors

The neutrals are a warm plum-black ramp, there is one amber accent, and six saturated type colours live only on cards and things that belong to a card.

### Primary
- **Lamp Amber** (`lamp`): the only accent. It fills every Email me button (the hero, the sticky header, the mid-page ask, the Say hello band, the phone dock, inspect and the reveal's last card), the Rip here tab and the rip-hint arrow. It is also the focus ring, the selection highlight, the "· Rare" / "· Secret rare" note in the reveal counter, and the diamond bullets in inspect. On buttons it is struck as a foil ramp from **Lamp Highlight** (`lamp-highlight`) at the top through lamp to **Lamp Lip** (`lamp-lip`) at the foot; **Lamp Hover** (`lamp-hover`) is the middle of the brighter hover ramp. In WebGL the same amber is the light that spills from the pack's mouth and the tear-line pulse.

### Secondary: the six card types
Each card, experience row and set entry takes one type. The type sets the card frame (`--frame`) and the row tint (`--t`).
- **AI Violet** (`type-ai`): DigitalOcean.
- **Platform Teal** (`type-platform`): Yum Brands, Movement Mortgage, Diligent.
- **Web Coral** (`type-web`): 1V1ME, P00LS.
- **Finance Gold** (`type-finance`): Bank of America.
- **Early Slate** (`type-early`): Before that (early and freelance work).
- **Partner Pink** (`type-partner`): the player card, About, Skills and Contact.

Derived uses are always mixed in OKLab from the type colour and are never new hues:
- the frame-dark outer ring around the card panel, at 55% type colour on black, and around the art window, at 60%;
- the caption strip under the art, at 22% type colour on white, fading out at both ends;
- the stat, at 50% type colour on black;
- row hover, at 8%;
- experience tags, with a 16% type-colour background and 45% type colour on white for the text;
- role text in rows, inspect and the cards row, at 40–55% type colour on white.

### Tertiary: foil and print
- **Keyline Gold** (`keyline-gold`): the thin gold keyline just inside every card frame; a slightly deeper gold rings the card back and its medallion.
- **Holo Silver** (`holo-silver`): the base of the secret-rare frame. It is a cool silver gradient, and the rainbow film reads as a prism over it, not as gold.
- **Secret Gold** (`secret-gold`): the ringed rarity pips on the secret rare only.

### Neutral
- **Plum-Black Ground** (`ground`): the page, the html background, the theme-color, the stuck header and the phone inspect bar.
- **Plum Raise** (`ground-2`): highlight tiles, the inspect text panel, and the xp-art placeholder.
- **Plum Rise** (`ground-3`): the scrollbar thumb.
- **Reveal Plum → Reveal Deep** (`reveal-plum` → `reveal-deep`): the radial backdrop of the reveal stage.
- **Warm Ink** (`ink`): headings, the current-employer wordmark, the DigitalOcean scope line, chip text.
- **Ink Soft** (`ink-soft`): body copy, nav links, leads, the skills list.
- **Muted Lilac** (`muted`): dates, labels, the pack hint, the inspect count, the footer.
- **Rule** (`rule`): row dividers, skills dividers, the stuck-header hairline and the inspect footer line.
- **Chip Fill** (`chip-fill`): the soft fill of every secondary button and the inspect Close.
- **Card Cream** (`cream`) with **Card Ink** (`card-ink`) and **Card Soft** (`card-soft`): the inner panel of every card. Card Ink also sets the text on amber buttons.
- **Card Back Plum** (`card-back`): the card back's frame.

### Named Rules
**The One Lamp Rule.** Lamp amber is the only accent on the chrome. Each viewport has one primary Email me at most, plus the sticky one. No second accent appears.

**The Type Owns the Hue Rule.** Below the pack, saturated colour appears only through a card type: its art, its frame, its row tint and its tags. Nothing decorative gets a colour of its own.

## Typography

**Display Font:** Bricolage Grotesque (variable, `wdth` and `opsz` axes), with system-ui fallback.
**Body Font:** Onest (400–700), with system-ui fallback. Every `<button>` and form control inherits the text face; nothing falls back to the browser default.

**Character:** Bricolage, set at weight 800 and narrowed to 75–90 width, reads like printed card lettering when small and like a logo when large. Onest is compact and clear, and stays legible at about 11px on a card face.

### Hierarchy
- **Pack brand** (`pack-brand`): the name on the wrapper, which is the page's h1. It is white with a 0.04em plum stroke painted under the fill, with a drop shadow.
- **Display** (`display`): the "Say hello" heading in the closing band.
- **Headline** (`headline`): section titles (Recent work, Experience, Cards, About me, Skills). The mid-page ask has its own h2 in Bricolage 700, a step smaller. Inspect h2 uses the same face at `clamp(2rem, 3.4vw, 3rem)`, `wdth` 88.
- **Title** (`title`): company names in experience rows.
- **Opening line** (`opening-line`): the one-sentence line under the pack, in ink, balanced, 30ch cap. The facts line under it is Onest 15px in ink-soft at 44ch.
- **Tile headline** (`tile-headline`): the headline on a recent-work tile, 16ch cap. It steps up to `clamp(2rem, 3.4vw, 3.1rem)` on the large tile and down to `clamp(1.2rem, 1.6vw, 1.45rem)` on square tiles. The supporting line under it is Onest at about 1rem, 40ch cap.
- **Wordmark**: the "Where I've worked" names, in Bricolage 800 at `wdth` 82 and `clamp(1.15rem, 1.75vw, 1.6rem)`.
- **Card name / card move / card body** (`card-name`, `card-move`, `card-body`): sized in container units (`cqw`), so every card scales as one object, from the cards row to the 440px reveal card. The stat beside the name is Bricolage 800 at 3.4cqw.
- **Body** (`body`): 17px on desktop and 16px at 860px and below. Leads and row text are capped at 62ch, with `text-wrap: pretty`.
- **Lead** (`lead`): experience leads, the about copy and the ask subline, in ink-soft.
- **Label** (`label`): nav, hints, counters, the Copy button and compact buttons. Standard buttons are 700 17px. Numbers are tabular.
- **Pack label** (`pack-label`): the title pill and the pack foot, the only uppercase tracked text in the system. They are printed on the wrapper, not on the page.

### Named Rules
**The Narrow Heavy Rule.** Display type is weight 700–800 with `wdth` between 75 and 90. Bricolage is never set at its default width or a light weight.

**The No Kicker Rule.** Section titles stand alone. No uppercase eyebrows sit above them, and no line sits above a card name. Uppercase tracking belongs to the printed pack only.

## Layout

There is one centred column, 1180px max, with a fluid gutter (`clamp(20px, 4.5vw, 64px)`). The opening is a full `100svh` grid with the pack centred under the lamp at `min(66svh, 640px)` tall. Under it, centred: the pack hint (small and muted, it belongs to the pack), then the opening line, the facts line ("Now leading platform work and AI adoption at Yum Brands. Before that, technical lead on the GenAI agent platform at DigitalOcean."), and the actions (Email me, then LinkedIn and GitHub as text links).

The sections below the pack, in order:
1. **Where I've worked:** a muted label and a justified row of employer wordmarks, the current employer in ink and the rest at 68% ink (about 6:1, AA at every size). 56px under the opening.
2. **Recent work:** a 4-column bento with rows of `clamp(180px, 17vw, 230px)` and 16px gaps: one 2×2 tile (DigitalOcean), one wide tile (Yum Brands) and two square tiles (Yum Brands), each on its own art (`digitalocean`, `yum`, `yum-kitchen`, `yum-review`).
3. **Experience:** a 3-column grid of `9rem | 1fr | 170px` (dates, body, art crop), separated by top rules, with 30px vertical padding. Roles from 2022 on get full rows; 2021 and earlier are compact.
4. **The ask:** 70px after the experience. An h2 question, a subline (the product-and-design line), then a big Email me plus the address with a Copy button.
5. **Cards:** a full-bleed horizontal scroll-snap row of compact faces (name, 4:3 art, then role and stat on two fixed lines), framed in the card's type colour; the secret rare gets a foil wash. Its left edge aligns with the content column, faces are `clamp(200px, 21vw, 260px)` wide (68vw on phones), a 120px mask fade on the right shows there is more, and soft-chip arrow buttons page it on hover devices.
6. **About me:** a 4fr | 8fr split, title left and copy right; the first paragraph in ink, then ink-soft.
7. **Skills:** a plain definition list, group name (12rem, ink, 700) beside its items joined by middots, each group on a top rule. It stacks on phones.
8. **Say hello band:** an inset, rounded panel with the copy on the left and the secret-rare holo, tilted, on the right. Under it, inside the band, a footer bar: © and city on the left; LinkedIn, GitHub and Rip another pack on the right.

Sections are spaced 100–130px apart on desktop and 72–80px apart at 860px and below.

The breakpoint is 860px. The phone layout differs as follows:
- the opening top-aligns, with 104px of headroom for the rising cards;
- the pack is `min(58svh, 500px)` tall;
- the hero actions stack, Email me at up to 340px wide; a fixed full-width **dock** takes over once past the hero. The dock slides away near the ask and the band and under overlays;
- the bento becomes 2 columns with 210px rows; square tiles span full width;
- experience rows become full-width text; art crops and tags drop and "View card" is a text link;
- the band stacks with the card centred on top at `min(60vw, 240px)`, tilted −4°;
- every tap target is at least 44px;
- the header's Contact link steps out at 1080px and below, and its sticky Email me hides on phones.

## Elevation & Depth

Depth is physical and lit from one source. Surfaces are tonal plum steps. Shadows are soft and long, and fall down and away from the lamp. Light is additive: the lamp pool, the mouth light, the rip flash and the reveal rays. There are no hard offset shadows and no neon glows; buttons cast neutral shadows.

### Shadow Vocabulary
- **Table contact** (`radial-gradient(closest-side, rgba(0,0,0,0.55), transparent)`, blurred 6px): the pack resting on the table.
- **Card drop** (`0 18px 40px -18px rgba(0,0,0,0.7), 0 4px 10px rgba(0,0,0,0.35)` plus a 0.35cqw inset white edge): every card face and back.
- **Foil key** (`inset 0 1px 0 rgba(255,255,255,0.65), inset 0 -2px 0 rgba(150,80,20,0.35), 0 1px 0 rgba(0,0,0,0.35), 0 10px 22px -12px rgba(0,0,0,0.75)`): primary buttons, a raised key with a bright top edge and a darker lower lip. Pressed, it sinks to an inset shadow.
- **Tile** (`0 24px 40px -28px rgba(0,0,0,0.9)` plus a 1px inset highlight): recent-work tiles, deepening on hover.
- **Band** (`0 40px 80px -40px rgba(0,0,0,0.9)` plus inset highlight): the Say hello band.
- **Held card** (`drop-shadow(0 30px 30px rgba(0,0,0,0.5))`): a tilted card set on the page.

### Named Rules
**The One Light Rule.** Every highlight and spill is warm and comes from the lamp or from inside the pack. The lamp is one warm radial layer; there is no second, coloured lamp layer. Cool light appears only as the violet and teal rim lights in WebGL and in the secret rare's rainbow foil.

## Shapes

- The card is the master silhouette, with a 63:88 aspect. Its frame radius is 4.6cqw, the inner panel 2.6cqw and the art window 1cqw. The art window is 4:3 on every card except the secret rare, which keeps 3:2 for its three contact lines. Radii are in container units, so a card looks identical at every size.
- The pack is a 0.64-aspect pillow with crimped zigzag seals top and bottom and a jagged tear line 11.5% down.
- Controls are full pills (999px): buttons, tags, the Copy button, the Rip here tab, the caption strip and the pack's title pill. The inspect Close is a 44px circle.
- Content panels round softly, from 12px on art crops through 16px on row hovers, 18px on inspect and 20px on tiles to 28px on the band.
- Bullets are small rotated squares (diamonds): lamp-coloured in inspect, type-coloured in experience details and before each move name on a card.
- Rarity pips are diamonds too: two for rare, three for the secret rare, and the secret rare's set is ringed in gold.

## Components

### Buttons
Three tiers: 60px (big), 52px (standard) and 44px (compact).
- **Primary (foil-struck):** a lamp pill with a vertical foil ramp (lamp highlight to lamp to lamp lip), an inset white top edge and a darker lower lip, in Onest 700 17px card-ink, with the foil-key shadow. On hover it rises 1px onto a brighter ramp, and one white glint passes across it once (700ms). Pressed, it drops 1px and sinks into an inset shadow. Focus is a 3px lamp outline at a 3px offset.
- **Big:** 60px tall with 36px padding and 19px type. Used for the ask and the Say hello band.
- **Compact:** 44px with 20px padding and 15px type. Used for the sticky header's Email me (shown only once the header sticks), the reveal's Next card / Turn it over, and the Copy button.
- **Secondary (soft chip):** a 6% ink fill with a 1px inset ink edge at 20% and a faint top highlight; on hover the fill goes to 10% and the edge to 36%, with a fainter glint. Used for See all cards, the cards-row arrows, inspect's back and forward, and Next card.
- **Text button:** underlined ink-soft text. Used for See all cards in the reveal bar and Rip another pack in the footer bar.
- **Reduced motion:** no glint and no lift or press movement.
- **Focus:** a lamp outline at a 3px offset everywhere. Anything that opens a card gets a 3px outline at a 4px offset.

### Chips
- **Experience tags:** a type-tinted pill with type-tinted text, 0.82rem, at most six per row, desktop only. The tags are skills found verbatim in that job's own text.

### Cards / Containers
The card is a printed object. The anatomy, top to bottom:
1. a **name row**, with the card name, the **stat** top-right (dates, or "N+ yrs"; where a game card prints HP) and a round type disc carrying a 2px-stroke glyph. Nothing sits above the name;
2. the **art window**, 4:3, with a cream inner ring, a frame-dark outer ring, a soft glass vignette and a sliver of gloss;
3. the **caption strip**, the role in italic 700, centred on a band that fades out at both ends;
4. the **body**: italic flavour text and up to two moves, each a diamond-bulleted Bricolage move name with Onest text, clamped, with "+N more" when cut;
5. the **foot**: set number "01/12", rarity pips and a minted "AF" set badge.

The frame is the type colour under a fine engraved hatch and a diagonal metal gloss, with an inset white edge. Inside it, a gold keyline and a frame-dark ring hold the cream panel, which carries a faint paper grain and a print screen. Rarity pips appear only on the player card (rare, two pips, a holo border) and the Contact card (secret rare, three ringed gold pips). Employer cards carry no rarity, either on the card or in their text.

Card art is PS2-era game art with a print-finish pass (`scripts/print-finish.mjs`): it calms the glow and saturation, softens over-crisp detail, then adds a fine halftone screen, paper grain and a hair of ink misregistration, so it reads as printed, not freshly rendered.

### Card back
A plum frame with the same hatch, a gold keyline, a full-bleed back illustration (`/art/back.webp`) under an inner vignette, and a central gold "AF" medallion, double-ringed in plum and gold.

### Signature: the WebGL foil pack
- **Geometry:** the pack is a pillow mesh, flat in the crimps and swelling to 0.16 units in the middle.
- **Material:** MeshPhysical foil with a crinkle normal map, clearcoat 0.7 and iridescence 0.65. It is lit by a warm high spotlight, a violet rim and lightformers in amber, lilac and cyan, under ACES tone mapping.
- **Fit:** it is fitted every frame to the DOM pack's box. The DOM pack keeps the h1, the Rip here tab, the drag and the full fallback.
- **Tilt:** it tilts toward the pointer and sways when idle.
- **Tear-line pulse:** while the pack is sealed and untouched, a glint runs the jagged tear line left to right in 1.1s and leaves a fading trace behind it, like a heart monitor, then rests; the cycle is 2.6s. It disappears the moment a hand is on the pack.
- **Loading:** until the 3D pack draws, the flat pack's art is held back and a quiet foil blank with a slow sheen stands in; the name and title (the h1) stay readable on it. If the 3D pack has not drawn in 2.5s, it gives up and the flat pack shows.

The rip happens in this order:
1. **Tear and curl.** Dragging along the crimp tears columns of the front flap, and they peel up toward the viewer, curling at the top edge, following the hand's direction.
2. **Mouth light.** An additive glow and an amber point light (up to intensity 7) spill out of the opening as it widens.
3. **Tumbling flap.** On release past 42% (or a fast flick), the flap tears free and tumbles away under gravity for 1.2s.
4. **Burst.** About 166 foil shards burst, a white flash frame falls away in 260ms, and the main column kicks for 360ms.
5. **Cards rising.** The first five card fronts rise out of the mouth in a slight fan, each 70ms after the last.

Tapping, pressing Enter or Space, or pressing Rip here plays the same rip on its own over 260ms.

### Signature: the reveal
The reveal is a full-screen dialog on the reveal-plum radial backdrop. It shows a stack of three cards: the top card, the next card exactly under it, and a third offset for depth at reduced brightness. The visitor flicks the top card off: past 110px or 0.7px/ms it flies off at 125vw and 36° over 340ms, and a shorter drag springs back. A hint and a soft **Next card** button sit under the stack (the button reads **Turn it over** while a card is face down); Enter, Space and the right arrow also advance.
- **Face up:** every card comes out face up.
- **Secret rare, build-up:** only the Contact card arrives face down. The throw before it slows to 900ms and the room hushes: a dark vignette closes in and the bar, hint and rays dim. The face-down card then beats like a heart, seven beats that come faster and grow stronger over about 2.6s, each a scale pulse, a brighter gold glow behind it, a soft double thump and a short buzz, while the pile shakes.
- **Secret rare, payoff:** it turns over, and the room lights back up in one wave: a ring of light crosses the screen (900ms), the rays turn to rainbow foil and spin, foil rains from the top, shards burst from both sides of the card, a sparkle plays and the phone buzzes.
- **The turn:** on Chrome and Firefox desktop it is a 700ms spring 3D flip. On phones and Safari it is a 2D turn: the card squeezes to the edge (220ms), the faces swap at zero width, and it springs back out with an overshoot (420ms).
- **Counter:** reads "Card N of 12", plus the rarity on the two rare cards.
- **Last card:** carries Email me and See all cards as two equal halves.

### Signature: the holo (secret rare)
1. **Base:** a silver gradient frame.
2. **Film:** a rainbow film (a repeating 115° hue band over a foil texture, in hard-light) that slides with the pointer.
3. **Glints and glare:** six white glints in screen mode, and a radial glare in overlay.
4. **Art foil:** a soft-light rainbow over the art window.

The card tilts up to 12°/16°. The film, glare and glints follow the pointer, the phone's tilt or a slow idle drift. The French bulldog stands live in 3D in the art window and turns to follow the pointer.

Other rares get a reverse-holo shimmer on the frame through Tilt.

### Signature: inspect
Inspect is a modal with a 96% plum-black backdrop blurred 12px. It shows the card large (up to 420px) and tilting under the hand, beside a ground-2 panel with the card's full text: "Card N of 12" in muted at the top, then name, type-tinted role, dates, rarity on the rare cards, lead and lamp-diamond bullets.
- **Close:** a 44px soft-chip × fixed in the top-right corner, first in the focus order and focused on open. Escape and the backdrop also close it.
- **Footer:** one row, in reading order: a 52px back button, Email me filling the middle, a 52px forward button. The arrow keys step too.
- **Desktop:** the text panel is fixed to the card's height, its copy scrolls inside it, and the footer sits on a rule at its foot, so the row never moves between cards.
- **Phones:** it stacks, and the footer is a slim ground bar pinned to the bottom edge.

Focus is trapped and returns to the opener. It opens from a recent-work tile, an experience art crop or "View card" link, or a cards-row card.

### Navigation
- **Header:** sits absolute over the hero, with the name on the left and Experience, Cards, Contact and a sound toggle on the right. Past 70% of the viewport it sticks: it gets a ground background and a rule hairline, drops in over 260ms, and shows the compact Email me.
- **Phone dock:** a fixed full-width primary Email me, 14px above the safe area, sliding up into place and back down out of the way.

### Recent work tiles
Each tile is a button over its own art with a bottom-up plum scrim. It carries a written headline in plain words (for example "Tech lead on the GenAI agent platform"), a supporting line under it (the confirmed DigitalOcean scope, or a phrase from the resume bullet), and a meta line (company, and dates on the two big tiles). The full resume bullet is in the tile's accessible name. On hover the tile lifts 4px and the art zooms 1.05. Each tile opens its card.

### Experience rows
Each full row shows the dates (tabular, muted), then the company in Title type with the role in type-tinted Onest 600. DigitalOcean then carries its **scope** line in ink 600 (a fact Anthony confirmed, stored as `Chapter.scope`, not a resume bullet). Then the lead line in ink-soft at a 62ch cap, and the rest: one or two lines shown inline, more behind a "Show N more" disclosure. Then the type tags. The job's art crop, 3:2 with a 2px type-colour ring, opens inspect, and "View card" appears on hover. The row gets an 8% type wash on hover. Compact rows (2021 and earlier) show their one or two lines inline (or "Show N"), no lead, no tags, no art, and a "View card" text link.

### The ask and Copy
The ask and the band both pair a big Email me with the address as a link and a compact **Copy** button. Copy says "Copied" for 2.6s; without clipboard access it selects the address and says "Selected, copy it". The result is announced politely.

### Motion grammar
- **Easing:** `--ease-out` (`cubic-bezier(0.16, 1, 0.3, 1)`) for the calm parts, and `--ease-spring` (`cubic-bezier(0.34, 1.56, 0.64, 1)`) for card flips and springbacks.
- **The rip** is violent and finishes under 400ms (flap 380ms, flood 320ms, flash 260ms, jolt 260ms, kick 360ms).
- **Cards** are springy (rise 520ms, throw 340ms, flip 700ms). The secret rare is the one deliberate slowdown: a 900ms throw and a 2.8s heartbeat before the turn.
- **Everything else** is calm, at 200–320ms (hover lifts, header drop, inspect pull 420ms, button glint 700ms).

Idle motion is limited to the sealed pack's bob, the tear-line pulse, the Rip here nudge and the hint arrow.

**Reduced motion:**
- the WebGL pack never mounts, and the rip skips straight to the reveal with no shards, flash, kick, sound or buzz;
- the secret rare keeps the hush but not the heartbeat, and turns with no flip, ring or foil rain;
- every idle and entrance animation stops, and buttons drop their glint and lift;
- the holo drops its idle drift, and the 3D dog holds one pose;
- smooth scroll turns off.

### Sound and haptics
All sound is synthesised in WebAudio and nothing loads up front. The audio context is created on the first gesture (the rip), so nothing autoplays. The sounds are:
- a foil crinkle that ticks with the tear;
- the rip itself;
- a whoosh on each card throw;
- a soft double thump on each heartbeat of the secret rare;
- a sparkle when the secret rare turns.

The header's speaker toggle (`aria-pressed`) mutes everything, and the choice is remembered per visitor. On phones that support it, the vibration pattern is:
- a 6ms tick every few crinkles;
- [18, 40, 70] on the rip;
- [16, 120, 12] on each heartbeat;
- [30, 60, 30, 60, 120] on the secret rare.

### Print
The page prints as the resume:
- it goes white with #111 ink, and the lamp token becomes black;
- the header, pack, lamp, WebGL, dock, recent work, the ask, art crops, the cards row, the band's card, Copy, "View card" and the overlays are hidden;
- every experience disclosure opens before printing and closes after;
- each experience row stays together on one page, and tags flatten to plain text.

## Do's and Don'ts

### Do:
- **Do** keep lamp amber as the one accent, on Email me, focus, selection and rarity notes only.
- **Do** strike primary buttons as foil (ramp, top edge, lower lip, one glint on hover) and keep secondaries as soft chips, on the 60/52/44 tiers.
- **Do** colour anything that belongs to a job through its card type (`--t` / `--frame`) and OKLab mixes of it.
- **Do** size everything on a card in `cqw`, so one card face serves the reveal, the cards row, inspect and the band.
- **Do** give every mailto the subject "Hello from antfreda.com" (`src/lib/contact.ts`).
- **Do** set display type in Bricolage 700–800 narrowed (`wdth` 75–90), and read-text in Onest.
- **Do** trace every claim to the approved resume copy or a fact Anthony confirmed (`Chapter.scope`). Tile headlines are plain restatements, never new claims.
- **Do** run new card art through `scripts/print-finish.mjs` so it reads as printed.
- **Do** bring cards out face up. Only the secret rare arrives face down, with its build-up and payoff.
- **Do** keep the spectacle above the fold and the page below it calm, scannable and complete as HTML, with no WebGL, under reduced motion and in print.
- **Do** keep one working Email me reachable at all times: hero, sticky header or dock, the ask and the band.

### Don't:
- **Don't** print the dog's name anywhere except the About me line (`profile.home` in `resume.ts`). Copy, alt text, labels and metadata call it a French bulldog.
- **Don't** write corny copy. Use plain, direct, first-person wording close to the resume, with no puns, no game-speak and no hype.
- **Don't** give an employer card a rarity. Only the player card is rare and only the Contact card is the secret rare.
- **Don't** put a line, kicker or eyebrow above a card name or a section title.
- **Don't** use Pokémon trade dress: no yellow border, logos or names.
- **Don't** go synthwave, neon or generic dark-glow. The light is one warm lamp, with no coloured second lamp layer.
- **Don't** add a light theme. The world is dark only.
- **Don't** add a second accent colour, or give a decorative element a hue of its own.
- **Don't** use pure black for the ground or hard offset shadows anywhere.
- **Don't** autoplay sound, or play any sound or vibration under reduced motion or when muted.
- **Don't** show unverified metrics, degrees, testimonials or private details on a card or tile.
