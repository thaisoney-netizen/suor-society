import { buildShareCard, shareCardSize } from "@/lib/share-card";

// pt-BR share card. Tagline is its own copy (see src/lib/share-card.tsx)
export const alt = "Suor Society, cultura de treino híbrido pra quem não vive de treinar";
export const size = shareCardSize;
export const contentType = "image/png";

export default function Image() {
  return buildShareCard(
    "Corridas, equipamentos e treino híbrido para quem corre e levanta peso"
  );
}
