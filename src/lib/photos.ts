import { PHOTO_SIZES, type PhotoSize } from "@/lib/photo-sizes";

/**
 * Intrinsic size for a photo, spread straight into <Image>. Next needs the
 * real dimensions to build a srcset and to reserve the box before the file
 * lands, which is what stops the page jumping as photos arrive.
 *
 *   <Image {...photo(post.img)} alt={post.title} sizes={CARD_SIZES} />
 */
export function photo(src: string): { src: string } & PhotoSize {
  const size = PHOTO_SIZES[src];
  if (!size) {
    throw new Error(
      `No size on record for ${src}. Put the file in public/ and re-run ` +
        `scripts/generate-photo-manifest.mjs.`,
    );
  }
  return { src, ...size };
}

/** Widest a photo can be drawn before the browser starts inventing pixels. */
export function nativeWidth(src: string): number {
  return PHOTO_SIZES[src]?.width ?? 0;
}

/**
 * A full-bleed cover spans the whole viewport, so on a 1440px retina screen it
 * wants ~2880px of photo. Nothing in the library is that big, and a few shots
 * are under 1440px, which means the browser stretches them and the softness is
 * visible even before you zoom. Anything below this bar gets the contained
 * plate instead of the full-bleed window — change the slot, not the photo.
 */
export const FULL_BLEED_MIN_WIDTH = 1600;

/** True when a photo has the pixels to survive a full-bleed cover. */
export function fitsFullBleed(src: string): boolean {
  return nativeWidth(src) >= FULL_BLEED_MIN_WIDTH;
}

/* ── Slot widths ──────────────────────────────────────────────────────────
   What each slot actually measures on screen, so Next hands the browser the
   smallest file that still covers it. Measured, not guessed: a phone was
   downloading the same 1600px file a desktop got.                          */

/** Board and archive cards: 1-up on phones, 2-up mid, ~480px in the 3-up grid. */
export const CARD_SIZES = "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 480px";

/** Full-bleed covers and the race-picks feature: edge to edge, always. */
export const COVER_SIZES = "100vw";

/** Contained cover plate: full width on phones, capped by the plate on desktop. */
export const PLATE_SIZES = "(max-width: 860px) 100vw, 760px";

/** Crew split panel and the about page shot: half the page on desktop. */
export const HALF_SIZES = "(max-width: 860px) 100vw, 50vw";

/** Crew scenes: a 3-up strip that stacks to 2-up then 1-up. */
export const SCENE_SIZES = "(max-width: 700px) 100vw, 33vw";

/** Author bio portrait, capped by its column. */
export const PORTRAIT_SIZES = "(max-width: 860px) 100vw, 420px";

/** The small round author photo at the end of every post. */
export const AVATAR_SIZES = "96px";
