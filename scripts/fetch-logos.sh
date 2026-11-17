#!/usr/bin/env bash
# Downloads every organisation logo used on the portfolio into public/logos and records its source.
# Sources are the logo files on Wikimedia (Commons, or English Wikipedia for non-free logos),
# i.e. the file each organisation's own Wikipedia infobox uses.
# Keys with no entry below render the initials fallback in <LogoTile>.
#
# Usage: bash scripts/fetch-logos.sh   (then: node scripts/process-logos.mjs)
set -uo pipefail

cd "$(dirname "$0")/.."
OUT=public/logos
mkdir -p "$OUT"
UA="sneha-portfolio-logo-fetch/1.0 (personal portfolio build)"

# key | file URL | human-readable source page
LOGOS=(
  "makemytrip|https://upload.wikimedia.org/wikipedia/commons/6/61/Makemytrip_logo.svg|https://commons.wikimedia.org/wiki/File:Makemytrip_logo.svg"
  "goibibo|https://upload.wikimedia.org/wikipedia/commons/3/32/Goibibo_Logo.svg|https://commons.wikimedia.org/wiki/File:Goibibo_Logo.svg"
  "cars24|https://upload.wikimedia.org/wikipedia/en/e/ef/Cars24_logo.svg|https://en.wikipedia.org/wiki/File:Cars24_logo.svg"
  "kpmg|https://upload.wikimedia.org/wikipedia/commons/d/db/KPMG_blue_logo.svg|https://commons.wikimedia.org/wiki/File:KPMG_blue_logo.svg"
  "igdtuw|https://upload.wikimedia.org/wikipedia/en/4/4e/Indira_Gandhi_Delhi_Technical_University_for_Women_logo.png|https://en.wikipedia.org/wiki/File:Indira_Gandhi_Delhi_Technical_University_for_Women_logo.png"
  "drdo|https://upload.wikimedia.org/wikipedia/en/1/1d/Defence_Research_and_Development_Organisation.svg|https://en.wikipedia.org/wiki/File:Defence_Research_and_Development_Organisation.svg"
  "isro|https://upload.wikimedia.org/wikipedia/commons/b/bd/Indian_Space_Research_Organisation_Logo.svg|https://commons.wikimedia.org/wiki/File:Indian_Space_Research_Organisation_Logo.svg"
  "samsung|https://upload.wikimedia.org/wikipedia/commons/b/b7/Samsung_Black_icon.svg|https://commons.wikimedia.org/wiki/File:Samsung_Black_icon.svg"
  "citadel|https://upload.wikimedia.org/wikipedia/commons/4/45/Citadel_LLC_Logo.svg|https://commons.wikimedia.org/wiki/File:Citadel_LLC_Logo.svg"
  "leetcode|https://upload.wikimedia.org/wikipedia/commons/0/0a/LeetCode_Logo_black_with_text.svg|https://commons.wikimedia.org/wiki/File:LeetCode_Logo_black_with_text.svg"
  "ieee|https://upload.wikimedia.org/wikipedia/commons/2/21/IEEE_logo.svg|https://commons.wikimedia.org/wiki/File:IEEE_logo.svg"
  "janestreet|https://upload.wikimedia.org/wikipedia/commons/c/c9/Jane_Street_Capital_Logo.svg|https://commons.wikimedia.org/wiki/File:Jane_Street_Capital_Logo.svg"
  "worldquant|https://upload.wikimedia.org/wikipedia/commons/b/bf/WorldQuant_Text_Logo_2022.jpg|https://commons.wikimedia.org/wiki/File:WorldQuant_Text_Logo_2022.jpg"
  "goldmansachs|https://upload.wikimedia.org/wikipedia/commons/1/1d/Goldman_Sachs_logo.svg|https://commons.wikimedia.org/wiki/File:Goldman_Sachs_logo.svg"
  "cisco|https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg|https://commons.wikimedia.org/wiki/File:Cisco_logo_blue_2016.svg"
  "groww|https://upload.wikimedia.org/wikipedia/commons/b/bb/Groww_app_logo.png|https://commons.wikimedia.org/wiki/File:Groww_app_logo.png"
  "kaggle|https://upload.wikimedia.org/wikipedia/commons/7/7f/Kaggle_Logo_2026.svg|https://commons.wikimedia.org/wiki/File:Kaggle_Logo_2026.svg"
  "iitdelhi|https://upload.wikimedia.org/wikipedia/en/f/fd/Indian_Institute_of_Technology_Delhi_Logo.svg|https://en.wikipedia.org/wiki/File:Indian_Institute_of_Technology_Delhi_Logo.svg"
  "iimbangalore|https://upload.wikimedia.org/wikipedia/en/a/a2/IIM_Bangalore_Logo.svg|https://en.wikipedia.org/wiki/File:IIM_Bangalore_Logo.svg"
  "dtu|https://upload.wikimedia.org/wikipedia/en/b/b5/DTU%2C_Delhi_official_logo.png|https://en.wikipedia.org/wiki/File:DTU,_Delhi_official_logo.png"
  "iitkanpur|https://upload.wikimedia.org/wikipedia/en/a/a3/IIT_Kanpur_Logo.svg|https://en.wikipedia.org/wiki/File:IIT_Kanpur_Logo.svg"
  "paytm|https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg|https://commons.wikimedia.org/wiki/File:Paytm_Logo_(standalone).svg"
  "neurips|https://upload.wikimedia.org/wikipedia/en/0/08/Logo_for_Conference_on_Neural_Information_Processing_Systems.svg|https://en.wikipedia.org/wiki/File:Logo_for_Conference_on_Neural_Information_Processing_Systems.svg"
)
# No usable light-background logo file found on Wikimedia; LogoTile shows initials.
FALLBACK=(icpc codechef eightfold sih tedx)
# tedx: Commons only has other events' TEDx wordmarks (not TEDxIGDTU), so initials are used.

SOURCES="$OUT/SOURCES.md"
{
  echo "# Logo sources"
  echo
  echo "Each logo identifies an organisation on the owner's own portfolio. Files are unmodified apart from"
  echo "raster trimming and white flattening (scripts/process-logos.mjs)."
  echo
} > "$SOURCES"

failed=()
for row in "${LOGOS[@]}"; do
  IFS='|' read -r key url page <<<"$row"
  ext="${url##*.}"; ext="$(echo "$ext" | tr 'A-Z' 'a-z')"
  [[ "$ext" == "jpeg" ]] && ext=jpg
  dest="$OUT/$key.$ext"
  ok=0
  for attempt in 1 2 3 4; do
    code=$(curl -sSL -A "$UA" -o "$dest" -w '%{http_code}' "$url" || echo 000)
    if [[ "$code" == "200" ]]; then ok=1; break; fi
    python3 -c "import time; time.sleep(${attempt}*8)"
  done
  if [[ $ok == 1 ]]; then
    echo "- \`$key.$ext\`: $page" >> "$SOURCES"
    echo "ok    $key.$ext"
  else
    rm -f "$dest"; failed+=("$key"); echo "FAIL  $key ($code)"
  fi
  python3 -c "import time; time.sleep(1.5)"
done

{
  echo
  echo "## Initials fallback (no file)"
  for k in "${FALLBACK[@]}" "${failed[@]+"${failed[@]}"}"; do echo "- \`$k\`"; done
} >> "$SOURCES"

echo "fallbacks: ${FALLBACK[*]} ${failed[*]+"${failed[*]}"}"
