// Race counts derived from the race data, never typed by hand.
//
// The guide's headline, deck, intro, section labels, download gate and the
// homepage/author cards all state how many races the list holds. Those numbers
// used to be literals in six places across two files, so removing a bad entry
// meant a page that advertised 40 races and rendered 39. Same failure mode as
// the hand-written status prose that AGENTS.md rule 9 bans: copy that restates
// the data has to be generated from it.
//
// The daily freshness agent retires and removes races on its own, so these
// counts move without a human in the loop. Import them; do not inline a number.
import racesEn from "@/content/races-en.json";

export const CA_RACE_COUNT = racesEn.ca.length;
export const US_RACE_COUNT = racesEn.us.length;
export const TOTAL_RACE_COUNT = CA_RACE_COUNT + US_RACE_COUNT;
