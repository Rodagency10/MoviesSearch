# Application de recherche de films

## Vue d'ensemble

Cette application est une interface de recherche de films utilisant l'API TMDB (The Movie Database). Elle permet aux utilisateurs de découvrir des films, de les rechercher, de filtrer les résultats et de consulter les détails d'un film spécifique.

## Technologies utilisées

- React
- Redux Toolkit
- RTK Query
- TypeScript
- Tailwind CSS
- Lucide React (pour les icônes)

## Structure de l'application

### Composants principaux

1. `App.tsx`: Composant racine de l'application, gère la mise en page globale.
2. `MovieList.tsx`: Affiche la liste des films, gère la pagination et la recherche.
3. `MovieDetails.tsx`: Affiche les détails d'un film sélectionné.
4. `FilterBar.tsx`: Permet de filtrer les films par genre et année.
5. `SearchBar.tsx`: Gère la recherche de films.
6. `MovieItem.tsx`: Représente un film individuel dans la liste.

### Services

- `moviesAPI.ts`: Définit l'API pour interagir avec TMDB en utilisant RTK Query.

### Gestion de l'état

- `store.ts`: Configure le store Redux.
- `FilterContext.tsx`: Fournit un contexte pour gérer les filtres à travers l'application.
- `searchSlice.ts`: Gère l'état de la recherche.

## Fonctionnalités

1. Découverte de films populaires
2. Recherche de films par titre
3. Pagination des résultats
4. Filtrage des films par genre et année
5. Affichage détaillé d'un film sélectionné
6. Interface utilisateur responsive avec sidebar sur les grands écrans

## Installation et démarrage

1. Clonez le dépôt
2. Installez les dépendances : `npm install`
3. Démarrez l'application : `npm run dev`

## Configuration

L'application utilise une clé API pour TMDB. Assurez-vous de définir `VITE_TMDB_API_KEY` dans votre fichier `.env`.

## Utilisation

1. La page d'accueil affiche une liste de films populaires.
2. Utilisez la barre de recherche pour trouver des films spécifiques.
3. Utilisez les filtres dans la sidebar pour affiner les résultats par genre et année.
4. Cliquez sur un film pour voir ses détails complets.
5. Utilisez les boutons de pagination pour naviguer entre les pages de résultats.

## Structure des composants

- `App`: Gère la mise en page globale et le routage entre la liste des films et les détails.
- `MovieList`: Affiche la grille de films et gère la pagination.
- `FilterBar`: Affiche les options de filtrage dans la sidebar.
- `SearchBar`: Gère la saisie de recherche et le déclenchement de la recherche.
- `MovieItem`: Affiche les informations de base d'un film dans la grille.
- `MovieDetails`: Affiche les informations détaillées d'un film sélectionné.

## Gestion de l'état

- Redux est utilisé pour gérer l'état global de l'application.
- RTK Query gère les requêtes API et la mise en cache des données.
- Le contexte React (`FilterContext`) est utilisé pour gérer l'état des filtres.

## Styles

L'application utilise Tailwind CSS pour le styling, offrant une interface responsive et moderne.

## Développement futur

- Ajout de tests unitaires pour les composants et les reducers
- Implémentation de fonctionnalités de liste de favoris
- Intégration d'un système d'authentification pour personnaliser l'expérience utilisateur

