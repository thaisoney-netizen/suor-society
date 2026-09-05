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
 */
export default function ArticleCover({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: ReactNode;
}) {
  const p = photo(src);
  const portrait = p.height > p.width;

  return (
    <div className="article-cover">
      <figure className={`article-cover-media${portrait ? " is-portrait" : ""}`}>
        <Image {...p} alt={alt} sizes={articleCoverSizes(src)} priority />
        {caption && <figcaption className="article-cover-caption">{caption}</figcaption>}
      </figure>
    </div>
  );
}
