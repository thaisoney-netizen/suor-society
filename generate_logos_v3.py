#!/usr/bin/env python3
"""Suor Society — Logo Set V3 (updated color hierarchy)"""

import os, math
from PIL import Image, ImageDraw, ImageFont

NEWBIZ = "/Users/thaisoney/Desktop/COWORKER/New BIZ"
FONTS  = "/Users/thaisoney/Desktop/COWORKER/.skill-archive/logo-creator/2026-05-04-suor-society/fonts"

# ── Brand palette V3 ──────────────────────────────────────────────────
WHITE     = (255, 255, 255)
ASPHALT   = (20,  20,  20)   # #141414 — primary type & ink
SLATE     = (45,  51,  64)   # #2D3340 — dark bands & contrast
BONE      = (236, 228, 212)  # #ECE4D4 — warm card surface (sparingly)
SUNRISE   = (224, 134, 85)   # #E08655 — accent only
HIGHLIGHT = (235, 195, 74)   # #EBC34A — accent only
RUST      = (193, 68,  41)   # #C14429 — accent only

BEBAS  = os.path.join(FONTS, "BebasNeue.ttf")
BARLOW = os.path.join(FONTS, "BarlowCondensed-SemiBold.ttf")

# ── Text helpers ──────────────────────────────────────────────────────
def spaced_w(text, font, sp):
    w = 0
    for i, ch in enumerate(text):
        bb = font.getbbox(ch)
        w += bb[2] - bb[0] + (sp if i < len(text) - 1 else 0)
    return w

def draw_text(draw, text, cx, cy, font, fill, sp):
    w = spaced_w(text, font, sp)
    asc, _ = font.getmetrics()
    x = cx - w // 2
    y = cy - asc // 2
    for i, ch in enumerate(text):
        draw.text((x, y), ch, font=font, fill=fill, anchor="lt")
        bb = font.getbbox(ch)
        x += (bb[2] - bb[0]) + (sp if i < len(text) - 1 else 0)

def draw_text_left(draw, text, x_start, cy, font, fill, sp):
    asc, _ = font.getmetrics()
    y = cy - asc // 2
    x = x_start
    for i, ch in enumerate(text):
        draw.text((x, y), ch, font=font, fill=fill, anchor="lt")
        bb = font.getbbox(ch)
        x += (bb[2] - bb[0]) + (sp if i < len(text) - 1 else 0)

def save(img, name):
    p = os.path.join(NEWBIZ, name)
    img.save(p, "PNG")
    print(f"  ✓ {name}")

# ── Drop geometry (600×600 base) ──────────────────────────────────────
SZ    = 600
CX    = 300
SCALE = 5.8
CCY   = int((66 - 50.5) * SCALE + SZ / 2)
R     = int(27 * SCALE)
TIPY  = int((8  - 50.5) * SCALE + SZ / 2)

def draw_drop(draw, fill, pad=0):
    rr = R - pad
    cy = CCY + pad // 2
    rx = CX + rr; lx = CX - rr; ty = TIPY + pad
    draw.chord([rx - 2*rr, cy - rr, rx, cy + rr], start=0, end=180, fill=fill)
    draw.polygon([(CX, ty), (rx, cy), (lx, cy)], fill=fill)

# ─────────────────────────────────────────────────────────────────────
print("── Icons ──")

# Classic drop — Asphalt on White (light/primary version)
img = Image.new("RGB", (SZ, SZ), WHITE); d = ImageDraw.Draw(img)
draw_drop(d, ASPHALT)
save(img, "icon-1-classic-drop.png")

# Classic drop — Bone on Asphalt (dark/inverted version)
img = Image.new("RGB", (SZ, SZ), ASPHALT); d = ImageDraw.Draw(img)
draw_drop(d, BONE)
save(img, "icon-1-classic-drop-inverted.png")

# Classic drop — Sunrise on Asphalt (accent variant)
img = Image.new("RGB", (SZ, SZ), ASPHALT); d = ImageDraw.Draw(img)
draw_drop(d, SUNRISE)
save(img, "icon-1-classic-drop-sunrise.png")

# Classic drop — Asphalt on Bone (warm card surface variant)
img = Image.new("RGB", (SZ, SZ), BONE); d = ImageDraw.Draw(img)
draw_drop(d, ASPHALT)
save(img, "icon-1-classic-drop-bone.png")

# Classic drop — Bone on Slate (dark band variant)
img = Image.new("RGB", (SZ, SZ), SLATE); d = ImageDraw.Draw(img)
draw_drop(d, BONE)
save(img, "icon-1-classic-drop-slate.png")

# ─────────────────────────────────────────────────────────────────────
print("\n── Wordmarks ──")

W, H = 1200, 600

f_big = ImageFont.truetype(BEBAS, 340)
f_sm  = ImageFont.truetype(BEBAS, 270)
f_soc = ImageFont.truetype(BARLOW, 52)
asc_sm,  _ = f_sm.getmetrics()
asc_soc, _ = f_soc.getmetrics()
GAP = 26
block_h = asc_sm + GAP + asc_soc

# SUOR — Asphalt on White (primary)
img = Image.new("RGB", (W, H), WHITE); d = ImageDraw.Draw(img)
draw_text(d, "SUOR", W // 2, H // 2, f_big, ASPHALT, sp=22)
save(img, "wm-suor.png")

# SUOR — Bone on Asphalt (inverted)
img = Image.new("RGB", (W, H), ASPHALT); d = ImageDraw.Draw(img)
draw_text(d, "SUOR", W // 2, H // 2, f_big, BONE, sp=22)
save(img, "wm-suor-inverted.png")

# SUOR SOCIETY — Asphalt on White (primary)
img = Image.new("RGB", (W, H), WHITE); d = ImageDraw.Draw(img)
top_y = (H - block_h) // 2
draw_text(d, "SUOR",    W//2, top_y + asc_sm//2,              f_sm,  ASPHALT, sp=18)
draw_text(d, "SOCIETY", W//2, top_y + asc_sm + GAP + asc_soc//2, f_soc, ASPHALT, sp=46)
save(img, "wm-suor-society.png")

# SUOR SOCIETY — Bone + Sunrise on Asphalt (inverted with accent)
img = Image.new("RGB", (W, H), ASPHALT); d = ImageDraw.Draw(img)
draw_text(d, "SUOR",    W//2, top_y + asc_sm//2,              f_sm,  BONE,    sp=18)
draw_text(d, "SOCIETY", W//2, top_y + asc_sm + GAP + asc_soc//2, f_soc, SUNRISE, sp=46)
save(img, "wm-suor-society-inverted.png")

# SUOR SOCIETY — Bone on Slate (dark band variant)
img = Image.new("RGB", (W, H), SLATE); d = ImageDraw.Draw(img)
draw_text(d, "SUOR",    W//2, top_y + asc_sm//2,              f_sm,  BONE, sp=18)
draw_text(d, "SOCIETY", W//2, top_y + asc_sm + GAP + asc_soc//2, f_soc, BONE, sp=46)
save(img, "wm-suor-society-slate.png")

# ─────────────────────────────────────────────────────────────────────
print("\n── Lockups (drop + wordmark) ──")

LW, LH   = 1440, 560
ICON_SIZE = 360
ICON_CX   = 240
ICON_CY   = LH // 2
TEXT_X    = 420
DIV_X     = 388

def make_canvas(bg):
    img = Image.new("RGB", (LW, LH), bg)
    d   = ImageDraw.Draw(img)
    div_col = (200, 200, 200) if bg == WHITE else (50, 50, 50)
    d.rectangle([DIV_X, LH//2 - 120, DIV_X+1, LH//2 + 120], fill=div_col)
    return img, d

def drop_geometry_scaled(cx, cy, size):
    s    = size / 600
    r    = int(157 * s)
    ccy  = int(cy + (390 - 303) * s)
    tipy = int(cy - (303 - 60) * s)
    return r, ccy, tipy, cx + r, cx - r

def draw_drop_lockup(draw, cx, cy, size, fill):
    r, ccy, tipy, rx, lx = drop_geometry_scaled(cx, cy, size)
    draw.chord([rx - 2*r, ccy - r, rx, ccy + r], start=0, end=180, fill=fill)
    draw.polygon([(cx, tipy), (rx, ccy), (lx, ccy)], fill=fill)

f_lk_lg = ImageFont.truetype(BEBAS, 280)
f_lk_sm = ImageFont.truetype(BEBAS, 220)
asc_lg,  _ = f_lk_lg.getmetrics()
asc_lksm,_ = f_lk_sm.getmetrics()
GAP2 = 22
lk_block = asc_lksm + GAP2 + asc_soc
lk_top_y = LH//2 - lk_block//2

# Lockup — White background, Asphalt drop + text (primary)
img, d = make_canvas(WHITE)
draw_drop_lockup(d, ICON_CX, ICON_CY, ICON_SIZE, ASPHALT)
draw_text_left(d, "SUOR",    TEXT_X, lk_top_y + asc_lksm//2,               f_lk_sm, ASPHALT, sp=14)
draw_text_left(d, "SOCIETY", TEXT_X, lk_top_y + asc_lksm + GAP2 + asc_soc//2, f_soc,   ASPHALT, sp=44)
save(img, "lockup-light.png")

# Lockup — Asphalt background, Bone drop + text, Sunrise SOCIETY accent (inverted)
img, d = make_canvas(ASPHALT)
draw_drop_lockup(d, ICON_CX, ICON_CY, ICON_SIZE, BONE)
draw_text_left(d, "SUOR",    TEXT_X, lk_top_y + asc_lksm//2,               f_lk_sm, BONE,    sp=14)
draw_text_left(d, "SOCIETY", TEXT_X, lk_top_y + asc_lksm + GAP2 + asc_soc//2, f_soc,   SUNRISE, sp=44)
save(img, "lockup-dark.png")

# Lockup — Slate background, Bone drop + text
img, d = make_canvas(SLATE)
draw_drop_lockup(d, ICON_CX, ICON_CY, ICON_SIZE, BONE)
draw_text_left(d, "SUOR",    TEXT_X, lk_top_y + asc_lksm//2,               f_lk_sm, BONE, sp=14)
draw_text_left(d, "SOCIETY", TEXT_X, lk_top_y + asc_lksm + GAP2 + asc_soc//2, f_soc,   BONE, sp=44)
save(img, "lockup-slate.png")

# Lockup — Sunrise accent drop on Asphalt
img, d = make_canvas(ASPHALT)
draw_drop_lockup(d, ICON_CX, ICON_CY, ICON_SIZE, SUNRISE)
draw_text_left(d, "SUOR",    TEXT_X, lk_top_y + asc_lksm//2,               f_lk_sm, BONE,    sp=14)
draw_text_left(d, "SOCIETY", TEXT_X, lk_top_y + asc_lksm + GAP2 + asc_soc//2, f_soc,   SUNRISE, sp=44)
save(img, "lockup-sunrise-accent.png")

print("\nAll V3 logos saved to New BIZ folder.")
