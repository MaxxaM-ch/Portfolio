# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
  main.js                   # point d'entrée — importe le SCSS puis câble chaque module JS au DOM
  styles/
    main.scss               # @use les partials ci-dessous, dans l'ordre
    _variables.scss          # tokens : couleurs, typographies, breakpoint, largeur de contenu
    _base.scss                # reset (inclut *::before/*::after), styles globaux, classes utilitaires (.reveal, .dots-pattern, .btn…)
    _navbar.scss              # navbar + menu mobile
    _sections.scss            # tout le reste : hero, à propos, compétences, expériences, projets, parcours scolaire, contact, footer
  js/
    <nom>.js + <nom>.test.js  # un module par comportement interactif, testé avec Vitest
```

**Modules JS actuels** (chacun exporte des fonctions pures testées séparément de leur câblage DOM) :
- `nav-toggle.js` — ouverture/fermeture du menu mobile
- `scroll-spy.js` — lien de nav actif selon la section visible
- `reveal-on-scroll.js` — animation d'apparition au scroll (IntersectionObserver)
- `parallax.js` — parallaxe légère du motif du hero au scroll
- `hero-dots-wave.js` — génère la grille de points animés du fond du hero (placement aléatoire, tailles/vitesses variables, scintillement, vague)
- `cursor-trail.js` — traînée d'étoiles filantes qui suit le curseur dans le hero
- `card-glare.js` — halo lumineux qui suit le curseur sur les cartes en glassmorphism
- `copy-email.js` — copie de l'email/téléphone dans le presse-papier avec feedback visuel

Convention : toute logique non triviale est extraite en fonction pure exportée et testée (ex: `computeWaveDelay`, `pickTier`, `getActiveSectionId`) ; le câblage DOM lui-même (event listeners, `querySelector`) n'est généralement pas testé unitairement.

## Design tokens (source : `src/styles/_variables.scss`)

- Fond principal `#150F10` · fond alterné `#181112` · panneau `#1D1516`
- Primaire (bourgogne) `#7A1F2B` · secondaire `#C98B8B` · texte `#F3E9E7` (blanc chaud, jamais de blanc pur) · texte atténué `#D8C9C7`
- Typographie : **Fraunces** (italique) pour les titres, **Manrope** pour le texte courant
- Largeur de contenu max `1100px`, centrée avec un padding latéral fluide (`max(32px, ...)`) — pas de wrapper HTML dédié, c'est géré par `$section-padding`
- Breakpoint mobile : `768px`
- Effet "glassmorphism" réutilisé sur plusieurs cartes (`.stat`, `.timeline-card`, `.education-card`) : fond translucide + `backdrop-filter: blur()` + ombres internes + liseré du haut + halo qui suit le curseur (`card-glare.js`)

## Convention Git (obligatoire)

- **Une branche par section ou par fonctionnalité conséquente** (pas par petite retouche isolée), créée depuis `master` : `feat-<slug>`, `fix-<slug>`, `config-<slug>`, `refacto-<slug>` (préfixe en minuscules). Une même branche de section peut recevoir plusieurs commits au fil des itérations avant d'être mergée.
- **Push immédiat sur `origin`** dès la création de la branche (`git push -u origin <branche>`), pas seulement au moment du merge.
- **Messages de commit** : `<TYPE> : <description claire>` — type en majuscules, espace avant les deux-points. `FEAT :` nouvelle fonctionnalité, `FIX :` correction de bug, `CONFIG :` configuration/outillage, `REFACTO :` refactorisation sans changement de comportement.
- **Merge avec `git merge --no-ff`** dans `master` une fois la section validée.
- **Ne jamais supprimer une branche après le merge** — elles sont conservées, en local et sur `origin`.
- Avant de committer une modification visuelle/interactive : lancer `npm run test` et `npm run build`, vérifier qu'il n'y a pas d'erreur, et si possible confirmer le rendu en DOM (le rendu visuel via navigateur n'est pas toujours fiable dans cet environnement — utiliser `getComputedStyle`/`querySelectorAll` en JS comme vérification de repli).
- Toujours montrer le diff à l'utilisateur et attendre sa confirmation avant de committer.

## Documents de référence

- `docs/superpowers/specs/2026-08-17-portfolio-landing-page-design.md` — brief de design initial (partiellement dépassé : pas de section Parcours scolaire, contenu 100% provisoire à l'origine)
- `docs/superpowers/plans/2026-08-21-portfolio-landing-page.md` — plan d'implémentation initial (16 tâches), utile pour l'historique de construction mais pas pour l'état actuel
