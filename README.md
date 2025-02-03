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

   **HomePage**

   - Main landing page displaying top-rated anime
   - Features:
     - Fetches and displays a paginated list of top anime from Jikan API
     - Shows anime in a grid layout using AnimeCard components
     - Implements pagination using Material UI's Pagination component
     - Allows users to add/remove anime from their watchlist
     - Shows toast notifications for watchlist actions
     - Displays 20 anime per page
     - Includes loading and error states

   **SearchResultsPage**

   - Handles search functionality and displays search results
   - Features:
     - Gets search query from URL parameters
     - Fetches matching anime from Jikan API based on search term
     - Shows results in a grid layout similar to HomePage
     - Includes a search bar for new searches
     - Implements pagination for search results
     - Shows toast notifications for watchlist actions
     - Displays appropriate messages for empty states or errors
     - Handles 20 results per page

   **AnimeDetailPage**

   - Displays detailed information about a specific anime
   - Features:
     - Uses URL parameters to get the anime ID
     - Fetches comprehensive anime data from Jikan API
     - Renders detailed information through AnimeDetail component
     - Shows loading and error states
     - Gets full anime details including images, stats, synopsis, and trailer

   **WatchlistPage**

   - Manages and displays the user's saved anime watchlist
   - Features:
     - Shows all anime saved to the user's watchlist
     - Allows removal of individual anime from the watchlist
     - Includes a "Burn It All" button to clear the entire watchlist
     - Uses Link components for navigation to detail pages
     - Shows toast notifications for watchlist actions
     - Displays appropriate messages for empty watchlist
     - Includes validation to filter out invalid entries

   **Common Patterns Across Components**

   - All components handle loading and error states
   - Share similar styling through imported CSS files
   - Use toast notifications for user feedback
   - Follow React best practices with hooks (useState, useEffect)
   - Interact with Jikan API for anime data
   - Integrate with watchlist system for user interaction

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
