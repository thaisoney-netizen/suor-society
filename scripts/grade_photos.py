#!/usr/bin/env python3
"""Suor Society editorial color grade for real photos.

Local, reliable tone treatment (no AI restyle): orientation corrected, then a
filmic grade toward the brand palette — asphalt shadows (#1C1C1C), warm bone
highlights (#EDE8DC), a sunrise-orange (#E8750A) split-tone, gentle desat,
fine grain, subtle vignette. Keeps the subject/crop exactly as shot.
Output -> public/.
"""
import os, sys
import numpy as np
from PIL import Image, ImageOps, ImageFilter

ROOT = "/Users/thaisoney/Desktop/COWORKER/SUOR SOCIETY "
IMG = os.path.join(ROOT, "Images")
OUT = os.path.join(ROOT, "public")

# (source, output, max_long_side)
JOBS = [
    ("IMG_2486.jpg",             "founder-pull.jpg", 1600),
    ("IMG_2487.jpg",             "founder-press.jpg", 1800),
    ("IMG_1866.JPG",             "crew-run.jpg",     1800),
    ("View recent photos.png",   "road-run.jpg",     1800),
    ("View recent photos 2.png", "trail-run.jpg",    1800),
]

# Brand anchors (linear-ish sRGB 0..1)
ASPHALT = np.array([0x1C, 0x1C, 0x1C]) / 255.0
BONE    = np.array([0xED, 0xE8, 0xDC]) / 255.0
SUNRISE = np.array([0xE8, 0x75, 0x0A]) / 255.0


def srgb_to_lin(x):
    return np.where(x <= 0.04045, x / 12.92, ((x + 0.055) / 1.055) ** 2.4)


def lin_to_srgb(x):
    x = np.clip(x, 0, 1)
    return np.where(x <= 0.0031308, x * 12.92, 1.055 * x ** (1 / 2.4) - 0.055)


def grade(im: Image.Image) -> Image.Image:
    a = np.asarray(im).astype(np.float32) / 255.0  # HxWx3 sRGB

    lum = a @ np.array([0.2126, 0.7152, 0.0722])  # perceptual luma
    lum3 = lum[..., None]

    # 1) Desaturate ~22% toward luma (muted editorial)
    a = lum3 + (a - lum3) * 0.78

    # 2) Gentle filmic S-curve in linear light for rich contrast w/o crushing
    lin = srgb_to_lin(a)
    lin = lin / (lin + 0.16) * (1.0 + 0.16)          # soft tone compression
    lin = lin ** 0.94                                  # lift mids slightly
    a = lin_to_srgb(lin)

    # 3) Split-tone: shadows -> asphalt, highlights -> bone, with a sunrise warm
    #    cast strongest in the upper-mids/highlights.
    sh = np.clip(1.0 - lum * 1.7, 0, 1)[..., None]     # shadow mask
    hi = np.clip((lum - 0.45) * 1.9, 0, 1)[..., None]  # highlight mask
    warm = np.clip((lum - 0.30) * 1.5, 0, 1)[..., None]  # warm-cast mask

    a = a + (ASPHALT - 0.0) * sh * 0.10                # nudge shadows warm-neutral dark
    a = a + (BONE - 1.0) * hi * 0.14                   # creamy bone highlights
    a = a + (SUNRISE - 0.5) * warm * 0.055             # sunrise warmth in light

    # 4) Global warm white balance + a touch more contrast
    a = a * np.array([1.045, 1.005, 0.945])            # warm WB
    a = (a - 0.5) * 1.05 + 0.5                          # micro-contrast

    a = np.clip(a, 0, 1)

    # 5) Subtle vignette
    h, w = lum.shape
    yy, xx = np.mgrid[0:h, 0:w]
    cy, cx = h / 2, w / 2
    r = np.sqrt(((xx - cx) / (w / 2)) ** 2 + ((yy - cy) / (h / 2)) ** 2)
    vig = 1.0 - np.clip((r - 0.65) / 0.9, 0, 1) * 0.22
    a = a * vig[..., None]

    # 6) Fine film grain (luminance-coupled, stronger in shadows)
    rng = np.random.default_rng(7)
    grain = rng.normal(0, 1, size=lum.shape).astype(np.float32)
    grain = np.asarray(Image.fromarray(((grain * 0.5 + 0.5) * 255).astype(np.uint8))
                       .filter(ImageFilter.GaussianBlur(0.5))).astype(np.float32) / 255.0
    grain = (grain - 0.5)
    strength = 0.022 * (1.0 + (1.0 - lum) * 0.8)
    a = a + grain[..., None] * strength[..., None]

    a = np.clip(a, 0, 1)
    out = Image.fromarray((a * 255 + 0.5).astype(np.uint8), "RGB")
    return out


def load(path, max_side):
    im = ImageOps.exif_transpose(Image.open(path)).convert("RGB")
    if max(im.size) > max_side:
        s = max_side / max(im.size)
        im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    return im


def main():
    only = set(sys.argv[1:])
    for src, dst, mx in JOBS:
        if only and dst not in only and src not in only:
            continue
        im = load(os.path.join(IMG, src), mx)
        out = grade(im)
        op = os.path.join(OUT, dst)
        out.save(op, "JPEG", quality=86, optimize=True, progressive=True)
        print(f"{src:28} -> {dst:18} {out.size}  {os.path.getsize(op)//1024}KB")


if __name__ == "__main__":
    main()
