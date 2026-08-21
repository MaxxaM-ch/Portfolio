# Portfolio Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a one-page, dark-themed, "premium" developer portfolio (À propos / Compétences / Expériences / Projets / Contact) as a static Vite site.

**Architecture:** Static site, Vite + vanilla JS + SCSS, no framework, no backend. Small, independently testable JS modules (`src/js/*.js`) hold all non-trivial logic (nav toggle, scroll-spy, reveal-on-scroll, parallax, copy-to-clipboard); `src/main.js` wires them to the DOM. SCSS is split into partials (`variables`, `base`, `navbar`, `sections`) composed via `@use` in `src/styles/main.scss`. Content is provisional French placeholder text, to be replaced later by the user.

**Tech Stack:** Vite, SCSS (`sass`), vanilla JavaScript (ES modules), Vitest + jsdom for unit tests.

## Global Constraints

- Colors: fond principal `#150F10`, fond alterné `#181112`, panneau `#1D1516`, primaire `#7A1F2B`, secondaire `#C98B8B`, texte `#F3E9E7`, texte atténué `#D8C9C7`, bordure `rgba(243, 233, 231, 0.1)`.
- Typographie : **Fraunces** (italique, graisse 600) pour les titres et le nom en hero ; **Manrope** pour le texte courant, les labels et la navigation. Chargées via Google Fonts.
- Stack : Vite + HTML/JS vanilla + SCSS. Aucun framework JS, aucun backend.
- Contenu 100% provisoire pour l'instant, en français.
- Grille Projets : 2×2 (4 projets mis en avant).
- Compétences : 3 catégories — Maîtrisé (badge plein bourgogne), Intermédiaire (contour secondaire), En perfectionnement (contour pointillé).
- Navbar fixe (sticky), lien actif surligné pendant le scroll, défilement fluide vers les ancres (`scroll-behavior: smooth`), menu hamburger plein écran en dessous de `768px`.
- Logo : monogramme "MP", version 3D des SVG sources, fond transparent, recoloré en `#F3E9E7`.
- Animations : fade-in au scroll par section (`IntersectionObserver`), hover discret sur boutons/cartes, parallaxe légère du motif à pointillés du hero.
- Contact : liens directs LinkedIn/GitHub, copie de l'email au clic avec feedback visuel ("Copié !"), lien `mailto:` en secours, pas de formulaire.
- Déploiement pressenti : Vercel (non figé — sans impact sur la structure, le site est un build statique déployable partout).
- Spec de référence : `docs/superpowers/specs/2026-08-17-portfolio-landing-page-design.md`.

### Convention Git (obligatoire pour chaque tâche)

- **Une branche par tâche**, créée depuis `master`, nommée `<type>-<slug-de-la-tâche>` : `feat-`, `fix-`, `config-`, `refacto-`.
- **Messages de commit** préfixés par le type, en majuscules, suivi d'un espace, deux-points, espace, puis une description claire :
  - `FEAT : <description claire>` — nouvelle fonctionnalité
  - `CONFIG : <description claire>` — configuration, outillage, scaffolding
  - `FIX : <description claire>` — correction de bug
  - `REFACTO : <description claire>` — refactorisation sans changement de comportement
- Chaque tâche de ce plan indique son nom de branche et se termine par un merge (`--no-ff`) de cette branche dans `master` avant de passer à la tâche suivante.

---

### Task 1: Project scaffolding & tooling

**Branch:** `config-project-scaffolding`

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `index.html`
- Create: `src/main.js`
- Create: `src/styles/main.scss`

**Interfaces:**
- Produces: a bootable Vite project (`npm run dev`, `npm run build`, `npm run test`) that every later task builds on.

- [ ] **Create the feature branch**

```bash
git checkout master
git checkout -b config-project-scaffolding
```

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "portfolio",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run"
  },
  "devDependencies": {
    "jsdom": "^24.1.0",
    "sass": "^1.77.0",
    "vite": "^5.4.0",
    "vitest": "^2.0.0"
  }
}
```

- [ ] **Step 2: Create `vite.config.js`**

```js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
  },
});
```

- [ ] **Step 3: Create `index.html`**

```html
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Prénom Nom — Développeur Web</title>
  </head>
  <body>
    <header class="navbar" id="navbar"></header>
    <main></main>
    <footer class="footer"></footer>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

- [ ] **Step 4: Create `src/styles/main.scss`**

```scss
// Entry point. Partials are added and imported in later tasks.
```

- [ ] **Step 5: Create `src/main.js`**

```js
import './styles/main.scss';
```

- [ ] **Step 6: Install dependencies**

Run: `npm install`
Expected: install completes with no errors, `node_modules/` created.

- [ ] **Step 7: Verify build**

Run: `npm run build`
Expected: output ends with `✓ built in <time>` and a `dist/` folder is created.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json vite.config.js index.html src/main.js src/styles/main.scss
git commit -m "CONFIG : scaffold Vite project with SCSS and Vitest"
```

- [ ] **Merge into master**

```bash
git checkout master
git merge --no-ff config-project-scaffolding -m "Merge branch 'config-project-scaffolding'"
```

---

### Task 2: Process logo SVGs

**Branch:** `feat-logo-assets`

**Files:**
- Create: `src/assets/logo-m.svg`
- Create: `src/assets/logo-p.svg`

**Interfaces:**
- Produces: `src/assets/logo-m.svg`, `src/assets/logo-p.svg` — transparent-background SVGs, fill `#F3E9E7`, referenced as `<img>` sources by the navbar in Task 4.

The source files `assets/letter_M_3D.svg` and `assets/letter_P_3D.svg` have an opaque white/grey background rectangle and a black glyph. This task extracts just the glyph path, drops the background, and recolors the fill to the warm off-white used throughout the design.

- [ ] **Create the feature branch**

```bash
git checkout master
git checkout -b feat-logo-assets
```

- [ ] **Step 1: Create `src/assets/logo-m.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1500 1499.999933" width="40" height="40" aria-hidden="true" focusable="false">
  <g transform="matrix(1, 0, 0, 1, 483, 497)">
    <g fill="#F3E9E7" fill-opacity="1">
      <g transform="translate(0.198537, 432.966643)">
        <path d="M 270 -193.9375 C 276.039062 -193.9375 280.40625 -195.28125 283.09375 -197.96875 C 285.78125 -200.65625 289.976562 -206.363281 295.6875 -215.09375 L 357.140625 -308.796875 C 359.160156 -312.148438 361.425781 -314.414062 363.9375 -315.59375 C 366.457031 -316.769531 369.0625 -317.359375 371.75 -317.359375 L 380.3125 -317.359375 C 385.019531 -317.359375 388.460938 -316.097656 390.640625 -313.578125 C 392.828125 -311.054688 393.921875 -307.109375 393.921875 -301.734375 L 393.921875 -45.34375 L 388.890625 -45.34375 L 388.890625 -301.734375 C 388.890625 -304.421875 388.300781 -306.851562 387.125 -309.03125 C 385.945312 -311.21875 383.675781 -312.3125 380.3125 -312.3125 L 372.765625 -312.3125 C 370.410156 -312.3125 368.394531 -311.972656 366.71875 -311.296875 C 365.039062 -310.628906 363.191406 -308.617188 361.171875 -305.265625 L 299.71875 -212.578125 C 293.675781 -203.503906 289.054688 -197.289062 285.859375 -193.9375 C 282.671875 -190.582031 277.382812 -188.90625 270 -188.90625 C 262.613281 -188.90625 257.320312 -190.582031 254.125 -193.9375 C 250.9375 -197.289062 246.320312 -203.503906 240.28125 -212.578125 L 178.828125 -305.265625 C 176.804688 -308.617188 174.875 -310.628906 173.03125 -311.296875 C 171.1875 -311.972656 169.085938 -312.3125 166.734375 -312.3125 L 159.1875 -312.3125 C 155.820312 -312.3125 153.632812 -311.21875 152.625 -309.03125 C 151.625 -306.851562 151.125 -304.421875 151.125 -301.734375 L 151.125 -45.34375 L 146.078125 -45.34375 L 146.078125 -301.734375 C 146.078125 -307.109375 147.164062 -311.054688 149.34375 -313.578125 C 151.53125 -316.097656 154.8125 -317.359375 159.1875 -317.359375 L 167.75 -317.359375 C 170.425781 -317.359375 173.109375 -316.769531 175.796875 -315.59375 C 178.484375 -314.414062 180.835938 -312.148438 182.859375 -308.796875 L 244.3125 -215.09375 C 250.019531 -206.363281 254.21875 -200.65625 256.90625 -197.96875 C 259.59375 -195.28125 263.957031 -193.9375 270 -193.9375 Z M 185.875 0 C 192.257812 0 196.878906 -1.425781 199.734375 -4.28125 C 202.585938 -7.132812 204.015625 -11.753906 204.015625 -18.140625 L 204.015625 -195.453125 L 233.734375 -140.546875 C 236.753906 -134.835938 240.363281 -130.722656 244.5625 -128.203125 C 248.757812 -125.679688 254.050781 -124.421875 260.4375 -124.421875 L 280.578125 -124.421875 C 286.960938 -124.421875 292.253906 -125.679688 296.453125 -128.203125 C 300.648438 -130.722656 304.257812 -134.835938 307.28125 -140.546875 L 337 -195.453125 L 337 -18.140625 C 337 -11.753906 338.425781 -7.132812 341.28125 -4.28125 C 344.132812 -1.425781 348.75 0 355.125 0 L 432.703125 0 C 439.085938 0 443.707031 -1.425781 446.5625 -4.28125 C 449.414062 -7.132812 450.84375 -11.753906 450.84375 -18.140625 L 450.84375 -344.546875 C 450.84375 -350.929688 449.414062 -355.550781 446.5625 -358.40625 C 443.707031 -361.257812 439.085938 -362.6875 432.703125 -362.6875 L 351.109375 -362.6875 C 345.734375 -362.6875 341.28125 -361.507812 337.75 -359.15625 C 334.226562 -356.8125 330.957031 -352.953125 327.9375 -347.578125 L 283.09375 -265.46875 C 281.414062 -262.445312 279.988281 -260.265625 278.8125 -258.921875 C 277.632812 -257.578125 276.039062 -256.90625 274.03125 -256.90625 L 269.5 -256.90625 C 267.476562 -256.90625 265.878906 -257.578125 264.703125 -258.921875 C 263.535156 -260.265625 262.113281 -262.445312 260.4375 -265.46875 L 215.09375 -347.578125 C 212.070312 -352.953125 208.796875 -356.8125 205.265625 -359.15625 C 201.742188 -361.507812 197.296875 -362.6875 191.921875 -362.6875 L 110.828125 -362.6875 C 104.441406 -362.6875 99.820312 -361.257812 96.96875 -358.40625 C 94.113281 -355.550781 92.6875 -350.929688 92.6875 -344.546875 L 92.6875 -18.140625 C 92.6875 -11.753906 94.113281 -7.132812 96.96875 -4.28125 C 99.820312 -1.425781 104.441406 0 110.828125 0 Z M 202 0.5 L 136.515625 54.90625 C 135.171875 56.25 133.070312 57.421875 130.21875 58.421875 C 127.363281 59.429688 124.253906 59.9375 120.890625 59.9375 L 45.84375 59.9375 C 37.78125 59.9375 31.898438 58.085938 28.203125 54.390625 C 24.515625 50.703125 22.671875 44.828125 22.671875 36.765625 L 22.671875 -289.640625 C 22.671875 -294.015625 23.253906 -297.710938 24.421875 -300.734375 C 25.597656 -303.753906 27.363281 -306.269531 29.71875 -308.28125 L 94.703125 -363.1875 C 96.378906 -364.53125 98.644531 -365.617188 101.5 -366.453125 C 104.351562 -367.296875 107.460938 -367.71875 110.828125 -367.71875 L 191.921875 -367.71875 C 198.304688 -367.71875 203.597656 -366.375 207.796875 -363.6875 C 211.992188 -361.007812 215.9375 -356.476562 219.625 -350.09375 L 253.875 -287.125 L 258.421875 -295.1875 C 259.765625 -297.539062 261.191406 -299.804688 262.703125 -301.984375 C 264.210938 -304.171875 265.804688 -305.9375 267.484375 -307.28125 L 332.46875 -361.6875 C 335.15625 -363.695312 337.925781 -365.203125 340.78125 -366.203125 C 343.632812 -367.210938 347.078125 -367.71875 351.109375 -367.71875 L 432.703125 -367.71875 C 440.765625 -367.71875 446.640625 -365.867188 450.328125 -362.171875 C 454.023438 -358.484375 455.875 -352.609375 455.875 -344.546875 L 455.875 -18.140625 C 455.875 -13.765625 455.285156 -10.066406 454.109375 -7.046875 C 452.941406 -4.023438 451.179688 -1.507812 448.828125 0.5 Z"/>
      </g>
    </g>
  </g>
</svg>
```

- [ ] **Step 2: Create `src/assets/logo-p.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1500 1499.999933" width="32" height="40" aria-hidden="true" focusable="false">
  <g transform="matrix(1, 0, 0, 1, 535, 497)">
    <g fill="#F3E9E7" fill-opacity="1">
      <g transform="translate(1.025104, 433.163313)">
        <path d="M 123.890625 59.9375 L 45.828125 59.9375 C 37.773438 59.9375 31.898438 58.085938 28.203125 54.390625 C 24.503906 50.703125 22.65625 44.828125 22.65625 36.765625 L 22.65625 -289.578125 C 22.65625 -293.941406 23.242188 -297.632812 24.421875 -300.65625 C 25.597656 -303.6875 27.363281 -306.207031 29.71875 -308.21875 L 94.6875 -363.109375 C 96.363281 -364.453125 98.628906 -365.539062 101.484375 -366.375 C 104.335938 -367.21875 107.441406 -367.640625 110.796875 -367.640625 L 264.90625 -367.640625 C 288.75 -367.640625 308.726562 -365.117188 324.84375 -360.078125 C 340.957031 -355.046875 353.710938 -348 363.109375 -338.9375 C 372.515625 -329.875 379.144531 -318.960938 383 -306.203125 C 386.863281 -293.441406 388.796875 -279.507812 388.796875 -264.40625 L 388.796875 -199.9375 C 388.796875 -183.820312 386.53125 -169.132812 382 -155.875 C 377.46875 -142.613281 369.660156 -131.28125 358.578125 -121.875 L 293.109375 -67.484375 C 284.710938 -60.429688 273.882812 -54.640625 260.625 -50.109375 C 247.363281 -45.578125 231.164062 -42.972656 212.03125 -42.296875 L 212.03125 -18.125 C 212.03125 -13.757812 211.441406 -10.066406 210.265625 -7.046875 C 209.085938 -4.023438 207.320312 -1.507812 204.96875 0.5 L 139.5 54.890625 C 138.15625 56.234375 136.054688 57.410156 133.203125 58.421875 C 130.347656 59.429688 127.242188 59.9375 123.890625 59.9375 Z"/>
      </g>
    </g>
  </g>
</svg>
```

- [ ] **Step 3: Commit**

```bash
git add src/assets/logo-m.svg src/assets/logo-p.svg
git commit -m "FEAT : add processed MP monogram logo assets"
```

- [ ] **Merge into master**

```bash
git checkout master
git merge --no-ff feat-logo-assets -m "Merge branch 'feat-logo-assets'"
```

---

### Task 3: SCSS foundation (variables, base, fonts)

**Branch:** `config-scss-foundation`

**Files:**
- Create: `src/styles/_variables.scss`
- Create: `src/styles/_base.scss`
- Modify: `src/styles/main.scss`

**Interfaces:**
- Produces: SCSS variables (`$color-bg`, `$color-bg-alt`, `$color-panel`, `$color-primary`, `$color-secondary`, `$color-text`, `$color-text-muted`, `$color-border`, `$font-heading`, `$font-body`, `$breakpoint-mobile`, `$section-padding`, `$section-padding-mobile`, `$dot-color`, `$dot-size`) consumed via `@use 'variables' as *;` by every later SCSS partial. Also produces reusable classes `.section-label`, `.section-title`, `.dots-pattern`, `.reveal` / `.reveal.is-visible`, and `.btn` / `.btn--primary` / `.btn--ghost`.

- [ ] **Create the feature branch**

```bash
git checkout master
git checkout -b config-scss-foundation
```

- [ ] **Step 1: Create `src/styles/_variables.scss`**

```scss
// Colors
$color-bg: #150F10;
$color-bg-alt: #181112;
$color-panel: #1D1516;
$color-primary: #7A1F2B;
$color-secondary: #C98B8B;
$color-text: #F3E9E7;
$color-text-muted: #D8C9C7;
$color-border: rgba(243, 233, 231, 0.1);

// Typography
$font-heading: 'Fraunces', serif;
$font-body: 'Manrope', sans-serif;

// Layout
$breakpoint-mobile: 768px;
$section-padding: 64px 32px;
$section-padding-mobile: 48px 20px;

// Pattern
$dot-color: rgba(122, 31, 43, 0.35);
$dot-size: 18px;
```

- [ ] **Step 2: Create `src/styles/_base.scss`**

```scss
@use 'variables' as *;

@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,600;1,600&family=Manrope:wght@400;500;600;700&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  background: $color-bg;
  color: $color-text;
  font-family: $font-body;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

body.nav-open {
  overflow: hidden;
}

a {
  color: inherit;
  text-decoration: none;
}

h1, h2, h3, h4 {
  font-family: $font-heading;
  font-style: italic;
  font-weight: 600;
}

button {
  font-family: $font-body;
  cursor: pointer;
}

section[id] {
  scroll-margin-top: 90px;
}

.section-label {
  font-size: 11px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: $color-secondary;
  margin-bottom: 10px;
}

.section-title {
  font-size: 28px;
  margin-bottom: 24px;
}

.dots-pattern {
  background-image: radial-gradient($dot-color 1px, transparent 1px);
  background-size: $dot-size $dot-size;
}

.reveal {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.6s ease, transform 0.6s ease;

  &.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
}

.btn {
  display: inline-block;
  padding: 12px 26px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 600;
  font-family: $font-body;
  transition: transform 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
}

.btn--primary {
  background: $color-primary;
  color: $color-text;
  border: none;
}

.btn--ghost {
  background: transparent;
  color: $color-text;
  border: 1px solid rgba($color-text, 0.3);
}
```

- [ ] **Step 3: Update `src/styles/main.scss`**

```scss
@use 'variables';
@use 'base';
```

- [ ] **Step 4: Verify in the browser**

Run: `npm run dev`, open the printed local URL.
Expected: blank page with a dark background (`#150F10`), no console errors. In the Network tab, the Google Fonts stylesheet request succeeds (status 200).

- [ ] **Step 5: Commit**

```bash
git add src/styles/_variables.scss src/styles/_base.scss src/styles/main.scss
git commit -m "CONFIG : add SCSS variables, base styles and Google Fonts"
```

- [ ] **Merge into master**

```bash
git checkout master
git merge --no-ff config-scss-foundation -m "Merge branch 'config-scss-foundation'"
```

---

### Task 4: Navbar markup and styles

**Branch:** `feat-navbar`

**Files:**
- Create: `src/styles/_navbar.scss`
- Modify: `src/styles/main.scss`
- Modify: `index.html:8` (the empty `<header class="navbar" id="navbar">`)

**Interfaces:**
- Consumes: `$color-*`, `$font-*`, `$breakpoint-mobile` from Task 3; `src/assets/logo-m.svg`, `src/assets/logo-p.svg` from Task 2.
- Produces: `#nav-links` (the `.navbar__links` list) and `#nav-toggle` (the hamburger button) — DOM ids consumed by Task 5 (nav-toggle wiring) and Task 13 (scroll-spy, via the `.navbar__link` class).

- [ ] **Create the feature branch**

```bash
git checkout master
git checkout -b feat-navbar
```

- [ ] **Step 1: Create `src/styles/_navbar.scss`**

```scss
@use 'variables' as *;

.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 32px;
  background: $color-bg;
  border-bottom: 1px solid $color-border;
}

.navbar__logo {
  display: flex;
  align-items: center;

  img {
    height: 40px;
    display: block;

    &:first-child {
      margin-right: -6px;
    }
  }
}

.navbar__links {
  display: flex;
  align-items: center;
  gap: 34px;
  font-size: 13px;
  color: $color-text-muted;
  list-style: none;

  @media (max-width: $breakpoint-mobile) {
    position: fixed;
    inset: 0;
    z-index: 99;
    background: $color-bg;
    flex-direction: column;
    justify-content: center;
    gap: 28px;
    font-family: $font-heading;
    font-style: italic;
    font-size: 20px;
    transform: translateY(-100%);
    transition: transform 0.3s ease;

    &.is-open {
      transform: translateY(0);
    }
  }
}

.navbar__link {
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover,
  &.is-active {
    color: $color-text;
  }
}

.nav-toggle {
  display: none;
  position: relative;
  z-index: 100;
  background: transparent;
  border: none;
  color: $color-text;
  font-size: 24px;
  line-height: 1;
  padding: 4px;

  @media (max-width: $breakpoint-mobile) {
    display: block;
  }
}
```

- [ ] **Step 2: Update `src/styles/main.scss`**

```scss
@use 'variables';
@use 'base';
@use 'navbar';
```

- [ ] **Step 3: Fill in the navbar markup in `index.html`**

Replace:

```html
    <header class="navbar" id="navbar"></header>
```

With:

```html
    <header class="navbar">
      <div class="navbar__logo">
        <img src="/src/assets/logo-m.svg" alt="" />
        <img src="/src/assets/logo-p.svg" alt="Logo — initiales MP" />
      </div>
      <ul class="navbar__links" id="nav-links">
        <li><a class="navbar__link" href="#about">À propos</a></li>
        <li><a class="navbar__link" href="#skills">Compétences</a></li>
        <li><a class="navbar__link" href="#experience">Expériences</a></li>
        <li><a class="navbar__link" href="#projects">Projets</a></li>
        <li><a class="navbar__link" href="#contact">Contact</a></li>
      </ul>
      <button class="nav-toggle" id="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-links" aria-label="Ouvrir le menu">☰</button>
    </header>
```

- [ ] **Step 4: Verify in the browser**

Run: `npm run dev`.
Expected: sticky navbar with the "MP" logo, 5 links, and (below 768px width, via devtools responsive mode) the links disappear and the ☰ button appears.

- [ ] **Step 5: Commit**

```bash
git add src/styles/_navbar.scss src/styles/main.scss index.html
git commit -m "FEAT : add navbar markup and styles"
```

- [ ] **Merge into master**

```bash
git checkout master
git merge --no-ff feat-navbar -m "Merge branch 'feat-navbar'"
```

---

### Task 5: Mobile nav toggle (TDD)

**Branch:** `feat-mobile-nav-toggle`

**Files:**
- Create: `src/js/nav-toggle.js`
- Create: `src/js/nav-toggle.test.js`
- Modify: `src/main.js`

**Interfaces:**
- Consumes: `#nav-links` element (the `.navbar__links` `<ul>`) and `#nav-toggle` button from Task 4.
- Produces: `toggleNav(navEl, toggleBtnEl): boolean` and `closeNav(navEl, toggleBtnEl): void`, exported from `src/js/nav-toggle.js`.

- [ ] **Create the feature branch**

```bash
git checkout master
git checkout -b feat-mobile-nav-toggle
```

- [ ] **Step 1: Write the failing test**

```js
// src/js/nav-toggle.test.js
import { describe, it, expect, beforeEach } from 'vitest';
import { toggleNav, closeNav } from './nav-toggle.js';

function makeNavEl() {
  const el = document.createElement('ul');
  return el;
}

function makeToggleBtn() {
  const el = document.createElement('button');
  el.setAttribute('aria-expanded', 'false');
  return el;
}

describe('toggleNav', () => {
  let navEl;
  let toggleBtnEl;

  beforeEach(() => {
    navEl = makeNavEl();
    toggleBtnEl = makeToggleBtn();
    document.body.className = '';
  });

  it('opens the nav on first call and returns true', () => {
    const isOpen = toggleNav(navEl, toggleBtnEl);

    expect(isOpen).toBe(true);
    expect(navEl.classList.contains('is-open')).toBe(true);
    expect(toggleBtnEl.getAttribute('aria-expanded')).toBe('true');
    expect(document.body.classList.contains('nav-open')).toBe(true);
  });

  it('closes the nav on second call and returns false', () => {
    toggleNav(navEl, toggleBtnEl);
    const isOpen = toggleNav(navEl, toggleBtnEl);

    expect(isOpen).toBe(false);
    expect(navEl.classList.contains('is-open')).toBe(false);
    expect(toggleBtnEl.getAttribute('aria-expanded')).toBe('false');
    expect(document.body.classList.contains('nav-open')).toBe(false);
  });
});

describe('closeNav', () => {
  it('closes an open nav', () => {
    const navEl = makeNavEl();
    const toggleBtnEl = makeToggleBtn();
    toggleNav(navEl, toggleBtnEl);

    closeNav(navEl, toggleBtnEl);

    expect(navEl.classList.contains('is-open')).toBe(false);
    expect(toggleBtnEl.getAttribute('aria-expanded')).toBe('false');
    expect(document.body.classList.contains('nav-open')).toBe(false);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test`
Expected: FAIL — `Failed to resolve import "./nav-toggle.js"` (the module does not exist yet).

- [ ] **Step 3: Write the implementation**

```js
// src/js/nav-toggle.js
export function toggleNav(navEl, toggleBtnEl) {
  const isOpen = navEl.classList.toggle('is-open');
  toggleBtnEl.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('nav-open', isOpen);
  return isOpen;
}

export function closeNav(navEl, toggleBtnEl) {
  navEl.classList.remove('is-open');
  toggleBtnEl.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('nav-open');
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm run test`
Expected: PASS — 3 tests passing.

- [ ] **Step 5: Wire it into `src/main.js`**

```js
import './styles/main.scss';
import { toggleNav, closeNav } from './js/nav-toggle.js';

const navLinks = document.getElementById('nav-links');
const navToggle = document.getElementById('nav-toggle');

navToggle.addEventListener('click', () => {
  toggleNav(navLinks, navToggle);
});

navLinks.querySelectorAll('.navbar__link').forEach((link) => {
  link.addEventListener('click', () => {
    closeNav(navLinks, navToggle);
  });
});
```

- [ ] **Step 6: Verify in the browser**

Run: `npm run dev`, resize the viewport below 768px.
Expected: clicking ☰ opens a full-screen overlay with the 5 links; clicking a link closes it again; the page does not scroll behind the open overlay.

- [ ] **Step 7: Commit**

```bash
git add src/js/nav-toggle.js src/js/nav-toggle.test.js src/main.js
git commit -m "FEAT : add mobile nav toggle with tests"
```

- [ ] **Merge into master**

```bash
git checkout master
git merge --no-ff feat-mobile-nav-toggle -m "Merge branch 'feat-mobile-nav-toggle'"
```

---

### Task 6: Hero section

**Branch:** `feat-hero-section`

**Files:**
- Create: `src/styles/_sections.scss`
- Modify: `src/styles/main.scss`
- Modify: `index.html:16` (the empty `<main></main>`)

**Interfaces:**
- Consumes: `.btn`, `.btn--primary`, `.btn--ghost`, `.section-label`, `.dots-pattern` from Task 3.
- Produces: `<section id="hero">` inside `<main>`, and `.hero__pattern` — the element Task 15 (parallax) will target.

- [ ] **Create the feature branch**

```bash
git checkout master
git checkout -b feat-hero-section
```

- [ ] **Step 1: Create `src/styles/_sections.scss` with the hero styles**

```scss
@use 'variables' as *;

.hero {
  position: relative;
  padding: 110px 32px;
  text-align: center;
  overflow: hidden;
}

.hero__pattern {
  position: absolute;
  inset: -20% 0 0 0;
  background-image: radial-gradient($dot-color 1px, transparent 1px);
  background-size: $dot-size $dot-size;
  pointer-events: none;
  will-change: transform;
}

.hero__content {
  position: relative;
  z-index: 1;
}

.hero__name {
  font-size: 46px;
  margin: 6px 0 14px;
}

.hero__tagline {
  color: $color-text-muted;
  max-width: 420px;
  margin: 0 auto 26px;
  font-size: 15px;
}

.hero__actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}
```

- [ ] **Step 2: Update `src/styles/main.scss`**

```scss
@use 'variables';
@use 'base';
@use 'navbar';
@use 'sections';
```

- [ ] **Step 3: Fill in `<main>` in `index.html`**

Replace:

```html
    <main></main>
```

With:

```html
    <main>
      <section id="hero" class="hero reveal">
        <div class="hero__pattern" aria-hidden="true"></div>
        <div class="hero__content">
          <p class="section-label">Développeur Web</p>
          <h1 class="hero__name">Prénom Nom</h1>
          <p class="hero__tagline">Je conçois des interfaces sobres, rapides et soignées, du design à l'implémentation.</p>
          <div class="hero__actions">
            <a href="#projects" class="btn btn--primary">Voir mes projets</a>
            <a href="#contact" class="btn btn--ghost">Me contacter</a>
          </div>
        </div>
      </section>
    </main>
```

- [ ] **Step 4: Verify in the browser**

Run: `npm run dev`.
Expected: full-height hero with a subtle bourgogne dotted background, italic Fraunces name, and two buttons (filled bourgogne + outlined).

- [ ] **Step 5: Commit**

```bash
git add src/styles/_sections.scss src/styles/main.scss index.html
git commit -m "FEAT : add hero section"
```

- [ ] **Merge into master**

```bash
git checkout master
git merge --no-ff feat-hero-section -m "Merge branch 'feat-hero-section'"
```

---

### Task 7: À propos section

**Branch:** `feat-about-section`

**Files:**
- Modify: `src/styles/_sections.scss`
- Modify: `index.html` (inside `<main>`, after the hero section)

**Interfaces:**
- Consumes: `.section-label`, `.section-title` from Task 3.
- Produces: `<section id="about">` — consumed by Task 13 (scroll-spy) and Task 14 (reveal) via its `id` and `.reveal` class.

- [ ] **Create the feature branch**

```bash
git checkout master
git checkout -b feat-about-section
```

- [ ] **Step 1: Append the about styles to `src/styles/_sections.scss`**

```scss
.about {
  padding: $section-padding;

  @media (max-width: $breakpoint-mobile) {
    padding: $section-padding-mobile;
  }
}

.about__grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 40px;
  align-items: start;

  @media (max-width: $breakpoint-mobile) {
    grid-template-columns: 1fr;
  }
}

.about__text {
  color: $color-text-muted;
  font-size: 14px;
  line-height: 1.7;
}

.about__stats {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.stat {
  border: 1px solid $color-border;
  border-radius: 6px;
  padding: 16px 18px;
  background: $color-panel;
}

.stat__value {
  display: block;
  font-family: $font-heading;
  font-style: italic;
  font-size: 22px;
}

.stat__label {
  font-size: 12px;
  color: $color-secondary;
}
```

- [ ] **Step 2: Add the about markup to `index.html`, right after `</section>` that closes `#hero`**

```html
      <section id="about" class="about reveal">
        <p class="section-label">01</p>
        <h2 class="section-title">À propos</h2>
        <div class="about__grid">
          <p class="about__text">
            Développeur web passionné par la création d'interfaces claires et performantes. J'aime transformer des idées en produits concrets, en accordant une attention particulière aux détails, à l'accessibilité et à la qualité du code.
          </p>
          <div class="about__stats">
            <div class="stat">
              <span class="stat__value">3+</span>
              <span class="stat__label">ans d'expérience</span>
            </div>
            <div class="stat">
              <span class="stat__value">12</span>
              <span class="stat__label">projets réalisés</span>
            </div>
          </div>
        </div>
      </section>
```

- [ ] **Step 3: Verify in the browser**

Run: `npm run dev`.
Expected: two-column section (text + 2 stat cards) below the hero; collapses to a single column below 768px.

- [ ] **Step 4: Commit**

```bash
git add src/styles/_sections.scss index.html
git commit -m "FEAT : add about section"
```

- [ ] **Merge into master**

```bash
git checkout master
git merge --no-ff feat-about-section -m "Merge branch 'feat-about-section'"
```

---

### Task 8: Compétences section

**Branch:** `feat-skills-section`

**Files:**
- Modify: `src/styles/_sections.scss`
- Modify: `index.html` (inside `<main>`, after the about section)

**Interfaces:**
- Consumes: `.section-label`, `.section-title` from Task 3.
- Produces: `<section id="skills">` — consumed by Task 13 and Task 14 via its `id` and `.reveal` class.

- [ ] **Create the feature branch**

```bash
git checkout master
git checkout -b feat-skills-section
```

- [ ] **Step 1: Append the skills styles to `src/styles/_sections.scss`**

```scss
.skills {
  padding: $section-padding;
  background: $color-bg-alt;

  @media (max-width: $breakpoint-mobile) {
    padding: $section-padding-mobile;
  }
}

.skills__groups {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;

  @media (max-width: $breakpoint-mobile) {
    grid-template-columns: 1fr;
  }
}

.skill-group__title {
  font-family: $font-body;
  font-style: normal;
  font-weight: 600;
  font-size: 12.5px;
  letter-spacing: 1px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.skill-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;

  &--mastered { background: $color-primary; }
  &--intermediate { background: $color-secondary; }
  &--learning { background: rgba($color-text, 0.35); }
}

.skill-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-badge {
  font-size: 12.5px;
  padding: 7px 13px;
  border-radius: 20px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &--mastered {
    background: $color-primary;
    color: $color-text;
  }

  &--intermediate {
    background: transparent;
    border: 1px solid $color-secondary;
    color: $color-text;
  }

  &--learning {
    background: transparent;
    border: 1px dashed rgba($color-text, 0.35);
    color: $color-text-muted;
  }
}
```

- [ ] **Step 2: Add the skills markup to `index.html`, right after `</section>` that closes `#about`**

```html
      <section id="skills" class="skills reveal">
        <p class="section-label">02</p>
        <h2 class="section-title">Compétences</h2>
        <div class="skills__groups">
          <div class="skill-group">
            <h3 class="skill-group__title"><span class="skill-dot skill-dot--mastered"></span>Maîtrisé</h3>
            <div class="skill-badges">
              <span class="skill-badge skill-badge--mastered">HTML</span>
              <span class="skill-badge skill-badge--mastered">CSS</span>
              <span class="skill-badge skill-badge--mastered">JavaScript</span>
              <span class="skill-badge skill-badge--mastered">Git</span>
            </div>
          </div>
          <div class="skill-group">
            <h3 class="skill-group__title"><span class="skill-dot skill-dot--intermediate"></span>Intermédiaire</h3>
            <div class="skill-badges">
              <span class="skill-badge skill-badge--intermediate">React</span>
              <span class="skill-badge skill-badge--intermediate">Node.js</span>
              <span class="skill-badge skill-badge--intermediate">Figma</span>
            </div>
          </div>
          <div class="skill-group">
            <h3 class="skill-group__title"><span class="skill-dot skill-dot--learning"></span>En perfectionnement</h3>
            <div class="skill-badges">
              <span class="skill-badge skill-badge--learning">TypeScript</span>
              <span class="skill-badge skill-badge--learning">Next.js</span>
            </div>
          </div>
        </div>
      </section>
```

- [ ] **Step 3: Verify in the browser**

Run: `npm run dev`.
Expected: 3-column skills section (slightly lighter background) — filled badges, outlined badges, dashed badges; collapses to 1 column below 768px.

- [ ] **Step 4: Commit**

```bash
git add src/styles/_sections.scss index.html
git commit -m "FEAT : add skills section with 3 mastery categories"
```

- [ ] **Merge into master**

```bash
git checkout master
git merge --no-ff feat-skills-section -m "Merge branch 'feat-skills-section'"
```

---

### Task 9: Expériences section

**Branch:** `feat-experience-section`

**Files:**
- Modify: `src/styles/_sections.scss`
- Modify: `index.html` (inside `<main>`, after the skills section)

**Interfaces:**
- Consumes: `.section-label`, `.section-title` from Task 3.
- Produces: `<section id="experience">` — consumed by Task 13 and Task 14 via its `id` and `.reveal` class.

- [ ] **Create the feature branch**

```bash
git checkout master
git checkout -b feat-experience-section
```

- [ ] **Step 1: Append the timeline styles to `src/styles/_sections.scss`**

```scss
.experience {
  padding: $section-padding;

  @media (max-width: $breakpoint-mobile) {
    padding: $section-padding-mobile;
  }
}

.timeline {
  position: relative;
  padding-left: 28px;

  &::before {
    content: '';
    position: absolute;
    left: 5px;
    top: 6px;
    bottom: 6px;
    width: 1px;
    background: $color-border;
  }
}

.timeline__item {
  position: relative;
  margin-bottom: 32px;

  &::before {
    content: '';
    position: absolute;
    left: -28px;
    top: 4px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: $color-primary;
    border: 2px solid $color-bg;
  }

  &:last-child {
    margin-bottom: 0;
  }
}

.timeline__date {
  font-size: 11px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: $color-secondary;
  margin-bottom: 4px;
}

.timeline__title {
  font-size: 17px;
  margin-bottom: 4px;
}

.timeline__desc {
  font-size: 13px;
  color: $color-text-muted;
  max-width: 480px;
}
```

- [ ] **Step 2: Add the experience markup to `index.html`, right after `</section>` that closes `#skills`**

```html
      <section id="experience" class="experience reveal">
        <p class="section-label">03</p>
        <h2 class="section-title">Expériences</h2>
        <div class="timeline">
          <div class="timeline__item">
            <p class="timeline__date">2024 — Aujourd'hui</p>
            <h3 class="timeline__title">Développeur Web · Entreprise</h3>
            <p class="timeline__desc">Description courte du poste et des réalisations. Contenu provisoire à remplacer.</p>
          </div>
          <div class="timeline__item">
            <p class="timeline__date">2022 — 2024</p>
            <h3 class="timeline__title">Développeur Front-End · Entreprise</h3>
            <p class="timeline__desc">Description courte du poste et des réalisations. Contenu provisoire à remplacer.</p>
          </div>
          <div class="timeline__item">
            <p class="timeline__date">2021 — 2022</p>
            <h3 class="timeline__title">Stage · Entreprise</h3>
            <p class="timeline__desc">Description courte du poste et des réalisations. Contenu provisoire à remplacer.</p>
          </div>
        </div>
      </section>
```

- [ ] **Step 3: Verify in the browser**

Run: `npm run dev`.
Expected: vertical line with 3 bourgogne dots, each with a date, a title, and a short description.

- [ ] **Step 4: Commit**

```bash
git add src/styles/_sections.scss index.html
git commit -m "FEAT : add experience timeline section"
```

- [ ] **Merge into master**

```bash
git checkout master
git merge --no-ff feat-experience-section -m "Merge branch 'feat-experience-section'"
```

---

### Task 10: Projets section

**Branch:** `feat-projects-section`

**Files:**
- Modify: `src/styles/_sections.scss`
- Modify: `index.html` (inside `<main>`, after the experience section)

**Interfaces:**
- Consumes: `.section-label`, `.section-title`, `.dots-pattern` from Task 3.
- Produces: `<section id="projects">` — consumed by Task 13 and Task 14 via its `id` and `.reveal` class.

- [ ] **Create the feature branch**

```bash
git checkout master
git checkout -b feat-projects-section
```

- [ ] **Step 1: Append the project grid styles to `src/styles/_sections.scss`**

```scss
.projects {
  padding: $section-padding;
  background: $color-bg-alt;

  @media (max-width: $breakpoint-mobile) {
    padding: $section-padding-mobile;
  }
}

.projects__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;

  @media (max-width: $breakpoint-mobile) {
    grid-template-columns: 1fr;
  }
}

.project-card {
  background: $color-panel;
  border: 1px solid $color-border;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: $color-primary;
  }
}

.project-card__thumb {
  height: 120px;
  background-color: $color-bg;
}

.project-card__body {
  padding: 16px 18px;
}

.project-card__title {
  font-size: 16px;
  margin-bottom: 6px;
}

.project-card__desc {
  font-size: 12.5px;
  color: $color-text-muted;
  margin-bottom: 10px;
}

.project-card__tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.tag {
  font-size: 10.5px;
  background: rgba($color-secondary, 0.12);
  color: $color-secondary;
  padding: 3px 8px;
  border-radius: 20px;
}
```

- [ ] **Step 2: Add the projects markup to `index.html`, right after `</section>` that closes `#experience`**

```html
      <section id="projects" class="projects reveal">
        <p class="section-label">04</p>
        <h2 class="section-title">Projets</h2>
        <div class="projects__grid">
          <article class="project-card">
            <div class="project-card__thumb dots-pattern" aria-hidden="true"></div>
            <div class="project-card__body">
              <h3 class="project-card__title">Projet Un</h3>
              <p class="project-card__desc">Courte description du projet et de son objectif.</p>
              <div class="project-card__tags"><span class="tag">React</span><span class="tag">Node.js</span></div>
            </div>
          </article>
          <article class="project-card">
            <div class="project-card__thumb dots-pattern" aria-hidden="true"></div>
            <div class="project-card__body">
              <h3 class="project-card__title">Projet Deux</h3>
              <p class="project-card__desc">Courte description du projet et de son objectif.</p>
              <div class="project-card__tags"><span class="tag">Vanilla JS</span><span class="tag">CSS</span></div>
            </div>
          </article>
          <article class="project-card">
            <div class="project-card__thumb dots-pattern" aria-hidden="true"></div>
            <div class="project-card__body">
              <h3 class="project-card__title">Projet Trois</h3>
              <p class="project-card__desc">Courte description du projet et de son objectif.</p>
              <div class="project-card__tags"><span class="tag">API</span><span class="tag">Figma</span></div>
            </div>
          </article>
          <article class="project-card">
            <div class="project-card__thumb dots-pattern" aria-hidden="true"></div>
            <div class="project-card__body">
              <h3 class="project-card__title">Projet Quatre</h3>
              <p class="project-card__desc">Courte description du projet et de son objectif.</p>
              <div class="project-card__tags"><span class="tag">React</span><span class="tag">Tailwind</span></div>
            </div>
          </article>
        </div>
      </section>
```

- [ ] **Step 3: Verify in the browser**

Run: `npm run dev`.
Expected: 2×2 grid of project cards (dotted-pattern thumbnail, title, description, tag chips), hovering lifts the card and highlights its border; collapses to a single column below 768px.

- [ ] **Step 4: Commit**

```bash
git add src/styles/_sections.scss index.html
git commit -m "FEAT : add 2x2 projects grid section"
```

- [ ] **Merge into master**

```bash
git checkout master
git merge --no-ff feat-projects-section -m "Merge branch 'feat-projects-section'"
```

---

### Task 11: Contact section + copy-to-clipboard (TDD)

**Branch:** `feat-contact-section`

**Files:**
- Modify: `src/styles/_sections.scss`
- Modify: `index.html` (inside `<main>`, after the projects section)
- Create: `src/js/copy-email.js`
- Create: `src/js/copy-email.test.js`
- Modify: `src/main.js`

**Interfaces:**
- Consumes: `.section-label`, `.section-title`, `.dots-pattern` from Task 3.
- Produces: `<section id="contact">` (consumed by Task 13/14) and `copyEmail(email, clipboard?): Promise<void>`, `showCopiedFeedback(textEl, boxEl, duration?): void`, exported from `src/js/copy-email.js`.

- [ ] **Create the feature branch**

```bash
git checkout master
git checkout -b feat-contact-section
```

- [ ] **Step 1: Write the failing tests**

```js
// src/js/copy-email.test.js
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { copyEmail, showCopiedFeedback } from './copy-email.js';

describe('copyEmail', () => {
  it('writes the email to the given clipboard', async () => {
    const clipboard = { writeText: vi.fn().mockResolvedValue(undefined) };

    await copyEmail('prenom.nom@email.com', clipboard);

    expect(clipboard.writeText).toHaveBeenCalledWith('prenom.nom@email.com');
  });
});

describe('showCopiedFeedback', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows "Copié !" then restores the original text after the duration', () => {
    const textEl = document.createElement('span');
    textEl.textContent = 'prenom.nom@email.com';
    const boxEl = document.createElement('button');

    showCopiedFeedback(textEl, boxEl, 2000);

    expect(textEl.textContent).toBe('Copié !');
    expect(boxEl.classList.contains('is-copied')).toBe(true);

    vi.advanceTimersByTime(2000);

    expect(textEl.textContent).toBe('prenom.nom@email.com');
    expect(boxEl.classList.contains('is-copied')).toBe(false);
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm run test`
Expected: FAIL — `Failed to resolve import "./copy-email.js"`.

- [ ] **Step 3: Write the implementation**

```js
// src/js/copy-email.js
export async function copyEmail(email, clipboard = navigator.clipboard) {
  await clipboard.writeText(email);
}

export function showCopiedFeedback(textEl, boxEl, duration = 2000) {
  const original = textEl.dataset.original || textEl.textContent;
  textEl.dataset.original = original;
  textEl.textContent = 'Copié !';
  boxEl.classList.add('is-copied');

  setTimeout(() => {
    textEl.textContent = original;
    boxEl.classList.remove('is-copied');
  }, duration);
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm run test`
Expected: PASS — 2 tests passing (plus the earlier suites, still green).

- [ ] **Step 5: Append the contact styles to `src/styles/_sections.scss`**

```scss
.contact {
  padding: $section-padding;
  text-align: center;

  @media (max-width: $breakpoint-mobile) {
    padding: $section-padding-mobile;
  }
}

.contact__intro {
  color: $color-text-muted;
  font-size: 14px;
  max-width: 420px;
  margin: 0 auto 20px;
}

.email-box {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: $color-panel;
  border: 1px solid $color-border;
  color: $color-text;
  padding: 12px 20px;
  border-radius: 6px;
  font-size: 14px;
  margin-bottom: 12px;
  transition: border-color 0.2s ease;

  &:hover,
  &.is-copied {
    border-color: $color-primary;
  }
}

.email-box__hint {
  color: $color-secondary;
  font-size: 12px;
}

.contact__mailto-fallback {
  display: block;
  font-size: 12px;
  color: $color-text-muted;
  margin-bottom: 24px;

  &:hover {
    color: $color-text;
  }
}

.social-links {
  display: flex;
  gap: 16px;
  justify-content: center;
  font-size: 13px;
  color: $color-text-muted;
}

.social-link {
  transition: color 0.2s ease;

  &:hover {
    color: $color-text;
  }
}
```

- [ ] **Step 6: Add the contact markup to `index.html`, right after `</section>` that closes `#projects`**

```html
      <section id="contact" class="contact dots-pattern reveal">
        <p class="section-label">05</p>
        <h2 class="section-title">Contact</h2>
        <p class="contact__intro">Une idée de projet, une opportunité ? N'hésite pas à me contacter.</p>
        <button class="email-box" id="email-box" type="button" data-email="prenom.nom@email.com">
          <span id="email-text">prenom.nom@email.com</span>
          <span class="email-box__hint">⧉ copier</span>
        </button>
        <a href="mailto:prenom.nom@email.com" class="contact__mailto-fallback">Ou écrire un email directement</a>
        <div class="social-links">
          <a href="https://linkedin.com/in/PLACEHOLDER" target="_blank" rel="noopener noreferrer" class="social-link">LinkedIn</a>
          <a href="https://github.com/PLACEHOLDER" target="_blank" rel="noopener noreferrer" class="social-link">GitHub</a>
        </div>
      </section>
```

- [ ] **Step 7: Wire it into `src/main.js`**

```js
import { copyEmail, showCopiedFeedback } from './js/copy-email.js';

const emailBox = document.getElementById('email-box');
const emailText = document.getElementById('email-text');

emailBox.addEventListener('click', () => {
  const email = emailBox.dataset.email;
  copyEmail(email).then(() => {
    showCopiedFeedback(emailText, emailBox);
  });
});
```

- [ ] **Step 8: Verify in the browser**

Run: `npm run dev`, click the email box.
Expected: text switches to "Copié !" for 2 seconds then reverts, the box border highlights, and the email is on the system clipboard (paste to confirm).

- [ ] **Step 9: Commit**

```bash
git add src/styles/_sections.scss index.html src/js/copy-email.js src/js/copy-email.test.js src/main.js
git commit -m "FEAT : add contact section with click-to-copy email"
```

- [ ] **Merge into master**

```bash
git checkout master
git merge --no-ff feat-contact-section -m "Merge branch 'feat-contact-section'"
```

---

### Task 12: Footer

**Branch:** `feat-footer`

**Files:**
- Modify: `src/styles/_sections.scss`
- Modify: `index.html:17` (the empty `<footer class="footer"></footer>`)

**Interfaces:**
- None (leaf task, no later task depends on the footer).

- [ ] **Create the feature branch**

```bash
git checkout master
git checkout -b feat-footer
```

- [ ] **Step 1: Append the footer style to `src/styles/_sections.scss`**

```scss
.footer {
  text-align: center;
  padding: 24px;
  font-size: 11.5px;
  color: rgba($color-text, 0.5);
  border-top: 1px solid $color-border;
}
```

- [ ] **Step 2: Fill in the footer markup in `index.html`**

Replace:

```html
    <footer class="footer"></footer>
```

With:

```html
    <footer class="footer">
      <p>© 2026 Prénom Nom — Tous droits réservés</p>
    </footer>
```

- [ ] **Step 3: Verify in the browser**

Run: `npm run dev`, scroll to the bottom.
Expected: small centered copyright line, separated from the contact section by a thin border.

- [ ] **Step 4: Commit**

```bash
git add src/styles/_sections.scss index.html
git commit -m "FEAT : add footer"
```

- [ ] **Merge into master**

```bash
git checkout master
git merge --no-ff feat-footer -m "Merge branch 'feat-footer'"
```

---

### Task 13: Scroll-spy — active nav link (TDD)

**Branch:** `feat-scroll-spy`

**Files:**
- Create: `src/js/scroll-spy.js`
- Create: `src/js/scroll-spy.test.js`
- Modify: `src/main.js`

**Interfaces:**
- Consumes: every `<section id="...">` inside `<main>` (Tasks 6–11) and every `.navbar__link` (Task 4).
- Produces: `getActiveSectionId(sections, scrollY, offset?): string | null`, exported from `src/js/scroll-spy.js`.

- [ ] **Create the feature branch**

```bash
git checkout master
git checkout -b feat-scroll-spy
```

- [ ] **Step 1: Write the failing test**

```js
// src/js/scroll-spy.test.js
import { describe, it, expect } from 'vitest';
import { getActiveSectionId } from './scroll-spy.js';

describe('getActiveSectionId', () => {
  const sections = [
    { id: 'hero', offsetTop: 0 },
    { id: 'about', offsetTop: 500 },
    { id: 'skills', offsetTop: 1200 },
  ];

  it('returns null when scroll is above every section (accounting for offset)', () => {
    expect(getActiveSectionId(sections, 0, 90)).toBe(null);
  });

  it('returns the first section once scrolled past its offset-adjusted top', () => {
    expect(getActiveSectionId(sections, 100, 90)).toBe('hero');
  });

  it('returns the last section whose top has been passed', () => {
    expect(getActiveSectionId(sections, 600, 90)).toBe('about');
  });

  it('returns the final section when scrolled past all of them', () => {
    expect(getActiveSectionId(sections, 2000, 90)).toBe('skills');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test`
Expected: FAIL — `Failed to resolve import "./scroll-spy.js"`.

- [ ] **Step 3: Write the implementation**

```js
// src/js/scroll-spy.js
export function getActiveSectionId(sections, scrollY, offset = 0) {
  let activeId = null;

  for (const section of sections) {
    if (section.offsetTop - offset <= scrollY) {
      activeId = section.id;
    }
  }

  return activeId;
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm run test`
Expected: PASS — 4 tests passing (plus earlier suites, still green).

- [ ] **Step 5: Wire it into `src/main.js`**

```js
import { getActiveSectionId } from './js/scroll-spy.js';

const sections = Array.from(document.querySelectorAll('main section[id]'));
const navAnchors = Array.from(document.querySelectorAll('.navbar__link'));
const NAV_OFFSET = 90;

function updateActiveLink() {
  const activeId = getActiveSectionId(sections, window.scrollY, NAV_OFFSET);
  navAnchors.forEach((anchor) => {
    anchor.classList.toggle('is-active', anchor.getAttribute('href') === `#${activeId}`);
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();
```

- [ ] **Step 6: Verify in the browser**

Run: `npm run dev`, scroll through the page.
Expected: the navbar link matching the section currently in view is highlighted (`#F3E9E7`), and clicking a link smooth-scrolls to it (via the `scroll-behavior: smooth` set in Task 3) and lands below the sticky navbar (via `scroll-margin-top`).

- [ ] **Step 7: Commit**

```bash
git add src/js/scroll-spy.js src/js/scroll-spy.test.js src/main.js
git commit -m "FEAT : highlight active nav link on scroll"
```

- [ ] **Merge into master**

```bash
git checkout master
git merge --no-ff feat-scroll-spy -m "Merge branch 'feat-scroll-spy'"
```

---

### Task 14: Reveal-on-scroll animation (TDD)

**Branch:** `feat-reveal-on-scroll`

**Files:**
- Create: `src/js/reveal-on-scroll.js`
- Create: `src/js/reveal-on-scroll.test.js`
- Modify: `src/main.js`

**Interfaces:**
- Consumes: every element with the `.reveal` class (added to each section in Tasks 6–11).
- Produces: `handleReveal(entries): void` and `initRevealObserver(targets, options?): IntersectionObserver`, exported from `src/js/reveal-on-scroll.js`.

- [ ] **Create the feature branch**

```bash
git checkout master
git checkout -b feat-reveal-on-scroll
```

- [ ] **Step 1: Write the failing test**

```js
// src/js/reveal-on-scroll.test.js
import { describe, it, expect, vi } from 'vitest';
import { handleReveal } from './reveal-on-scroll.js';

function makeEntry(isIntersecting) {
  return {
    isIntersecting,
    target: { classList: { add: vi.fn() } },
  };
}

describe('handleReveal', () => {
  it('adds "is-visible" only to intersecting entries', () => {
    const visible = makeEntry(true);
    const hidden = makeEntry(false);

    handleReveal([visible, hidden]);

    expect(visible.target.classList.add).toHaveBeenCalledWith('is-visible');
    expect(hidden.target.classList.add).not.toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test`
Expected: FAIL — `Failed to resolve import "./reveal-on-scroll.js"`.

- [ ] **Step 3: Write the implementation**

```js
// src/js/reveal-on-scroll.js
export function handleReveal(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}

export function initRevealObserver(targets, options = { threshold: 0.15 }) {
  const observer = new IntersectionObserver(handleReveal, options);
  targets.forEach((el) => observer.observe(el));
  return observer;
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm run test`
Expected: PASS — 1 test passing (plus earlier suites, still green).

- [ ] **Step 5: Wire it into `src/main.js`**

```js
import { initRevealObserver } from './js/reveal-on-scroll.js';

const revealTargets = Array.from(document.querySelectorAll('.reveal'));
initRevealObserver(revealTargets);
```

- [ ] **Step 6: Verify in the browser**

Run: `npm run dev`, scroll slowly through the page.
Expected: each section fades in and shifts up slightly (per the `.reveal` / `.reveal.is-visible` styles from Task 3) the first time it enters the viewport; the hero fades in immediately on load since it starts in view.

- [ ] **Step 7: Commit**

```bash
git add src/js/reveal-on-scroll.js src/js/reveal-on-scroll.test.js src/main.js
git commit -m "FEAT : add reveal-on-scroll animation for sections"
```

- [ ] **Merge into master**

```bash
git checkout master
git merge --no-ff feat-reveal-on-scroll -m "Merge branch 'feat-reveal-on-scroll'"
```

---

### Task 15: Hero parallax (TDD)

**Branch:** `feat-hero-parallax`

**Files:**
- Create: `src/js/parallax.js`
- Create: `src/js/parallax.test.js`
- Modify: `src/main.js`

**Interfaces:**
- Consumes: `.hero__pattern` element from Task 6.
- Produces: `computeParallaxOffset(scrollY, factor?): number` and `initParallax(el, factor?): () => void`, exported from `src/js/parallax.js`.

- [ ] **Create the feature branch**

```bash
git checkout master
git checkout -b feat-hero-parallax
```

- [ ] **Step 1: Write the failing test**

```js
// src/js/parallax.test.js
import { describe, it, expect } from 'vitest';
import { computeParallaxOffset } from './parallax.js';

describe('computeParallaxOffset', () => {
  it('scales scrollY by the given factor', () => {
    expect(computeParallaxOffset(100, 0.3)).toBeCloseTo(30);
  });

  it('defaults to a factor of 0.3', () => {
    expect(computeParallaxOffset(200)).toBeCloseTo(60);
  });

  it('returns 0 for a scrollY of 0', () => {
    expect(computeParallaxOffset(0, 0.5)).toBe(0);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test`
Expected: FAIL — `Failed to resolve import "./parallax.js"`.

- [ ] **Step 3: Write the implementation**

```js
// src/js/parallax.js
export function computeParallaxOffset(scrollY, factor = 0.3) {
  return scrollY * factor;
}

export function initParallax(el, factor = 0.3) {
  function onScroll() {
    el.style.transform = `translateY(${computeParallaxOffset(window.scrollY, factor)}px)`;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  return onScroll;
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm run test`
Expected: PASS — 3 tests passing (plus earlier suites, still green).

- [ ] **Step 5: Wire it into `src/main.js`**

```js
import { initParallax } from './js/parallax.js';

const heroPattern = document.querySelector('.hero__pattern');
if (heroPattern) {
  initParallax(heroPattern, 0.3);
}
```

- [ ] **Step 6: Verify in the browser**

Run: `npm run dev`, scroll past the hero.
Expected: the dotted pattern behind the hero text moves down slightly slower than the page content as you scroll (subtle, not distracting).

- [ ] **Step 7: Commit**

```bash
git add src/js/parallax.js src/js/parallax.test.js src/main.js
git commit -m "FEAT : add subtle parallax to hero pattern"
```

- [ ] **Merge into master**

```bash
git checkout master
git merge --no-ff feat-hero-parallax -m "Merge branch 'feat-hero-parallax'"
```

---

### Task 16: Final build check, responsive pass, and README

**Branch:** `config-final-build-readme`

**Files:**
- Create: `README.md`

**Interfaces:**
- None (final verification task).

- [ ] **Create the feature branch**

```bash
git checkout master
git checkout -b config-final-build-readme
```

- [ ] **Step 1: Run the full test suite**

Run: `npm run test`
Expected: PASS — all suites from Tasks 5, 11, 13, 14, 15 green (13 tests total).

- [ ] **Step 2: Run a production build**

Run: `npm run build`
Expected: `✓ built in <time>`, `dist/index.html` and hashed CSS/JS assets present in `dist/assets/`.

- [ ] **Step 3: Preview the production build**

Run: `npm run preview`, open the printed URL.
Expected: page matches the dev version — dark background, fonts, navbar, all 6 sections, animations.

- [ ] **Step 4: Manual responsive pass**

Using the browser's device toolbar, check at 375px (mobile), 768px (breakpoint edge) and 1280px (desktop):
- Navbar: hamburger menu appears and works below 768px; inline links above.
- About stats, skills groups, and the projects grid collapse to a single column below 768px.
- No horizontal scrollbar at any width.
- Email copy, active-link highlighting, and reveal animations still work at every width.

- [ ] **Step 5: Create `README.md`**

```markdown
# Portfolio

Landing page one-page pour présenter un profil de développeur web (À propos, Compétences, Expériences, Projets, Contact).

## Stack

Vite + HTML/JavaScript vanilla + SCSS. Aucun framework, aucun backend.

## Développement

\`\`\`bash
npm install
npm run dev
\`\`\`

## Build de production

\`\`\`bash
npm run build
npm run preview
\`\`\`

## Tests

\`\`\`bash
npm run test
\`\`\`

## Contenu

Le contenu (texte, expériences, projets, liens sociaux, email) est provisoire — à remplacer dans `index.html` avant mise en ligne.

## Déploiement

Pressenti : Vercel (non figé). Le site est un build statique, déployable sur n'importe quelle plateforme d'hébergement statique.
```

- [ ] **Step 6: Commit**

```bash
git add README.md
git commit -m "CONFIG : add project README"
```

- [ ] **Merge into master**

```bash
git checkout master
git merge --no-ff config-final-build-readme -m "Merge branch 'config-final-build-readme'"
```
