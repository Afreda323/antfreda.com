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
  lamp-hover: "#ffd29a"
  ink: "#f7efe3"
  ink-soft: "#d7cadd"
  muted: "#a99bb5"
  rule: "rgba(247, 239, 227, 0.14)"
  cream: "#fbf3e3"
  card-ink: "#20182a"
  card-soft: "#5b4d63"
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
  tile-quote:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(1.05rem, 1.5vw, 1.4rem)"
    fontWeight: 800
    lineHeight: 1.12
    letterSpacing: "-0.015em"
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
  card-art: "1.4cqw"
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
  button-small:
    backgroundColor: "{colors.lamp}"
    textColor: "{colors.card-ink}"
    rounded: "{rounded.pill}"
    padding: "0 18px"
    height: "38px"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 28px"
    height: "52px"
  rip-tab:
    backgroundColor: "{colors.lamp}"
    textColor: "{colors.card-ink}"
    rounded: "{rounded.pill}"
    padding: "5px 10px 5px 8px"
  card-frame:
    backgroundColor: "{colors.type-partner}"
    textColor: "{colors.card-ink}"
    rounded: "{rounded.card}"
    padding: "3.4cqw"
  card-panel:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.card-ink}"
    rounded: "{rounded.card-inner}"
    padding: "2.6cqw 3.2cqw 2.2cqw"
  card-back:
    backgroundColor: "{colors.card-back}"
    rounded: "{rounded.card}"
    padding: "3.4cqw"
  highlight-tile:
    backgroundColor: "{colors.ground-2}"
    textColor: "{colors.ink}"
    typography: "{typography.tile-quote}"
    rounded: "{rounded.tile}"
  xp-tag:
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "5px 11px"
  skill-chip:
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "7px 13px"
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

The first viewport is a night table with one warm lamp over it, and on it a sealed foil booster pack printed with the page's h1 (the name) and the title. The visitor rips it open. Twelve collectible cards, one per resume section, rise out of the pack and are flicked through one at a time. Then the spectacle stops. Everything below the pack is a calm, scannable landing page on the same plum-black ground. It sells in a fixed order: who he has shipped for, four highlights, the experience, one plain ask, the cards, skills, and a closing Contact band. On that page the colour comes from the card art and the six type colours. The chrome stays dark and quiet, and one lamp-amber accent marks every action.

There are two registers. The pack and the reveal are violent, glossy and physical: foil, crinkle, light, shards and haptics. The page under them is editorial and restrained: rows, rules, tags and quotes. The cards join the two registers, because the same card face appears in the reveal, in inspect and in the Contact band, and the set row shows each card as art and name. All content is real HTML and is server-rendered under the pack, so the page is complete without WebGL, without JavaScript motion, and on paper.

The world refuses the one-page scroll of hero, about, timeline and contact. It also refuses synthwave and neon, generic dark-neon glow, and any Pokémon trade dress (no yellow border, no logos, no names).

**Key Characteristics:**
- A plum-black ground (never pure black) with a single warm lamp pool behind the pack.
- One accent, lamp amber, used for every primary action, the focus ring and the selection.
- Six card type colours carry all the hue below the fold, through card frames, row tints, tags and art borders.
- Bricolage Grotesque, heavy and narrowed on its width axis, for every name and heading; Onest for everything you read.
- A WebGL foil pack that tears for real, and a reveal where every card comes out face up except the secret rare.
- Every card opens into inspect, which shows a big tilting card beside its full text.

## Colors

The neutrals are a warm plum-black ramp, there is one amber accent, and six saturated type colours live only on cards and things that belong to a card.

### Primary
- **Lamp Amber** (`lamp`): the only accent. It fills every Email me button (the hero, the sticky header, the mid-page ask, the Contact band, the phone dock and the reveal's last card), the Rip here tab and the rip-hint arrow. It is also the focus ring, the selection highlight, the "· Rare" / "· Secret rare" note in the reveal counter, and the diamond bullets in inspect. **Lamp Hover** (`lamp-hover`) is its hover step. In WebGL the same amber is the light that spills from the pack's mouth.

### Secondary: the six card types
Each card, experience row and set entry takes one type. The type sets the card frame (`--frame`) and the row tint (`--t`).
- **AI Violet** (`type-ai`): DigitalOcean.
- **Platform Teal** (`type-platform`): Yum Brands, Movement Mortgage, Diligent.
- **Web Coral** (`type-web`): 1V1ME, P00LS.
- **Finance Gold** (`type-finance`): Bank of America.
- **Early Slate** (`type-early`): Before that (early and freelance work).
- **Partner Pink** (`type-partner`): the player card, About, Skills and Contact.

Derived uses are always mixed in OKLab from the type colour and are never new hues:
- frame-dark rings around the card art, at 70% type colour;
- the role strip, at 22% type colour on white;
- the stat and the "+N more" note, at 55–65% type colour on black;
- row hover, at 8%;
- experience tags, with a 16% type-colour background and 45% type colour on white for the text;
- role text in rows and inspect, at 55% type colour on white.

### Tertiary: foil
- **Holo Silver** (`holo-silver`): the base of the secret-rare frame. It is a cool silver gradient, and the rainbow film reads as a prism over it, not as gold.
- **Secret Gold** (`secret-gold`): the ringed rarity pips on the secret rare only.

### Neutral
- **Plum-Black Ground** (`ground`): the page, the html background, the theme-color and the stuck header.
- **Plum Raise** (`ground-2`): highlight tiles, the inspect text panel, and the xp-art placeholder.
- **Plum Rise** (`ground-3`): the scrollbar thumb.
- **Reveal Plum → Reveal Deep** (`reveal-plum` → `reveal-deep`): the radial backdrop of the reveal stage.
- **Warm Ink** (`ink`): headings, current-employer wordmark, chip text.
- **Ink Soft** (`ink-soft`): body copy, nav links, leads.
- **Muted Lilac** (`muted`): dates, labels, the reveal hint, the footer.
- **Rule** (`rule`): row dividers, the stuck-header hairline and chip outlines.
- **Card Cream** (`cream`) with **Card Ink** (`card-ink`) and **Card Soft** (`card-soft`): the inner panel of every card. Card Ink also sets the text on amber buttons.
- **Card Back Plum** (`card-back`): the shared card back, with an "AF" monogram on a woven foil field.

### Named Rules
**The One Lamp Rule.** Lamp amber is the only accent on the chrome. Each viewport has one primary Email me at most, plus the sticky one. No second accent appears.

**The Type Owns the Hue Rule.** Below the pack, saturated colour appears only through a card type: its art, its frame, its row tint and its tags. Nothing decorative gets a colour of its own.

## Typography

**Display Font:** Bricolage Grotesque (variable, `wdth` and `opsz` axes), with system-ui fallback.
**Body Font:** Onest (400–700), with system-ui fallback.

**Character:** Bricolage, set at weight 800 and narrowed to 80–90 width, reads like printed card lettering when small and like a logo when large. Onest is compact and clear, and stays legible at about 11px on a card face.

### Hierarchy
- **Pack brand** (`pack-brand`): the name on the wrapper, which is the page's h1. It is white with a 0.04em plum stroke painted under the fill, with a drop shadow.
- **Display** (`display`): the Contact heading in the closing band.
- **Headline** (`headline`): section titles (Highlights, Experience, Cards, Skills). The mid-page ask has its own h2, a step smaller. Inspect h2 uses the same face at `clamp(2rem, 3.4vw, 3rem)`, `wdth` 88.
- **Title** (`title`): company names in experience rows.
- **Tile quote** (`tile-quote`): the quoted outcome on a highlight tile. It steps up to `clamp(1.4rem, 2.2vw, 1.9rem)` on the large tile and down to `clamp(1rem, 1.25vw, 1.15rem)` on square tiles.
- **Wordmark**: the proof strip names, in Bricolage 800 at `wdth` 82 and `clamp(1.15rem, 1.75vw, 1.6rem)`.
- **Card name / card move / card body** (`card-name`, `card-move`, `card-body`): sized in container units (`cqw`), so every card scales as one object, from the inspect card to the 440px reveal card.
- **Body** (`body`): 17px on desktop and 16px at 860px and below. Leads and row text are capped at 62ch.
- **Lead** (`lead`): experience leads and the ask subline, in ink-soft.
- **Label** (`label`): nav, hints, the reveal counter and buttons (700 17px on buttons). Numbers are tabular.
- **Pack label** (`pack-label`): the title pill and the pack foot, the only uppercase tracked text in the system. They are printed on the wrapper, not on the page.

### Named Rules
**The Narrow Heavy Rule.** Display type is always weight 800 with `wdth` between 75 and 90. Bricolage is never set at its default width or a light weight.

**The No Kicker Rule.** Section titles stand alone. No uppercase eyebrows sit above them, and no line sits above a card name. Uppercase tracking belongs to the printed pack only.

## Layout

There is one centred column, 1180px max, with a fluid gutter (`clamp(20px, 4.5vw, 64px)`). The opening is a full `100svh` grid with the pack centred under the lamp at `min(66svh, 640px)` tall. The line and the actions (Email me, LinkedIn, GitHub) sit centred at its foot.

Below the pack:
- the proof strip comes 56px down;
- the sections are spaced 110–130px apart on desktop and 80px apart at 860px and below;
- the mid-page ask comes 70px after the experience list.

Patterns:
- **Proof strip:** a justified row of employer wordmarks, with the current employer in ink and the rest at 68% ink (about 6:1, AA at every size).
- **Highlights bento:** 4 columns with rows of `clamp(180px, 17vw, 230px)` and 16px gaps. Tiles come in three sizes: one 2×2 tile, wide tiles and square tiles.
- **Experience rows:** a 3-column grid of `9rem | 1fr | 170px` (dates, body, art crop), separated by top rules and with 30px vertical padding.
- **Skills:** three equal columns of chips.
- **Cards:** a full-bleed horizontal scroll-snap row of compact faces (name, 4:3 art, role and stat) framed in the card's type colour; the secret rare gets a foil wash. Its left edge aligns with the content column, faces are `clamp(200px, 21vw, 260px)` wide (68vw on phones), a 120px mask fade on the right shows there is more, and quiet arrow buttons page it on hover devices.
- **Experience:** roles from 2022 on get full rows (lead, disclosure, tags, art crop). 2021 and earlier are compact: one to two lines shown inline, a text "View card" link, no art. On phones every row is full-width text, art crops and tags are dropped, and "View card" is a text link.
- **Ask:** an h2 question, a subline with the title, city and the product-and-design line, then Email me plus the address with a Copy button.
- **Contact band:** an inset, rounded panel with the copy on the left and the secret-rare holo, tilted 6°, on the right.

The breakpoint is 860px. The phone layout differs as follows:
- the opening top-aligns, with 104px of headroom for the rising cards;
- the pack is `min(58svh, 500px)` tall;
- the hero Email me hides, and a fixed full-width **dock** takes its place. The dock hides near the Contact band and under overlays;
- the bento becomes 2 columns, and square tiles span full width;
- experience rows become `1fr | 96px`, with dates on their own line;
- Skills stack;
- the Contact band stacks with the card on top, and its Email me spans full width;
- the header's Contact link and its sticky Email me hide.

A middle range from 861px to 1160px exists only in legacy rules.

## Elevation & Depth

Depth is physical and lit from one source. Surfaces are tonal plum steps. Shadows are soft and long, and fall down and away from the lamp. Light is additive: the lamp pool, the mouth light, the rip flash and the reveal rays. There are no hard offset shadows and no neon glows; even the amber buttons cast neutral shadows.

### Shadow Vocabulary
- **Table contact** (`radial-gradient(closest-side, rgba(0,0,0,0.55), transparent)`, blurred 6px): the pack resting on the table.
- **Card drop** (`0 18px 40px -18px rgba(0,0,0,0.7), 0 4px 10px rgba(0,0,0,0.35)` plus a 2px inset top highlight): every card face and back.
- **Lamp lift** (`0 10px 30px -10px rgba(255,170,80,0.55)`; hover `0 16px 36px -12px rgba(255,170,80,0.7)`): primary buttons. Only amber casts amber.
- **Tile** (`0 24px 40px -28px rgba(0,0,0,0.9)` plus a 1px inset highlight): highlight tiles, deepening on hover.
- **Band** (`0 40px 80px -40px rgba(0,0,0,0.9)` plus inset highlight): the Contact band.
- **Held card** (`drop-shadow(0 30px 30px rgba(0,0,0,0.5))`): a tilted card set on the page.

### Named Rules
**The One Light Rule.** Every highlight and spill is warm and comes from the lamp or from inside the pack. Cool light appears only as the violet and teal rim lights in WebGL.

## Shapes

- The card is the master silhouette, with a 63:88 aspect. Its frame radius is 4.6cqw, the inner panel 2.6cqw and the art window 1.4cqw (3:2). Radii are in container units, so a card looks identical at every size.
- The pack is a 0.64-aspect pillow with crimped zigzag seals top and bottom and a jagged tear line 11.5% down.
- Controls are full pills (999px): buttons, tags, chips, the Rip here tab and the pack's title pill.
- Content panels round softly, from 12px on art crops through 18px on inspect and 20px on tiles to 28px on the band.
- Bullets are small rotated squares (diamonds): lamp-coloured in inspect and type-coloured in experience details.
- Rarity pips are diamonds too: two for rare, three for the secret rare, and the secret rare's set is ringed in gold.

## Components

### Buttons
- **Primary:** a lamp-amber pill, 52px tall with 28px padding, in Onest 700 17px card-ink, with the lamp-lift shadow. On hover it rises 2px and brightens to lamp-hover. When pressed it scales to 0.98.
- **Big:** 60px tall with 36px padding and 19px type. Used for the mid-page ask and the Contact band.
- **Small:** 38px with no shadow. Used for the sticky header's Email me, which fades in only once the header sticks.
- **Quiet:** transparent with a 1.5px inset ink ring at 40% (70% on hover). Used for See all cards, Rip another pack and inspect's arrows.
- **Text button:** underlined ink-soft text. Used for See all cards in the reveal bar and Rip another pack in the footer.
- **Focus:** a 2px lamp outline at a 3px offset everywhere. Anything that opens a card gets a 3px outline at a 4px offset.

### Chips
- **Experience tags:** a type-tinted pill with type-tinted text, 0.82rem, at most six per row. The tags are skills found verbatim in that job's own text.
- **Skill chips:** a 6% white fill with a 1px rule inset, in ink at 0.92rem.

### Cards / Containers
The anatomy, top to bottom:
1. a **name row**, with the card name and a round type disc carrying a 2px-stroke glyph. Nothing sits above the name;
2. the **art window**, with a white inner ring and a frame-dark outer ring;
3. the **role strip**, with the role on the left and the stat (dates or "8+ yrs") on the right;
4. the **body**: italic flavour text and up to two moves, each a Bricolage move name with Onest text, clamped to two lines, with "+N more" when cut;
5. the **foot**: set number "01/12", rarity pips and "AF set".

The frame is the type colour under a diagonal gloss. The body is cream. Rarity pips appear only on the player card (rare, two pips) and the Contact card (secret rare, three ringed gold pips). Employer cards carry no rarity, either on the card or in their text.

### Signature: the WebGL foil pack
- **Geometry:** the pack is a pillow mesh, flat in the crimps and swelling to 0.16 units in the middle.
- **Material:** MeshPhysical foil with a crinkle normal map, clearcoat 0.7 and iridescence 0.65. It is lit by a warm high spotlight, a violet rim and lightformers in amber, lilac and cyan, under ACES tone mapping.
- **Fit:** it is fitted every frame to the DOM pack's box. The DOM pack keeps the h1, the Rip here tab, the drag and the full fallback.
- **Tilt:** it tilts toward the pointer and sways when idle.

The rip happens in this order:
1. **Tear and curl.** Dragging along the crimp tears columns of the front flap, and they peel up toward the viewer, curling at the top edge, following the hand's direction.
2. **Mouth light.** An additive glow and an amber point light (up to intensity 7) spill out of the opening as it widens.
3. **Tumbling flap.** On release past 42% (or a fast flick), the flap tears free and tumbles away under gravity for 1.2s.
4. **Burst.** About 166 foil shards burst, a white flash frame falls away in 260ms, and the main column kicks for 360ms.
5. **Cards rising.** The first five card fronts rise out of the mouth in a slight fan, each 70ms after the last.

Tapping, pressing Enter or Space, or pressing Rip here plays the same rip on its own over 260ms.

### Signature: the reveal
The reveal is a full-screen dialog on the reveal-plum radial backdrop. It shows a stack of three cards: the top card, the next card exactly under it, and a third offset by 7px and 1.6° at 82% brightness. The visitor flicks the top card off: past 110px or 0.7px/ms it flies off at 125vw and 36° over 340ms, and a shorter drag springs back.
- **Face up:** every card comes out face up.
- **Secret rare:** only the Contact card arrives face down. It glows gold and pink while the stack shakes for 1.1s, then turns with a 700ms spring flip while rays spin up behind it and shards burst from both sides.
- **Counter:** reads "Card N of 12", plus the rarity on the two rare cards.
- **Last card:** carries Email me and See all cards.

### Signature: the holo (secret rare)
1. **Base:** a silver gradient frame.
2. **Film:** a rainbow film (a repeating 115° hue band over a foil texture, in hard-light) that slides with the pointer.
3. **Glints and glare:** six white glints in screen mode, and a radial glare in overlay.
4. **Art foil:** a soft-light rainbow over the art window.

The card tilts up to 12°/16°. The film, glare and glints follow the pointer, the phone's tilt or a slow idle drift. The French bulldog stands live in 3D in the art window and turns to follow the pointer.

Other rares get a reverse-holo shimmer on the frame through Tilt.

### Signature: inspect
Inspect is a modal with a 96% plum-black backdrop blurred 12px. It shows the card large (up to 420px) and tilting under the hand, beside a ground-2 panel with the card's full text: name, type-tinted role, dates, rarity on the rare cards, lead and lamp-diamond bullets. A quiet ← 1/12 → control steps through the set (the arrow keys work too), then Email me as the primary button and a quiet Close. Escape or the backdrop closes it, focus is trapped, and focus returns to the opener. It opens from a highlight tile, an experience art crop or a set-row card. On phones it stacks.

### Navigation
- **Header:** sits absolute over the hero, with the name on the left and Experience, Cards, Contact and a sound toggle on the right. Past 70% of the viewport it sticks: it gets a ground background and a rule hairline, drops in over 260ms, and shows the small Email me.
- **Phone dock:** a fixed full-width primary Email me, 14px above the safe area.

### Experience rows
Each row shows the dates (tabular, muted), then the company in Title type with the role in type-tinted Onest 600, then the lead line in ink-soft at a 62ch cap. Below that, a "N more details" disclosure with a rotating chevron, then the type tags. The job's art crop, 3:2 with a 2px type-colour ring, opens inspect, and "View card" appears on hover. The row gets an 8% type wash on hover.

### Highlights bento
Four tiles (one 2×2, one wide, two square), none repeating an experience lead. Each is a quoted resume outcome, word for word from the resume copy, set over its card's art, with a bottom-up plum scrim and a meta line (company · role · dates). On hover the tile lifts 4px and the art zooms 1.05. Each tile opens its card.

### Motion grammar
- **Easing:** `--ease-out` (`cubic-bezier(0.16, 1, 0.3, 1)`) for the calm parts, and `--ease-spring` (`cubic-bezier(0.34, 1.56, 0.64, 1)`) for card flips and springbacks.
- **The rip** is violent and finishes under 400ms (flap 380ms, flood 320ms, flash 260ms, jolt 260ms, kick 360ms).
- **Cards** are springy (rise 520ms, throw 340ms, flip 700ms).
- **Everything else** is calm, at 200–320ms (hover lifts, header drop, inspect pull 420ms).

Idle motion is limited to the sealed pack's bob, the Rip here nudge and the hint arrow.

**Reduced motion:**
- the WebGL pack never mounts, and the rip skips straight to the reveal with no shards, flash, kick, sound or buzz;
- the secret rare turns instantly with no flip transition;
- every idle and entrance animation stops;
- the holo drops its idle drift, and the 3D dog holds one pose;
- smooth scroll turns off.

### Sound and haptics
All sound is synthesised in WebAudio and nothing loads up front. The audio context is created on the first gesture (the rip), so nothing autoplays. The sounds are:
- a foil crinkle that ticks with the tear;
- the rip itself;
- a whoosh on each card throw;
- a sparkle when the secret rare turns.

The header's speaker toggle (`aria-pressed`) mutes everything, and the choice is remembered per visitor. On phones that support it, the vibration pattern is:
- a 6ms tick every few crinkles;
- [18, 40, 70] on the rip;
- [30, 60, 30, 60, 120] on the secret rare.

### Print
The page prints as the resume:
- it goes white with #111 ink, and the lamp token becomes black;
- the header, pack, lamp, WebGL, dock, highlights, the mid-page ask, art crops, the set row, the Contact card and the overlays are hidden;
- every experience disclosure opens before printing and closes after;
- each experience row stays together on one page, and tags and chips flatten to plain text.

## Do's and Don'ts

### Do:
- **Do** keep lamp amber as the one accent, on Email me, focus, selection and rarity notes only.
- **Do** colour anything that belongs to a job through its card type (`--t` / `--frame`) and OKLab mixes of it.
- **Do** size everything on a card in `cqw`, so one card face serves the reveal, inspect and the Contact band.
- **Do** give every mailto the subject "Hello from antfreda.com" (`src/lib/contact.ts`).
- **Do** set display type in Bricolage 800 narrowed (`wdth` 80–90), and read-text in Onest.
- **Do** keep every claim word for word from the approved resume copy. Highlight tiles are quotes, not paraphrases.
- **Do** bring cards out face up. Only the secret rare arrives face down and turns.
- **Do** keep the spectacle above the fold and the page below it calm, scannable and complete as HTML, with no WebGL, under reduced motion and in print.
- **Do** keep one working Email me reachable at all times: hero, sticky header or dock, the ask and the band.

### Don't:
- **Don't** ever print the dog's name, in copy, alt text, labels or metadata. Call it a French bulldog.
- **Don't** write corny copy. Use plain, direct, first-person wording close to the resume, with no puns, no game-speak and no hype.
- **Don't** give an employer card a rarity. Only the player card is rare and only the Contact card is the secret rare.
- **Don't** put a line, kicker or eyebrow above a card name or a section title.
- **Don't** use Pokémon trade dress: no yellow border, logos or names.
- **Don't** go synthwave, neon or generic dark-glow. The light is one warm lamp.
- **Don't** add a second accent colour, or give a decorative element a hue of its own.
- **Don't** use pure black for the ground or hard offset shadows anywhere.
- **Don't** autoplay sound, or play any sound or vibration under reduced motion or when muted.
- **Don't** show unverified metrics, degrees, testimonials or private details on a card or tile.
