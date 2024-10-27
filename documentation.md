# Application de recherche de film

## Vue d'ensemble

Cette application est une interface de recherche de films utilisant l'API OMDb (Open Movie Database). Elle permet aux utilisateurs de rechercher des films, de voir une liste de résultats, de filtrer ces résultats et de consulter les détails d'un film spécifique.

## Technologies utilisées

- React
- Redux Toolkit
- RTK Query
- TypeScript
- Tailwind CSS

## Structure de l'application

### Composants principaux

1. `App.tsx`: Composant racine de l'application.
2. `MovieList.tsx`: Affiche la liste des films et gère la recherche.
3. `MovieDetails.tsx`: Affiche les détails d'un film sélectionné.
4. `FilterBar.tsx`: Permet de filtrer les films par genre et année.

### Services

- `omdbApi.ts`: Définit l'API pour interagir avec OMDb en utilisant RTK Query.

### Gestion de l'état

- `store.ts`: Configure le store Redux.
- `FilterContext.tsx`: Fournit un contexte pour gérer les filtres à travers l'application.

## Fonctionnalités

1. Recherche de films par titre
2. Pagination des résultats de recherche
3. Filtrage des films par genre et année
4. Affichage des détails d'un film sélectionné
5. Interface utilisateur responsive

## Installation et démarrage

1. Clonez le dépôt
2. Installez les dépendances : `npm install` ou `yarn install` ou `pnpm install`
3. Démarrez l'application : `npm run dev` ou `yarn dev` ou `pnpm run dev`

## Configuration

L'application utilise une clé API pour OMDb. Assurez-vous de remplacer `API_KEY` dans `src/services/omdbApi.ts` par votre propre clé API.

## Utilisation

1. Entrez un titre de film dans la barre de recherche.
2. Utilisez les filtres pour affiner les résultats par genre et année.
3. Cliquez sur "Voir les détails" pour voir plus d'informations sur un film spécifique.
4. Utilisez les boutons de pagination pour naviguer entre les pages de résultats.

## Développement futur

- Ajout de tests unitaires pour les composants et les reducers 
- Ajout de fonctionnalités comme la sauvegarde de films favoris

