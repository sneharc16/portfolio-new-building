/** Logo files fetched by scripts/fetch-logos.sh. Keys without a file render initials on the same white tile. */
export const logoFiles: Record<string, string> = {
  makemytrip: "/logos/makemytrip.svg",
  goibibo: "/logos/goibibo.svg",
  cars24: "/logos/cars24.svg",
  kpmg: "/logos/kpmg.svg",
  igdtuw: "/logos/igdtuw.png",
  drdo: "/logos/drdo.png",
  isro: "/logos/isro.svg",
  samsung: "/logos/samsung.svg",
  citadel: "/logos/citadel.svg",
  leetcode: "/logos/leetcode.svg",
  ieee: "/logos/ieee.svg",
  janestreet: "/logos/janestreet.svg",
  worldquant: "/logos/worldquant.png",
  goldmansachs: "/logos/goldmansachs.svg",
  cisco: "/logos/cisco.svg",
  groww: "/logos/groww.png",
  kaggle: "/logos/kaggle.svg",
  iitdelhi: "/logos/iitdelhi.svg",
  iimbangalore: "/logos/iimbangalore.svg",
  dtu: "/logos/dtu.png",
  iitkanpur: "/logos/iitkanpur.svg",
  paytm: "/logos/paytm.svg",
  neurips: "/logos/neurips.svg",
};

/** Organisation names, used for alt text and the initials fallback. */
export const logoNames: Record<string, string> = {
  makemytrip: "MakeMyTrip",
  goibibo: "Goibibo",
  cars24: "Cars24",
  kpmg: "KPMG",
  igdtuw: "IGDTUW",
  drdo: "DRDO",
  isro: "ISRO",
  samsung: "Samsung",
  citadel: "Citadel",
  icpc: "ICPC",
  codechef: "CodeChef",
  leetcode: "LeetCode",
  tedx: "TEDx",
  ieee: "IEEE",
  janestreet: "Jane Street",
  worldquant: "WorldQuant",
  goldmansachs: "Goldman Sachs",
  cisco: "Cisco",
  groww: "Groww",
  kaggle: "Kaggle",
  sih: "Smart India Hackathon",
  iitdelhi: "IIT Delhi",
  iimbangalore: "IIM Bangalore",
  dtu: "DTU",
  iitkanpur: "IIT Kanpur",
  eightfold: "Eightfold",
  paytm: "Paytm",
  neurips: "NeurIPS",
};

const INITIALS_OVERRIDE: Record<string, string> = {
  icpc: "ICPC",
  codechef: "CC",
  tedx: "TEDx",
  sih: "SIH",
  eightfold: "EF",
};

export function initialsFor(key: string | undefined, fallbackName: string): string {
  if (key && INITIALS_OVERRIDE[key]) return INITIALS_OVERRIDE[key];
  const name = (key && logoNames[key]) || fallbackName;
  const words = name.replace(/[^A-Za-z0-9 ]/g, " ").split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 3).toUpperCase();
  return words.slice(0, 3).map((w) => w[0]).join("").toUpperCase();
}
