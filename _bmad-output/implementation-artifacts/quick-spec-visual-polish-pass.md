# Quick Spec: Visual polish pass (cards, rhythm, light/dark)

Status: ready-for-dev
Authored: 2026-07-12
Owner: N
Repo: `/Users/beforeoafterm/Developer/beforeoafterm/beforeoafterm.io` (branch `main`)
Scope: polish only; no copy changes, no new features, no new dependencies, no blog/db/unrelated routes.

## Baseline warning (read first)

`main` is dirty with the in-flight job-search content refresh: modified `app/page.tsx`, `app/projects/page.tsx`, `components/layout-header.tsx`, plus 5 untracked cover images (`once-upon-a-desk.jpg`, `broker-copilot.svg`, `tioi.network.jpg`, `w3.io.jpg`, `dealsync.creatorland.com.jpg`). Commit that baseline BEFORE starting this spec so the visual diff stays surgical and reviewable. Suggested: `git add -A && git commit -m "content: job-search refresh (hero, header, flagship projects)"`. Per the user's global CLAUDE.md: no `Co-Authored-By` trailer.

## Context

Portfolio site refreshed for a job search: Next.js 14 App Router, Tailwind v3.4 (dark mode via `prefers-color-scheme` media query, NOT class), TypeScript, Vercel. Fonts: Aleo (`font-slabSerif`, body) and Quicksand (`font-serif`, headings/buttons/pills). Palette (all AA-verified, see Appendix A): light bg `#f1e4e9` / fg `#5e3144`, dark bg `#5e3144` / fg `#f1e4e9`, muted `#e5cdd6`/`#235d5a` flipped per scheme.

`/projects` renders 13 cards through one component, [components/project-card.tsx](../../components/project-card.tsx). The five flagship covers lead; four JPGs are exactly 1280x800 (16:10) and `broker-copilot.svg` is 1000x472 (2.12:1) with its own paper background `#f2eae3`. The nine legacy covers range 1.75 to 1.96.

## Problem

1. **Legibility.** The card paints the cover as a CSS `background-image` blended into `bg-muted` via `bg-blend-soft-light`, then sets the title in `foreground` and the description in `text-muted-foreground` directly on top ([project-card.tsx:14-25](../../components/project-card.tsx)). Contrast depends entirely on cover brightness: fails on light covers (W3.io, Dealsync, Once Upon a Desk) and the blend washes out every cover so none read as real screenshots.
2. **Inconsistent card system.** `bg-cover` on a content-sized box means the visible crop is whatever the text height dictates; aspect and crop differ card to card. Hover is an odd inner glow (`hover:shadow-inner hover:shadow-muted-foreground`). Two dead blur effects (`backdrop-blur-sm` on an opaque card, plus a `-z-10` child with `backdrop-blur-[1px]`) cost GPU and do nothing visible.
3. **Rhythm.** `.ProjectsPage` sets `lg:text-2xl` which cascades 24px body type INTO the cards; the card title uses a magic `mb-12`; hero body runs at `lg:text-2xl` with no measure constraint; `_label` pills use a skeuomorphic teal inner shadow.
4. **Dark mode.** Hardcoded `text-[#368F8B]` on header social icons and nav links measures 2.73:1 on the dark background: a real AA failure (needs 3:1 for UI glyphs; 6.11:1 light / 7.02:1 dark if tokenized to `muted-foreground`). Card `dark:shadow-muted-foreground` renders as a pale glow.

## Design decision: hybrid card, and why (the scrim math)

The request was "scrim so title + description are always AA". Worst case for white text over a scrimmed light cover (pure-white pixel region) is `contrast = 1.05 / (1 - alpha + 0.05)`:

| black scrim alpha | worst-case contrast | large-text AA 3:1 | body AA 4.5:1 |
| --- | --- | --- | --- |
| 0.60 | 2.33:1 | fail | fail |
| 0.70 | 3.00:1 | pass (exact) | fail |
| **0.75** | **3.50:1** | **pass** | fail |
| 0.82+ | 4.5:1+ | pass | pass, but the cover is gone |

Guaranteeing 4.5:1 for body copy over an arbitrary screenshot requires >=82% black, which defeats "cover still reads as a recognizable image". So the spec mandates a hybrid, which is also the dominant Awwwards portfolio pattern:

- **Media zone** (top): fixed 16:10 cover, unblended, with a bottom gradient scrim and ONLY the title overlaid. Title is WCAG "large text" (bold >= 18.66px) at every breakpoint, so the 0.75 scrim floor gives >= 3.5:1 even on a pure-white cover.
- **Content zone** (bottom): solid `bg-muted` surface carrying description, tech-stack toggle, and pills. Body contrast is 5.04:1 by construction in both schemes, independent of the cover.

Title stays `text-white` in both schemes (scrim is always dark; this is the standard theme-invariant treatment). Everything else uses tokens.

## Tasks

### T0. Commit baseline

Commit the dirty working tree as described in "Baseline warning". No code changes.

### T1. Rebuild `ProjectCard` as media + content zones

Files: [components/project-card.tsx](../../components/project-card.tsx), [types/Project.types.ts](../../types/Project.types.ts), [app/projects/page.tsx](../../app/projects/page.tsx)

1. Add to `Project` interface: `coverFit?: 'cover' | 'contain'` (presentation metadata, not copy). In the projects array, set `coverFit: 'contain'` on the Broker Copilot entry ONLY. Add optional `priority?: boolean` prop to `ProjectCard`; pass `priority={index < 2}` from the page map (LCP).
2. New card structure (keep `'use client'`, keep the tech-stack toggle exactly as-is behaviorally):

```tsx
<article className="group flex w-full flex-col overflow-hidden rounded-3xl border border-foreground/10 bg-muted transition-all duration-300 motion-safe:hover:-translate-y-1 hover:border-foreground/30 hover:shadow-xl hover:shadow-primary/10">
  {/* media zone */}
  <a href={project.url} target="_blank" rel="noreferrer"
     className="relative block aspect-[16/10] overflow-hidden no-underline"
     style={project.coverFit === 'contain' ? { backgroundColor: '#f2eae3' } : undefined}>
    <Image
      src={project.coverImageSrc}
      alt={`${project.name} cover`}
      fill
      priority={priority}
      unoptimized={project.coverImageSrc.endsWith('.svg')}
      sizes="(min-width: 1024px) 28vw, (min-width: 768px) 45vw, 92vw"
      className={cx(
        'motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-[1.03]',
        project.coverFit === 'contain' ? 'object-contain' : 'object-cover'
      )}
    />
    <div aria-hidden className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
    <h2 className="absolute inset-x-0 bottom-0 mb-0 p-5 font-serif text-xl font-bold text-white lg:p-6 lg:text-2xl">
      {project.name}
      <ArrowTopRightIcon className="ml-2 inline h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </h2>
  </a>
  {/* content zone */}
  <div className="flex flex-1 flex-col p-5 lg:p-6">
    <p className="text-sm font-normal leading-relaxed text-muted-foreground lg:text-base">
      {project.description}
    </p>
    {/* existing toggle Button, then the pills div with mt-auto pt-4 instead of my-4 */}
  </div>
</article>
```

Implementation notes, all load-bearing:

- Use `next/image` (`import Image from 'next/image'`); built-in, no new dependency. The `unoptimized` flag on the SVG avoids the optimizer's `dangerouslyAllowSVG` requirement. CSP already allows `img-src *`.
- The SVG gets `object-contain` letterboxed inside 16:10; the inline `#f2eae3` backdrop matches the SVG's own paper fill so the bars read as intentional canvas.
- DELETE: `bg-blend-soft-light`, `backdrop-blur-sm`, the `-z-10 backdrop-blur-[1px]` child div, `shadow-md shadow-ring`, `dark:shadow-muted-foreground`, `hover:shadow-inner hover:shadow-muted-foreground`, the `style={{ backgroundImage }}`, and the title's `mb-12 text-[1.75rem] tracking-wide`.
- Explicit sizes on card text are REQUIRED because `.ProjectsPage` cascades `lg:text-2xl` into the grid (see T3; T3 also reduces that, but the card must not depend on ambient size).
- The global `h2` rule applies `mb-4 font-serif text-2xl lg:text-4xl`; the overlay h2 classes above intentionally override every one of those. The global `a` rule applies `underline` and `hover:text-muted-foreground`; the media `<a>` carries `no-underline` and the white title must NOT change color on hover (the arrow nudge plus image zoom is the hover signal). Add `hover:text-white` on the h2 if the global rule wins in testing.
- `motion-safe:` prefixes are mandatory on translate/scale so `prefers-reduced-motion` users get a static card.
- Toggle `Button` and pills keep their exact JSX and state; only the pills wrapper class changes from `my-4` to `mt-auto pt-4` (with `flex flex-wrap gap-2` retained) so short cards keep pills bottom-aligned.
- Card key stays `project.url`; `article` no longer needs its own `key` prop internally (the map key in page.tsx already covers it), but leaving it is harmless.

### T2. Restyle `_label` pills

File: [app/global.css](../../app/global.css) (lines 176-201)

Replace the `._label` body with a quiet, token-true pill; keep the class name and `select-none`:

```css
._label {
  @apply inline-block
    select-none
    rounded-full
    border
    border-foreground/25
    bg-background/40
    px-3
    py-1
    align-middle
    font-serif
    text-xs
    tracking-widest
    text-foreground;
}
```

Drops: `border-primary`, `bg-primary-foreground`, `text-primary`, `shadow-inner shadow-muted-foreground`, `transition-all duration-300`, `rounded-lg`, `p-1`. The `a._label` rule (lines 196-201) has zero usages outside `global.css` (verified by grep across `app`, `components`, `content`); delete it. Contrast on the card's `bg-muted` surface: foreground on muted is 7.02:1 light / 6.11:1 dark (Appendix A), both AA for the 12px pill text.

### T3. Projects page rhythm

Files: [app/projects/page.css](../../app/projects/page.css), [app/projects/page.tsx](../../app/projects/page.tsx)

1. `page.css`:
   - `.ProjectsPage`: `lg:text-2xl` becomes `lg:text-xl` (stops shouting; cards no longer inherit 24px anyway per T1).
   - `.ProjectsPage_subheadingText`: add `max-w-[60ch] text-muted-foreground`; `mb-8` becomes `mb-6`.
   - `.ProjectsPage_headingText`: `mb-8` becomes `mb-6`.
   - `.ProjectsPage_grid`: `my-8 ... gap-8` becomes `mt-10 grid w-full grid-cols-1 gap-6 md:grid-cols-2 md:gap-8`.
2. `page.tsx`: delete the two dead imports, `import { url } from 'inspector'` (line 5) and `import events from 'events'` (line 8). Node builtins in an App Router page are bundler noise. Pass `priority={index < 2}` in the map (T1). NO other changes in this file besides the Broker Copilot `coverFit` field; every `name`, `description`, `url`, `techStack` string stays byte-identical.

### T4. Hero rhythm

Files: [app/page.module.css](../../app/page.module.css), [app/page.tsx](../../app/page.tsx)

1. `page.module.css`:
   - `.Home`: `lg:text-2xl` becomes `lg:text-xl`.
   - `.Home_content`: `gap-8` becomes `gap-6`; add `max-w-[62ch]`.
   - `.Home_cta`: `mt-8` becomes `mt-4`.
2. `page.tsx`: add `leading-relaxed text-pretty` to the two `Home_subheadingText` paragraphs via className (or fold into the module class; implementer's choice, one place only). No copy changes.

### T5. Header and nav: tokenize teal, fix tagline scale

Files: [components/layout-header.tsx](../../components/layout-header.tsx), [components/nav.tsx](../../components/nav.tsx)

1. `layout-header.tsx`: replace all three `text-[#368F8B]` with `text-muted-foreground`, and `hover:text-primary` on those icon links with `hover:text-foreground`. This is the dark-mode AA fix (2.73:1 to 7.02:1).
2. `layout-header.tsx` tagline h2 (line 15): current `lg:text-xl` INVERTS the scale (24px mobile from the global h2 rule, 20px desktop). Set explicit `text-lg lg:text-xl` so mobile is 18px and desktop 20px.
3. `nav.tsx`: replace `text-[#368F8B]` with `text-muted-foreground` in the inactive-link branch; keep `hover:text-foreground`.

### T6. Verify (blocking; do not finish without this)

1. **Build green**: `yarn build` completes with no type errors and no new warnings attributable to this change. `yarn.lock` untouched (no new deps).
2. **Copy audit**: `git diff` on `app/projects/page.tsx` shows only the removed dead imports, the `coverFit` field, and the `priority` prop; description/name/url/techStack strings unchanged. No diffs under `app/blog`, `app/og`, `app/work`, `app/uses`, `content/`.
3. **Preview** (create `.claude/launch.json` with `{"name": "beforeoafterm-io", "runtimeExecutable": "yarn", "runtimeArgs": ["dev"], "port": 3000}` if missing; the dev script is `next dev --turbo`):
   - `/projects` light AND dark (`resize_window` with `colorScheme`), desktop 1280 and mobile 375. Screenshot each.
   - All 13 cards show a 16:10 media zone; the four flagship JPGs render uncropped; Broker Copilot letterboxes on paper `#f2eae3` with no visible seam; legacy covers center-crop without distortion.
   - Title is white-on-scrim on every card in both schemes; description and pills sit on the solid muted surface, never on the image.
   - Hover a card: image zooms, card lifts, border strengthens, arrow nudges. Emulate `prefers-reduced-motion: reduce` and confirm no zoom/lift.
   - Tech Stack toggle still shows/hides pills. Note: if React click events do not register in the embedded preview pane, fall back to `javascript_tool` DOM inspection or a manual browser check; do not skip the check.
   - `read_console_messages` clean on `/`, `/projects` (no hydration or image warnings).
   - Home and header: tightened spacing renders in both schemes; social icons are muted-foreground teal/pink per scheme.
4. **Contrast**: re-run Appendix A script; every row must PASS. Spot-check one light cover (w3.io) with devtools eyedropper or `getComputedStyle`: title zone scrim floor is `from-black/75` and title computed color is `rgb(255 255 255)`.

## Acceptance criteria

- AC1: Title on every card meets >= 3:1 against the scrimmed cover in the worst case (guaranteed by `from-black/75` floor plus bold >= 20px title; math in "Design decision"). Description and pill text meet >= 4.5:1 (guaranteed by solid `bg-muted` surface; 5.04:1 and 5.62:1/5.87:1 per Appendix A).
- AC2: All 13 cards share one media geometry (`aspect-[16/10]`), one hover system, one pill style; flagship four render their covers 1:1 with no crop.
- AC3: Cover images are visibly unblended (no soft-light wash); each flagship cover is recognizable as its product screenshot.
- AC4: Dark mode has zero hardcoded `#368F8B` remaining (grep returns nothing in `components/`); social icons pass 3:1 in both schemes.
- AC5: No content/copy diffs, no new dependencies, no changes outside the six named files plus `types/Project.types.ts` and `.claude/launch.json`.
- AC6: `yarn build` green; preview console clean; screenshots captured for light/dark at desktop and mobile as proof.
- AC7: Reduced-motion users get no transform animation (verified via emulation).

## Out of scope

Blog, db/redirects, OG images, `/uses`, `/work`, copy of any kind, project set/order, new sections or headings ("Selected work" splits and feature-card spans were considered and deferred), font changes, token value changes (palette passes AA as-is), the Tech Stack toggle interaction model.

## Rollback

Single revert of the one implementation commit restores the previous visual system; no data, schema, or config migrations involved.

## Appendix A: contrast verification script

Run `node contrast-check.mjs` from anywhere; expected output is all PASS. Computed today against the tokens in [app/global.css](../../app/global.css):

| Pair (scheme) | Ratio | Requirement |
| --- | --- | --- |
| foreground on background (light) | 8.51:1 | 4.5 body |
| muted-foreground on background (light) | 6.11:1 | 4.5 body |
| muted-foreground on muted card surface (light) | 5.04:1 | 4.5 body |
| foreground on muted card surface (light, pills) | 7.02:1 | 4.5 pills |
| foreground on background (dark) | 8.51:1 | 4.5 body |
| muted-foreground on background (dark) | 7.02:1 | 4.5 body |
| muted-foreground on muted card surface (dark) | 5.04:1 | 4.5 body |
| foreground on muted card surface (dark, pills) | 6.11:1 | 4.5 pills |
| social icons muted-foreground (light / dark) | 6.11:1 / 7.02:1 | 3.0 glyphs |
| OLD `#368F8B` icons on dark background | 2.73:1 | FAILS 3.0 (the bug T5 fixes) |
| white title over black/75 scrim on pure-white cover | 3.50:1 | 3.0 large text |

```js
const hex = (h) => { h = h.replace('#',''); return [0,2,4].map(i => parseInt(h.slice(i,i+2),16)/255) }
const lum = ([r,g,b]) => { const f = c => c <= 0.03928 ? c/12.92 : ((c+0.055)/1.055)**2.4
  return 0.2126*f(r) + 0.7152*f(g) + 0.0722*f(b) }
const ratio = (a,b) => { const [hi,lo] = [lum(hex(a)),lum(hex(b))].sort((x,y)=>y-x)
  return (hi+0.05)/(lo+0.05) }
const check = (label,fg,bg,need) => { const r = ratio(fg,bg)
  console.log(`${r>=need?'PASS':'FAIL'} ${r.toFixed(2)}:1 (need ${need}) ${label}`) }
// light
check('fg/bg light','#5e3144','#f1e4e9',4.5)
check('mutedfg/bg light','#235d5a','#f1e4e9',4.5)
check('mutedfg/muted light','#235d5a','#e5cdd6',4.5)
check('fg/muted light (pills)','#5e3144','#e5cdd6',4.5)
check('icons mutedfg/bg light','#235d5a','#f1e4e9',3)
// dark
check('fg/bg dark','#f1e4e9','#5e3144',4.5)
check('mutedfg/bg dark','#e5cdd6','#5e3144',4.5)
check('mutedfg/muted dark','#e5cdd6','#235d5a',4.5)
check('fg/muted dark (pills)','#f1e4e9','#235d5a',4.5)
check('icons mutedfg/bg dark','#e5cdd6','#5e3144',3)
// scrim worst case: white text, black/75 scrim, pure-white cover pixel
console.log(`${(1.05/(1-0.75+0.05)).toFixed(2)}:1 worst-case title over black/75 (need 3.0)`)
```
