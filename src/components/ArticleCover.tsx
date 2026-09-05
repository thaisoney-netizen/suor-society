import Image from "next/image";
import { photo, fitsFullBleed, COVER_SIZES, PLATE_SIZES } from "@/lib/photos";

/** Widest the plate media column gets: the page less its padding, and less
 *  the block column when there is one. Used to size the srcset honestly. */
const PLATE_MAX = 1520;
const PLATE_MAX_WITH_BLOCK = 880;

type TocItem = { id: string; label: string };

/**
 * The cover photo at the top of a post, in whichever treatment the photo can
 * actually carry. The page does not choose — the file's own pixel count does:
 *
 *   landscape, big enough  → full-bleed band, the house look
 *   portrait               → contained plate at its own ratio (never cropped
 *                            into a letterbox)
 *   landscape, too small   → contained plate beside a block of section links,
 *                            so the shot is never drawn wider than it exists
 *
 * That last case is the one worth explaining. A full-bleed cover is as wide as
 * the window, so a 954px photo on a 1440px screen gets stretched half again
 * past its own resolution and reads as soft. Rather than sharpen the photo
 * (which we don't do to Thais's shots) or swap it out, the slot shrinks to fit
 * the photo and the freed space carries the section links.
 *
 * Replace a small photo with a bigger export later and the page upgrades
 * itself on the next build. Nothing here needs revisiting.
 */
export default function ArticleCover({
  src,
  alt,
  objectPosition,
  toc,
  tocTitle = "In this piece",
}: {
  src: string;
  alt: string;
  objectPosition?: string;
  toc?: TocItem[];
  tocTitle?: string;
}) {
  const p = photo(src);
  const portrait = p.height > p.width;
  const style = objectPosition ? { objectPosition } : undefined;

  if (!portrait && fitsFullBleed(src)) {
    return (
      <div className="article-cover">
        <Image {...p} alt={alt} sizes={COVER_SIZES} style={style} priority />
      </div>
    );
  }

  if (portrait) {
    return (
      <div className="article-cover article-cover--portrait">
        <Image {...p} alt={alt} sizes={PLATE_SIZES} priority />
      </div>
    );
  }

  const hasBlock = Boolean(toc?.length);
  // Cap the srcset hint at whichever runs out first, the column or the photo,
  // so the browser is never told to fetch more pixels than either can use.
  const plateCap = Math.min(p.width, hasBlock ? PLATE_MAX_WITH_BLOCK : PLATE_MAX);
  const plateSizes = `(max-width: 860px) 100vw, ${plateCap}px`;

  return (
    <div className="article-plate">
      <div className="page">
        <div className={`article-plate-grid${hasBlock ? "" : " is-solo"}`}>
          {/* max-width is the photo's own width: the hard stop that keeps the
              browser from ever drawing it bigger than it was shot */}
          <figure className="article-plate-media" style={{ maxWidth: p.width }}>
            <Image {...p} alt={alt} sizes={plateSizes} style={style} priority />
          </figure>

          {hasBlock && (
            <aside className="article-plate-block" aria-label={tocTitle}>
              <div className="plate-block-label">{tocTitle}</div>
              <ol className="plate-block-list">
                {toc!.map((item, i) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`}>
                      <span className="plate-block-num">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="plate-block-text">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
