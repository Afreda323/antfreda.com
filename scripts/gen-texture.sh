#!/bin/sh
# Generates world textures with Codex image generation (sequential). Usage: scripts/gen-texture.sh <id> [...]
# Writes assets-src/textures/<id>.png plus a provenance sidecar.
cd "$(dirname "$0")/.." || exit 1
OUT=assets-src/textures
mkdir -p "$OUT"
STYLE="seamless tileable texture, edges wrap perfectly on all four sides, flat even lighting with no vignette, no shadows, viewed straight down, no objects, no text, no logos, square 1:1, PS2-era game texture look: soft hand-painted, slightly low-resolution detail, rich but muted colour"
prompt_for() {
  case "$1" in
    table) echo "Dark walnut wood tabletop planks, warm brown with subtle grain and a few soft knots, slightly worn satin finish." ;;
    vinyl) echo "Deep plum-purple leatherette binder cover, fine pebbled grain, a faint sheen." ;;
    paper) echo "Warm cream printing paper with a very faint fibre texture and slight speckle, like the paper of a trading-card game rulebook." ;;
    *) return 1 ;;
  esac
}
for id in "$@"; do
  subject=$(prompt_for "$id") || { echo "unknown $id"; continue; }
  full="$subject $STYLE"
  echo "== $id"
  perl -e 'alarm 480; exec @ARGV' codex exec --skip-git-repo-check -s workspace-write \
    "Use your image generation tool to create ONE square image (1024x1024) and save it as PNG at $OUT/$id.png (create it via the tool, then copy/move the generated file to that exact path). Prompt: $full Do nothing else." < /dev/null 2>&1 | tail -2
  if [ -f "$OUT/$id.png" ]; then
    python3 -I -c 'import json,sys; json.dump({"prompt": sys.argv[1], "tool": "codex image_generation"}, open(sys.argv[2], "w"), indent=2)' "$full" "$OUT/$id.png.json"
  else echo "MISSING $id"; fi
done
