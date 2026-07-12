# Quick Spec: Awwwards pass (display type, accent, grain, reveals, case pages)

Status: ready-for-dev
Authored: 2026-07-13
Owner: N
Repo: `/Users/beforeoafterm/Developer/beforeoafterm/beforeoafterm.io` (branch `main`, clean at `6636285`)
Predecessor: `quick-spec-visual-polish-pass.md` (shipped as `79d82db` + `a4c6ceb`); its AA and motion-safe disciplines carry over as hard constraints.

## Scope

Four workstreams, approved by the user on 2026-07-13:

1. **Display typography**: replace Quicksand with Fraunces for headings/display; labels (buttons, pills, nav) move to Aleo. Hero goes to display scale.
2. **Accent discipline + grain**: the mustard `--secondary #ffd400` gets exactly three jobs (selection, one highlighted hero phrase, link-hover underlines); a 2.5% SVG-noise grain overlays the page.
3. **Staggered card reveals**: framer-motion (already a dependency) `whileInView` entry for project cards, once per load, reduced-motion aware.
4. **The bold move**: per-project case pages at `/projects/[slug]` where the card cover morphs into the page header via the View Transitions API (`next-view-transitions`, the one new dependency, ~3 KB).

Copy constraint: NO new narrative content. Case pages render ONLY existing data (name, description, cover, tech stack, URL). The data model gains optional case-study fields (`role`, `period`, `highlights`) that render conditionally; they stay UNSET until the user writes them. Do not fabricate values.

## Design decisions (with the math)

### D1. Font system: two faces, not three

- `--font-serif` re-points from Quicksand to **Fraunces** (variable, `next/font/google`, `subsets: ['latin']`). Load lean: default axes only (wght + auto opsz); skip SOFT/WONK/italic to keep the added payload under ~60 KB. All `font-serif` HEADING usages (global `h1`/`h2`, hero, card overlay title, header tagline) become Fraunces automatically.
- LABEL usages of `font-serif` switch to `font-slabSerif` (Aleo) so UI chrome does not wear a display face: `components/ui/button.tsx` cva base, `._label` in `app/global.css`, `components/nav.tsx` links.
- `components/layout-header.tsx` rail name h1 currently overrides with `font-slabSerif`; remove that override so the name inherits Fraunces from the global h1 rule.
- Quicksand import is deleted from `app/layout.tsx`.

### D2. Hero display scale (copy unchanged)

`app/page.module.css` gains `.Home_headingText`: `text-balance font-serif tracking-tight leading-[1.02] text-[clamp(2.5rem,6vw,5.5rem)]`. The emoji wraps in a `<span className="text-[0.7em]">👋🏼</span>` so it scales sub-linearly (same character, same copy). The global h1 rule still supplies `mb-4`.

### D3. Accent rules (mustard earns three jobs, all token-true)

Measured ratios (WCAG 2.1):

| Pair | Ratio | Verdict |
| --- | --- | --- |
| plum `#5e3144` text on mustard `#ffd400` mark | 7.34:1 | AA body, both schemes |
| mustard `#ffd400` on dark plum bg | 7.34:1 | AA body (dark-only accents OK) |
| `accent-foreground #806a00` on mustard | 3.69:1 | FAILS body AA: never use for text |
| mustard text on light bg `#f1e4e9` | ~1.4:1 | FAILS: never mustard text in light mode |

1. Selection: already `--accent` (keep).
2. `_highlight` mark: new component-layer class in `app/global.css`: `bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded-md box-decoration-clone`. Applied to the phrase "agent-native" in the hero's first paragraph (`app/page.tsx`), markup only, copy identical.
3. Link hovers: global `a` rule gains `hover:decoration-secondary hover:decoration-2` (decoration only; text color stays token-accessible). Mustard never becomes text color in light mode.

### D4. Grain

`app/global.css` `body::after`: fixed, `inset-0`, `pointer-events-none`, `z-50` is wrong (would sit over modals); use `z-[1]` and ensure content stacks above, OR simpler and safer: attach the grain to `body::before` with `z-index: -1` ABOVE the background color but below content, `opacity: 0.5`, and a `background-image` of an inline SVG `feTurbulence` (fractalNoise, baseFrequency ~0.8, 128px tile) rendered at 2.5-3.5% effective alpha. CSP already allows `img-src data:`. Must be a single paint layer (no animation). Verify it is invisible-but-felt in BOTH schemes: dial alpha per scheme with `@media (prefers-color-scheme: dark)` if needed (dark usually wants ~1.5x).

### D5. Motion tokens

New `lib/motion.ts`: `export const EASE = [0.22, 1, 0.36, 1] as const` and `export const DUR = { fast: 0.15, base: 0.3, slow: 0.5 }`. All new motion imports from here. Card reveal: `initial {opacity: 0, y: 12}` to `{opacity: 1, y: 0}`, `duration: DUR.base, ease: EASE`, `viewport {once: true, margin: '-40px'}`, `delay: (index % 2) * 0.06`. Use framer's `useReducedMotion()`: when true, render with no initial offset (content must never be hidden from reduced-motion users, and `whileInView` must not leave cards at opacity 0 if IntersectionObserver misfires; `once: true` plus a fallback `animate` guard).

### D6. Case pages + view transitions

- Data moves to `lib/projects.ts`: the 13-project array (copy byte-identical), each entry gains `slug` (kebab, stable, listed in T4), plus optional `role?`, `period?`, `highlights?: string[]` (all left unset). `types/Project.types.ts` extends accordingly. `app/projects/page.tsx` imports instead of declaring.
- New shared `components/cover-image.tsx`: renders the cover exactly as the card does today (next/image fill + sizes for rasters; plain `img` for `coverFit: 'contain'`; paper backdrop for the SVG) and accepts `vtName?: string` to set `style={{ viewTransitionName }}` and `priority`/`sizes`/`className` passthroughs. `project-card.tsx` and the case header both use it (no duplicated cover logic).
- New `app/projects/[slug]/page.tsx`: `generateStaticParams` from the data (SSG all 13); unknown slug calls `notFound()`. `generateMetadata`: title = name, description = description, `openGraph.images = [coverImageSrc]`. Layout: back link ("← All projects", VT Link), cover header (`aspect-[16/10] md:aspect-[21/9] rounded-3xl overflow-hidden` with the same scrim + white Fraunces display title, `vtName = 'cover-' + slug`), description at `text-lg leading-relaxed max-w-[65ch]`, all pills visible (no toggle on detail pages), CTA row: primary external link + conditional sections for `role`/`period`/`highlights` ONLY when present.
- External-link label derives from URL host: `github.com` gives "View on GitHub", `web.archive.org` gives "View archived site", `facebook.com` gives "Watch video", default "Visit live site". `target="_blank" rel="noreferrer"`.
- `app/layout.tsx`: wrap the returned tree in `<ViewTransitions>` from `next-view-transitions`.
- `components/project-card.tsx`: media zone + title anchor become ONE `next-view-transitions` `Link` to `/projects/${slug}` (internal; drop `target`/`rel` there). Cover gets `vtName = 'cover-' + slug`. The arrow icon stays (now signals "open case"). Tech Stack toggle unchanged.
- Reduced-motion guard in `app/global.css`: `@media (prefers-reduced-motion: reduce) { ::view-transition-group(*), ::view-transition-image-pair(*), ::view-transition-old(*), ::view-transition-new(*) { animation: none !important; } }`. Optional polish: `::view-transition-group(*) { animation-duration: 300ms; }` to match DUR.base.
- Browsers without the API get normal navigation (the library degrades silently). The card grid page keeps its own `vtName` per cover so the RETURN morph also works.
- `app/sitemap.ts`: add the 13 `/projects/[slug]` URLs alongside existing routes.

## Tasks

- **T1 Fonts**: `app/layout.tsx` (Fraunces in, Quicksand out), label font swaps in `components/ui/button.tsx`, `app/global.css` `._label`, `components/nav.tsx`, rail-name override removal in `components/layout-header.tsx`. Commit: `style: Fraunces display type, Aleo labels`.
- **T2 Accent + grain**: `app/global.css` (`_highlight`, link hover decoration, grain layer), `app/page.tsx` (highlight span + emoji span), `app/page.module.css` (`.Home_headingText`). Commit: `style: hero display scale, accent discipline, grain`.
- **T3 Motion tokens + reveals**: `lib/motion.ts`, `components/project-card.tsx` (motion.article + index prop), `app/projects/page.tsx` (pass index). Commit: `style: staggered card reveals`.
- **T4 Data + slugs**: `lib/projects.ts`, `types/Project.types.ts`, `app/projects/page.tsx` import swap. Slugs: `once-upon-a-desk`, `broker-copilot`, `tioi-network`, `w3-io`, `dealsync`, `artkipelago`, `aqwire-payment-portal`, `athena-playbook-library`, `athena-web-component-library`, `the-hive-virtual-events-hub`, `nftreats-art-marketplace`, `reversenumber-org`, `stihl-imow-web-app`. Copy must remain byte-identical (verify by diff).
- **T5 Case pages + VT**: `yarn add next-view-transitions`, `components/cover-image.tsx`, `app/projects/[slug]/page.tsx`, layout wrapper, card Link swap, VT CSS guards, sitemap. Commit: `feat: project case pages with view-transition cover morph`.
- **T6 Verify** (blocking): clean `yarn build` (dev server stopped first; the Turbopack/.next conflict from last session); all 13 case pages SSG; preview both schemes desktop + mobile: hero scale, mark AA, grain visible-but-quiet, reveals fire once and never hide content, card click navigates to case page and cover morph runs in the pane (Chromium supports VT), back-morph works, external CTA labels correct per host, console clean, copy audit (descriptions byte-identical, no invented case content), reduced-motion: reveals static + VT animations suppressed (verify via built CSS + emulation where possible).

## Acceptance criteria

- AC1: Quicksand fully removed; headings render Fraunces, labels Aleo; added font payload under ~60 KB (check network panel or build output).
- AC2: Hero h1 renders at display scale with balanced wrapping at 375px, 768px, 1280px; emoji does not dominate.
- AC3: Mustard appears as exactly three treatments (selection, one hero mark at 7.34:1, hover underline decoration); mustard is never text color in light mode.
- AC4: Grain present in both schemes at low single-digit opacity; no scroll jank (single fixed layer, no animation).
- AC5: Cards stagger in once; reduced-motion users see all cards immediately (no opacity-0 stranding); built CSS keeps transforms inside `prefers-reduced-motion: no-preference` where Tailwind-driven.
- AC6: Every card links to a static case page; unknown slugs 404; case pages carry correct metadata and appear in the sitemap; cover morphs on navigate and return in supporting browsers, plain navigation elsewhere; VT suppressed under reduced motion.
- AC7: No copy changes anywhere; optional case fields render nothing today; external "visit" preserved on case pages with host-appropriate labels.
- AC8: Clean `yarn build` green; preview console clean; light/dark, desktop/mobile proof screenshots including one case page.

## Out of scope

Case-study narrative content (user writes `role`/`period`/`highlights` later), hero kinetic type intro, left-rail upgrades (availability badge, local time), closing/footer section, pill-toggle removal, blog/uses/work styling, OG image redesign, dark-token changes.

## Rollback

Each workstream is its own commit; revert individually. The case-page commit is the only one with a dependency and routing surface; reverting it restores external card links wholesale.
