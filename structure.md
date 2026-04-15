# Project Structure

> Next.js (App Router) creative portfolio. This file tracks the route → component → interaction map. Update when routes/components/interactions change.

---

## Routes

| Path | File | Description |
| --- | --- | --- |
| `/` | `src/app/page.tsx` | Main landing. Header + `HeroTyping` hero only. Other sections have been removed. |
| `/figma-preview` | `src/app/figma-preview/page.tsx` | Figma reference page. `Header` (CONVERGENCE hero) + `Section002` (pinned horizontal scroll). |
| `/project/[id]` | `src/app/project/[id]/page.tsx` | Project detail page. |
| *(root layout)* | `src/app/layout.tsx` | Wraps all routes with `SmoothScrollProvider` (Lenis global), `CustomCursor`, and Inter font. |

### URL params (on `/`)

- `?iframe=true` — hides Header and hero (for embed use)
- `?full_site=01` — renders `BrillancePreview`
- `?full_site=02` — renders `Work02Preview`

---

## Top-level components (`src/components/`)

| Component | Role |
| --- | --- |
| `HeroTyping.tsx` | Main page hero. Typewriter headline over a canvas particle field that follows the mouse. |
| `Section002.tsx` | **Pinned horizontal scroll section.** See [Section 002 interaction](#section-002-interaction) below. |
| `HeroExpandSection.tsx` | (Currently unused on `/`) Expanding hero scroll section. |
| `AIToolShowcase.tsx` | (Currently unused on `/`) AI tool showcase. |
| `BrillancePreview.tsx` | Full-site preview wrapper for `work_01`. |
| `Work02Preview.tsx` | Full-site preview wrapper for `work_02`. |
| `MockBrowser.tsx` | Browser chrome frame used by preview wrappers. |
| `CustomCursor.tsx` | Custom cursor layer, mounted globally in `layout.tsx`. |
| `SmoothScrollProvider.tsx` | **Global Lenis smooth-scroll init** (lerp 0.08). Mounted in `layout.tsx` so every route gets buttery wheel scroll — required for `Section002`'s spring to feel cursor-attached. |

### Sub-projects (preserved but not directly routed)

- `src/components/work/work_01/` — shadcn-style component library + marketing sections.
- `src/components/work/work_02/` — second sub-project using a similar stack.

Both are consumed via the `BrillancePreview` / `Work02Preview` wrappers and are reachable only through `/?full_site=...`.

---

## Section 002 interaction

**File:** `src/components/Section002.tsx`
**Used on:** `/figma-preview` (below `Header`)
**Figma ref:** `p8Iiu87Gzejo0QripFBTui`, node `8:1583` (Figma had 2 placeholder cards; extended to 5)
**Pattern:** Swipe carousel (no pin-lock, no scroll-jack)

### Behavior

- Section is `100vh` in normal flow — vertical page scroll passes through naturally.
- Active card is centered; previous/next cards peek at reduced opacity/scale/blur.
- Four input methods (all keep the same index state):
  1. **Drag / swipe** — mouse drag or touch swipe on the track (`drag="x"`).
  2. **Arrow buttons** — circular prev/next on left/right edges.
  3. **Dots** — click to jump to any panel.
  4. **Keyboard** — ←/→ advance.
- **Drag commit rule**: `|dx| > 80px` OR `|vx| > 400px/s` → advance. Otherwise spring back.
- **Transition**: spring (`stiffness 160 / damping 26 / mass 0.55`) — smooth, no bounce.

### Tunable constants (top of `Section002.tsx`)

```ts
CARD_WIDTH         = 999   // px, from Figma
CARD_HEIGHT        = 509   // px, from Figma
CARD_GAP           = 48    // px — breathing room (wider than Figma's 8 which was for a continuous track)
CARD_COUNT         = 5     // number of panels
DRAG_THRESHOLD     = 80    // px — distance to commit a swipe
VELOCITY_THRESHOLD = 400   // px/s — flick speed that commits regardless of distance
SPRING = { stiffness: 160, damping: 26, mass: 0.55 }
```

- More panels → bump `CARD_COUNT`.
- More sensitive swipe → lower `DRAG_THRESHOLD`.
- Snappier transition → raise `SPRING.stiffness`, lower `SPRING.mass`.
- Smoother/calmer → raise `SPRING.damping`, lower `stiffness`.

---

## Stack

- **Framework:** Next.js App Router (see `AGENTS.md` — this is a version with breaking changes; consult `node_modules/next/dist/docs/` before writing framework code)
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Smooth scroll:** Lenis (global — initialized in `SmoothScrollProvider` mounted in `layout.tsx`)
- **Design tokens:** see `DESIGN.md`
