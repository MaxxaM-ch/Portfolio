# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Un fichier `CLAUDE.local.md` (non versionné) complète celui-ci avec des conventions personnelles (workflow Git, préférences de collaboration) — à lire aussi si présent.

## Project overview

Portfolio one-page (landing page) pour Maxime Prioleau, développeur web. Site statique, sans backend, sans framework JS. Toutes les sections utilisent du contenu réel sauf **Projets**, encore en placeholder (4 cartes génériques "Projet Un" à "Projet Quatre").

Sections de la page, dans l'ordre : Hero · À propos · Compétences · Expériences · Projets · Parcours scolaire · Contact · Footer.

## Commands

```bash
npm install       # installer les dépendances
npm run dev       # serveur de dev (Vite)
npm run build     # build de production
npm run preview   # prévisualiser le build
npm run test      # tests unitaires (Vitest)
```

Pour lancer un seul fichier de test : `npm run test -- <nom-du-fichier>` (ex: `npm run test -- scroll-spy`).

## Stack

Vite + HTML/JavaScript vanilla (ES modules) + SCSS. Aucun framework, aucun backend.

## Architecture

```
index.html                  # toute la page, une seule vue (pas de routing)
src/
  main.js                   # point d'entrée — importe le SCSS, monte les sections generees (mount()), puis câble chaque module JS au DOM
  data/
    <nom>.js                 # donnees pures d'une section repetitive (experiences, education, projects, skills)
  styles/
    main.scss               # @use les partials ci-dessous, dans l'ordre
    _variables.scss          # tokens : couleurs, typographies, tailles de police/spacing (rem), breakpoint, largeur de contenu
    _mixins.scss              # section-padding, glass-card($radius), btn-fill-hover — mutualisent les blocs CSS repetes entre sections
    _base.scss                # reset (inclut *::before/*::after), styles globaux, classes utilitaires (.reveal, .dots-pattern, .btn…)
    _navbar.scss              # navbar + menu mobile
    sections/
      _hero.scss               # une partial par section, dans l'ordre de la page
      _about.scss
      _skills.scss
      _experience.scss
      _projects.scss
      _education.scss
      _contact.scss
      _footer.scss
  js/
    <nom>.js                  # un module par comportement interactif
    render-<nom>.js           # fonctions pures qui transforment les donnees de src/data/ en HTML (Timeline, Education, Projects, Skills)
    test/
      <nom>.test.js            # test Vitest correspondant (import relatif `../<nom>.js`)
```

**Modules JS actuels** (chacun exporte des fonctions pures testées séparément de leur câblage DOM) :
- `nav-toggle.js` — ouverture/fermeture du menu mobile
- `scroll-spy.js` — lien de nav actif selon la section visible
- `reveal-on-scroll.js` — animation d'apparition au scroll (IntersectionObserver)
- `parallax.js` — parallaxe légère du motif du hero au scroll
- `hero-dots-wave.js` — génère la grille de points animés du fond du hero (placement aléatoire, tailles/vitesses variables, scintillement, vague)
- `cursor-trail.js` — traînée d'étoiles filantes qui suit le curseur dans le hero
- `card-glare.js` — halo lumineux qui suit le curseur sur les cartes en glassmorphism
- `copy-email.js` — copie de l'email/téléphone dans le presse-papier avec feedback visuel (toast)
- `back-to-top.js` — affichage en fondu du bouton "retour en haut" une fois la section Contact atteinte (IntersectionObserver)
- `render-timeline.js`, `render-education.js`, `render-projects.js`, `render-skills.js` — génèrent le HTML des cartes/badges à partir de `src/data/*.js`, montés dans `main.js` via un helper `mount(id, render, data)`

Convention : toute logique non triviale est extraite en fonction pure exportée et testée (ex: `computeWaveDelay`, `pickTier`, `getActiveSectionId`, `renderTimelineItem`) ; le câblage DOM lui-même (event listeners, `querySelector`, `mount()`) n'est généralement pas testé unitairement.

## Design tokens (source : `src/styles/_variables.scss`)

- Fond principal `#150F10` · fond alterné `#181112` · panneau `#1D1516`
- Primaire (bourgogne) `#7A1F2B` · secondaire `#C98B8B` · texte `#F3E9E7` (blanc chaud, jamais de blanc pur) · texte atténué `#D8C9C7`
- Typographie : **Fraunces** (italique) pour les titres, **Manrope** pour le texte courant
- Largeur de contenu max `1100px`, centrée avec un padding latéral fluide (`max(32px, ...)`) — pas de wrapper HTML dédié, c'est géré par `$section-padding`
- Breakpoint mobile : `768px`
- Effet "glassmorphism" réutilisé sur plusieurs cartes (`.stat`, `.timeline-card`, `.education-card`, `.back-to-top`) via le mixin `glass-card($radius)` (`_mixins.scss`) : fond translucide + `backdrop-filter: blur()` + ombres internes + liseré du haut + halo qui suit le curseur (`card-glare.js`)

## Documents de référence

- `docs/superpowers/specs/2026-08-17-portfolio-landing-page-design.md` — brief de design initial (partiellement dépassé : pas de section Parcours scolaire, contenu 100% provisoire à l'origine)
- `docs/superpowers/plans/2026-08-21-portfolio-landing-page.md` — plan d'implémentation initial (16 tâches), utile pour l'historique de construction mais pas pour l'état actuel
