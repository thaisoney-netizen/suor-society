import { buildShareCard, shareCardSize } from "@/lib/share-card";

// English share card. Tagline is its own copy (see src/lib/share-card.tsx)
export const alt = "Suor Society, hybrid training culture for people who don’t train for a living";
export const size = shareCardSize;
export const contentType = "image/png";

export default function Image() {
  return buildShareCard(
    "Races, gear, and hybrid training for people who run and lift"
  );
}
