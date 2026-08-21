# Portfolio — Landing page one-page (design)

Date : 2026-08-17
Statut : validé en brainstorming, en attente de revue finale utilisateur

## Objectif

Landing page one-page, sobre et professionnelle, pour présenter un profil de développeur web : à propos, compétences, expériences, projets, contact. Ambiance "premium" : fond sombre, couleur forte, motifs discrets.

## Stack technique

- **Vite** (build tool) + **HTML / JavaScript vanilla** — pas de framework (React jugé superflu pour une page statique à une seule vue).
- **SCSS** pour le style (support natif de Vite, nécessite juste la dépendance `sass`).
- Aucun backend. Le formulaire de contact est remplacé par des liens directs (voir section Contact).

### Structure de fichiers

```
/
├── index.html
├── package.json
├── src/
│   ├── main.js          # nav mobile, scroll spy (lien actif), smooth scroll,
│   │                     # reveal-on-scroll (IntersectionObserver), copier l'email, parallaxe légère du motif hero
│   ├── styles/
│   │   ├── main.scss     # point d'entrée, importe les partials ci-dessous
│   │   ├── _variables.scss  # couleurs, typographies, espacements
│   │   ├── _base.scss       # reset, styles de base, typographie globale
│   │   ├── _navbar.scss     # navbar desktop + menu hamburger mobile
│   │   ├── _sections.scss   # hero, à propos, compétences, expériences, projets, contact
│   │   └── _animations.scss # reveal au scroll, hover, parallaxe
│   └── assets/
│       ├── logo-m.svg  # monogramme "M", version 3D, fond transparent, recoloré
│       └── logo-p.svg  # monogramme "P", version 3D, fond transparent, recoloré
└── assets/              # fichiers sources originaux (letter_M.svg, letter_P.svg, versions 3D)
```

Les SVG originaux (`assets/letter_M_3D.svg`, `assets/letter_P_3D.svg`) ont un fond blanc/gris opaque et un remplissage noir : ils doivent être retravaillés (suppression du fond, recoloration en `#F3E9E7`) avant d'être utilisés comme logo. Version retenue : **3D** (celle avec le tracé le plus prononcé), agrandie (~40px), M et P rapprochés l'un de l'autre.

## Identité visuelle

### Palette (rouge bourgogne)

| Rôle | Couleur | Usage |
|---|---|---|
| Fond principal | `#150F10` | fond de page (hero, à propos, expériences, contact) |
| Fond alterné | `#181112` | fond des sections Compétences et Projets, pour rythmer la page |
| Primaire | `#7A1F2B` | boutons, accents forts, points de la timeline, motif en fond |
| Secondaire | `#C98B8B` | labels, sous-titres, éléments doux |
| Blanc chaud | `#F3E9E7` | titres, texte principal (jamais de blanc pur) |
| Texte atténué | `#D8C9C7` | paragraphes, texte secondaire |

Un motif discret de pointillés (`radial-gradient` de points teintés bourgogne, faible opacité, `18px` de pas) est appliqué en fond du hero et de la section Contact pour l'effet premium. Léger effet de parallaxe sur ce motif au scroll dans le hero.

### Typographie

- **Fraunces** (italique, graisse 600) — titres de section, nom en hero, titres de poste dans la timeline.
- **Manrope** — texte courant, labels, navigation, boutons.

## Structure de la page

Ordre des sections, chacune en pleine largeur, contenu **provisoire** (texte de remplacement) en attendant le contenu réel de l'utilisateur.

### Navbar (fixe / sticky)

- Logo "MP" (monogramme 3D, blanc chaud) à gauche.
- Liens : À propos · Compétences · Expériences · Projets · Contact — surlignage automatique du lien de la section visible au scroll.
- Défilement fluide (smooth scroll) vers l'ancre cliquée.
- **Mobile** : liens remplacés par un menu hamburger (☰), ouverture en overlay plein écran (fond sombre, liens centrés, grande taille), même identité visuelle sombre/bourgogne.

### Hero

- Label "Développeur Web" (petit, majuscules, espacé, secondaire).
- Nom (Fraunces italique, grande taille).
- Courte accroche (une phrase).
- Deux boutons : CTA principal "Voir mes projets" (rempli bourgogne) + bouton secondaire "Me contacter" (contour).
- Fond à motif pointillés avec léger parallaxe.

### À propos

- Mise en page à deux colonnes : paragraphe de présentation à gauche, deux petites statistiques à droite (ex. années d'expérience, nombre de projets), sur fond légèrement teinté (`#1D1516`).

### Compétences

Trois catégories, différenciées visuellement par niveau de maîtrise :

- **Maîtrisé** — badge plein, fond bourgogne, texte blanc chaud.
- **Intermédiaire** — badge à contour rosé (secondaire), texte blanc chaud.
- **En perfectionnement** — badge à contour pointillé, texte atténué.

Sur mobile, les trois colonnes s'empilent verticalement.

### Expériences

Timeline verticale : ligne fine reliant des points (couleur primaire), chaque entrée affichant date, poste/entreprise (Fraunces) et courte description.

### Projets

Grille **2×2** (4 projets mis en avant). Chaque carte : vignette (placeholder à motif pointillés en attendant de vraies images), titre, courte description, tags de technologies.

### Contact

- Liens directs **LinkedIn** et **GitHub**.
- Adresse email : au clic, **copie automatique dans le presse-papier** avec confirmation visuelle ("Copié !" pendant ~2s). Un lien `mailto:` reste présent en support (clic droit, lecteurs d'écran, accessibilité) mais l'action principale au clic est la copie.
- Pas de formulaire de contact (pas de backend).

### Footer

Ligne simple de copyright.

## Animations et interactions

- **Reveal au scroll** : fade-in + léger décalage vertical à l'apparition de chaque section (`IntersectionObserver`), discret, sans rebond.
- **Hover** : légère élévation / changement de teinte sur les boutons et les cartes de projet.
- **Parallaxe légère** : motif à pointillés du hero se déplaçant plus lentement que le contenu au scroll.
- **Navbar** : surlignage du lien actif selon la section visible à l'écran.

## Contenu

Contenu 100 % provisoire pour l'instant (textes de remplacement, 3 expériences et 4 projets fictifs) — à remplacer par l'utilisateur une fois la structure validée. Langue : français.

## Déploiement

Pas encore arrêté définitivement, mais orientation actuelle : **Vercel**. Décision à confirmer avant la mise en production ; n'impacte pas la structure du projet (site statique buildé par Vite, déployable sur n'importe quelle plateforme statique).

## Hors périmètre (pour cette itération)

- Formulaire de contact avec backend.
- Blog / CMS.
- Contenu réel (textes, images de projets, CV téléchargeable).
- Choix définitif de l'hébergeur.
