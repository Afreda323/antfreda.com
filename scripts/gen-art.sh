#!/bin/sh
# Generates card art with Codex image generation, one image per run (sequential:
# parallel codex runs hang). Usage: scripts/gen-art.sh <id> [<id> ...]
# Writes assets-src/cards/<id>.png plus a <id>.png.json provenance sidecar.
cd "$(dirname "$0")/.." || exit 1
OUT=assets-src/cards
mkdir -p "$OUT"
ELLIE_REF=../../assets-src/concepts/dog.png

STYLE="PS2-era video game screenshot, early-2000s 3D game engine render, low polygon count with visible facets, soft hand-painted low-resolution textures, gouraud shading, warm bloom glow and soft distance fog, vivid saturated colours, cinematic three-quarter camera, a rich, detailed, inviting scene, the subject centred and clear margin on all sides, no text, no letters, no numbers, no logos, no UI, no HUD, no watermark, no border"
ELLIE="The dog is Ellie, a blue-grey French bulldog exactly like the reference image: blue-grey coat, a thin white stripe down the chest, a grey chin the same colour as her coat, tall upright bat ears with pink insides, dark round eyes."

prompt_for() {
  case "$1" in
    trainer) echo "$ELLIE Ellie sits proudly on a cluttered developer desk at night beside a glowing laptop, a coffee mug and a small desk plant, warm desk-lamp light, cosy bedroom-office behind her." ;;
    about) echo "A quiet tree-lined neighbourhood street at golden hour under huge old willow oaks whose branches meet overhead, a brick sidewalk, porch lights coming on, a small modern city skyline glowing at the end of the street. No people, no animals." ;;
    yum) echo "An American roadside fast-food strip at dusk off a two-lane highway: several small generic drive-thru restaurants and a couple of food trucks side by side across one shared parking lot, all linked to each other by long strings of warm bulb lights overhead, cars waiting in the drive-thru lanes, a tall blank pole sign with no lettering, power lines, a pickup truck, a gas station in the distance." ;;
    digitalocean) echo "A tall lighthouse on a rocky islet at night sweeping a bright beam across a dark ocean, the beam picking out glowing sheets of paper drifting on the water like search results." ;;
    1v1me) echo "An esports arena stage: two gaming setups face off under spotlights, giant screens above showing abstract colourful gameplay, a crowd silhouetted in the haze." ;;
    p00ls) echo "A mossy stone wishing well in an enchanted forest clearing overflowing with glowing golden tokens that float up like fireflies." ;;
    movement) echo "A cosy two-storey suburban house at dusk with warm glowing windows, a winding path, a mailbox and a small tree, the first stars out." ;;
    diligent) echo "A sleek office tower being assembled from stacked glowing modular blocks by small cranes at dawn, each block a different softly lit room." ;;
    bofa) echo "Inside a grand bank vault, the massive round door swung open, gold and bronze medals resting on deep red velvet, warm spotlight." ;;
    earlier) echo "A cluttered garden-shed workshop at night: an old beige CRT computer, hand tools on a pegboard, a radio, a single warm hanging bulb, rain outside the little window." ;;
    skills) echo "A crossroads signpost with many blank wooden arrow signs on a grassy hilltop under a twilight sky filled with floating glowing orbs in violet, teal and coral." ;;
    contact) echo "A small bright-red mailbox on a grassy cliff edge under a dramatic cosmic night sky: a radiant starburst, swirling aurora ribbons and a shooting star, the whole sky shimmering. Leave the lower centre of the frame open and calm." ;;
    oblivion) echo "$ELLIE A conversation-camera close-up of Ellie, centred and facing the viewer from the chest up, as if the player just started talking to her, inside a dim wooden inn room: a rough stone fireplace with a warm glow behind her, plain timber beams, a bookshelf of identical red and green books, a faded green tapestry, a small wooden table with a plate and a candle." ;;
    back) echo "The back of a collectible trading card, pure ornamental art: a deep plum-violet cosmic energy swirl spiralling into a calm, empty, softly glowing amber core in the exact centre, fine concentric rings and radiating light streaks, scattered tiny sparkles, rich symmetrical composition, the centre third left empty and smooth for an emblem to be printed later." ;;
    pack) echo "$ELLIE Ellie leaps heroically toward the viewer, ears up and mouth open in a happy grin, as a burst of glossy trading cards explodes around her against a radiant sunburst background." ;;
    *) return 1 ;;
  esac
}

# "<id>-raw": the same subject as a real, unglamorous console capture (the polished look reads as AI-generated)
RAW="It must look exactly like a real, unedited screenshot captured from a 2002 PlayStation 2 game running on real hardware at 640x448: low-resolution blurry textures, simple low-poly geometry with hard visible edges and jaggies, flat vertex lighting, a limited but still colourful palette, distance fog that swallows the background, sparse props, plain flat lighting (no glowing magic, no heavy bloom), slightly soft and compressed. Not a modern render, not concept art, not a painting, not cinematic. No text, no letters, no logos, no UI, no HUD, no watermark, no border."

# style trials: "<id>-riso", "<id>-ligne", "<id>-lino" render the same subject in a hand-made print or drawing style
NOSTYLE="no text, no letters, no numbers, no logos, no signage lettering, no watermark, no border, not photorealistic, not a 3D render, not glossy digital painting"
RISO="A risograph print: three or four flat spot-colour inks (fluorescent pink, teal, warm yellow, deep navy) on off-white paper, coarse halftone dot shading, slight ink misregistration between colours, grainy uneven ink coverage, bold simplified shapes, limited detail, like a small-press poster. $NOSTYLE"
LIGNE="A ligne claire editorial illustration: uniform thin black outlines, completely flat colour fills with no gradients or rendering, a calm muted palette, precise simple shapes, clear readable composition with generous negative space, like a mid-century European comic panel or a New Yorker spot illustration. $NOSTYLE"
LINO="A hand-carved linocut block print in two or three colours (black plus warm red and ochre) on cream paper, bold carved gouge marks and visible wood-grain texture, chunky simplified forms, imperfect hand-inked coverage. $NOSTYLE"

for id in "$@"; do
  base=${id%-raw}; base=${base%-riso}; base=${base%-ligne}; base=${base%-lino}
  subject=$(prompt_for "$base") || { echo "unknown id $id"; continue; }
  # the pack wrapper is portrait; every card art window is landscape
  case "$id" in back) shape="portrait image (1024x1536)"; frame="portrait 2:3, perfectly symmetrical left to right, edge to edge, no card border drawn" ;; pack) shape="portrait image (1024x1536)"; frame="portrait 2:3 composition, the dog in the middle third with open space at the top and bottom for printed lettering" ;; *) shape="landscape image (1536x1024)"; frame="" ;; esac
  full="$subject $STYLE $frame"
  # the Oblivion proof of concept: same subject rules, a 2006 high-fantasy engine look instead of PS2
  case "$id" in *-raw) full="$subject $RAW" ;; *-riso) full="$subject $RISO" ;; *-ligne) full="$subject $LIGNE" ;; *-lino) full="$subject $LINO" ;; esac
  [ "$id" = oblivion ] && full="$subject It must look exactly like a real 2006 PC game screenshot from a Gamebryo-engine role-playing game such as Oblivion, captured at 1024x768: blurry low-resolution textures stretched over simple low-poly geometry, flat ambient lighting with a heavy overbright HDR bloom haze, waxy plastic-looking shading on the character, muddy brown interior colours, soft and slightly smeared overall, dark corners, no fine detail, no painterly or concept-art quality, not a modern render, no text, no letters, no logos, no UI, no HUD, no subtitles, no watermark, no border"
  case "$subject" in *Ellie*) ref="-i $ELLIE_REF" ;; *) ref="" ;; esac
  echo "== $id"
  # prompt first, then -i; stdin closed so codex does not wait on it
  perl -e 'alarm 480; exec @ARGV' codex exec --skip-git-repo-check -s workspace-write \
    "Use your image generation tool to create ONE $shape and save it as PNG at $OUT/$id.png (create it via the tool, then copy/move the generated file to that exact path). Prompt: $full Do nothing else." \
    $ref < /dev/null 2>&1 | tail -3
  if [ -f "$OUT/$id.png" ]; then
    python3 -I -c 'import json,sys; json.dump({"prompt": sys.argv[1], "tool": "codex image_generation", "reference": sys.argv[2] or None}, open(sys.argv[3], "w"), indent=2)' "$full" "${ref#-i }" "$OUT/$id.png.json"
    sips -g pixelWidth -g pixelHeight "$OUT/$id.png" | tail -2
  else
    echo "MISSING $id"
  fi
done
