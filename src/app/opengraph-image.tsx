import { buildShareCard, shareCardSize } from "@/lib/share-card";

// English share card — tagline mirrors the home hero (dictionaries.ts heroTag)
export const alt = "Suor Society, hybrid running culture for people with jobs";
export const size = shareCardSize;
export const contentType = "image/png";

export default function Image() {
  return buildShareCard(
    "Race picks, gear, and culture for people who lift and run."
  );
}
