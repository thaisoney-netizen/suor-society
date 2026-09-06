import { buildShareCard, shareCardSize } from "@/lib/share-card";

// pt-BR share card — tagline mirrors the pt-BR home hero (dictionaries.ts heroTag)
export const alt = "Suor Society, cultura de treino híbrido pra quem não vive de treinar";
export const size = shareCardSize;
export const contentType = "image/png";

export default function Image() {
  return buildShareCard(
    "Corridas, equipamentos e treino híbrido para quem corre e levanta peso"
  );
}
