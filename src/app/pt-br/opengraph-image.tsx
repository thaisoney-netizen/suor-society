import { buildShareCard, shareCardSize } from "@/lib/share-card";

// pt-BR share card — tagline mirrors the pt-BR home hero (dictionaries.ts heroTag)
export const alt = "Suor Society, cultura de corrida híbrida pra quem trabalha";
export const size = shareCardSize;
export const contentType = "image/png";

export default function Image() {
  return buildShareCard(
    "Corridas, equipamentos e cultura para quem levanta peso e corre."
  );
}
