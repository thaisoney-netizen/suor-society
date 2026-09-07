import type { ReactNode } from "react";
import Image from "next/image";
import { photo, articleCoverSizes } from "@/lib/photos";

/**
 * The cover photo at the top of a post, drawn at the same width as the copy
 * below it. Headline, picture and body then share one column and one left
 * edge, which is how a page reads as a piece of writing with a photo rather
 * than a banner with text under it.
 *
 * The photo is never cropped and never stretched. A landscape fills the
 * measure at its own ratio; a portrait is capped by height instead of width,
 * so a tall frame can't swallow the screen before a word is read. Nothing
 * here keys off the file's pixel count any more: the slot is narrower than
 * every photo in the library, so none of them can be drawn past their own
 * resolution.
 *
 * Captions belong to the figure, so pass one rather than adding a paragraph
 * after this component: only then does it line up with the photo it explains.
 *
 * Pass `inline` to use the same treatment for a photo further down the page,
 * between two body sections, which is how a long read gets a second picture
 * without inventing a second set of rules for it.
 */
export default function ArticleCover({
  src,
  alt,
  caption,
  priority = true,
  inline = false,
}: {
  src: string;
  alt: string;
  caption?: ReactNode;
  /** Off for a photo below the fold: only the cover is worth preloading. */
  priority?: boolean;
  /**
   * For a photo placed inside `.post-main` rather than above it. The post
   * shell already carries the width and the gutter there, so repeating them
   * would inset the picture past the left edge of the copy around it.
   */
  inline?: boolean;
}) {
  const p = photo(src);
  const portrait = p.height > p.width;

  return (
    <div className={`article-cover${inline ? " article-cover--inline" : ""}`}>
      {/* A lazy portrait needs a definite box before its bytes arrive, or
          `width: auto` on the unloaded image measures 0, the figure never
          crosses the viewport, lazy loading never fires, and the picture stays
          blank forever. That box is reserved in CSS, by the min-height on
          `.article-cover-media.is-portrait`, so nothing is needed here. */}
      <figure className={`article-cover-media${portrait ? " is-portrait" : ""}`}>
        <Image {...p} alt={alt} sizes={articleCoverSizes(src)} priority={priority} />
        {caption && <figcaption className="article-cover-caption">{caption}</figcaption>}
      </figure>
    </div>
  );
}
