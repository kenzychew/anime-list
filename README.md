# Anime List App

A React-based web application for discovering, searching, and managing your anime watchlist. Built with Vite, React, and integrated with the Jikan API and Airtable for data persistence.

## Features

- **Browse Top Anime**: View a curated list of top-rated anime with pagination
- **Search Functionality**: Search for specific anime titles
- **Detailed Information**: View comprehensive details about each anime including:
  - Synopsis
  - Ratings and rankings
  - Episode count
  - Studios and producers
  - Trailers (when available)
- **Watchlist Management**:
  - Add/remove anime to your personal watchlist
  - Clear entire watchlist
  - Persistent storage using Airtable
- **Theme Toggle**: Switch between light and dark modes
- **Responsive Design**: Works seamlessly on both desktop and mobile devices

## Technical Overview

### Core Technologies

- **React**: Frontend framework
- **Vite**: Build tool and development server
- **Material UI**: Component library (Pagination)
- **Airtable**: Backend database
- **Jikan API**: Anime data source

### Key Components

1. **Layout Components**

   - Navbar: Navigation and branding
   - Footer: Theme toggle
   - Layout: Page structure

2. **Page Components**

   - HomePage: Displays top anime
   - SearchResultsPage: Shows search results
   - AnimeDetailPage: Shows detailed anime information
   - WatchlistPage: Manages user's watchlist

3. **Feature Components**
   - AnimeCard: Reusable card component for anime display
   - SearchBar: Search input and functionality
   - ThemeButton: Toggle between light/dark modes
   - Toast: Notification system

### State Management

- **Context API**: Manages theme state
- **Custom Hooks**:
  - `useWatchlist`: Manages watchlist operations
  - `useTheme`: Handles theme switching

### External APIs

- **Jikan API**: Fetches anime data
  - Top anime listings
  - Search results
  - Detailed anime information
- **Airtable API**: Stores watchlist data
  - Create records
  - Delete records
  - Fetch watchlist

### Styling

- CSS modules for component-specific styles
- Theme variables for consistent styling
- Responsive design using media queries
- Dark mode support

## Environment Setup

Create a `.env` file with the following variables:

- `VITE_AIRTABLE_API_KEY`: Your Airtable API key
- `VITE_AIRTABLE_BASE_ID`: Your Airtable base ID
- `VITE_AIRTABLE_TABLE_NAME`: Your Airtable table name

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Start development server: `npm run dev`

## Project Structure

src/
├── components/ # Reusable components
├── context/ # React Context providers
├── hooks/ # Custom React hooks
├── pages/ # Page components
├── services/ # API services
├── styles/ # CSS files
└── main.jsx # App entry point

## Airtable Setup

1. Create an Airtable account
2. Create a new base
3. Create a table named "Watchlist" with these fields:
   - mal_id (Number)
   - title (Single line text)
   - type (Single line text)
   - episodes (Number)
   - image_url (URL)
   - score (Number)
   - rank (Number)
   - popularity (Number)

## Stretch goals

- Add more detailed anime information
- Implement filters for the top anime list
- Add a recommendation system
- Integrate with more anime databases
