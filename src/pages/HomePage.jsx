import { useState, useEffect } from 'react';
import Toast from '../components/Toast/Toast';
import AnimeCard from '../components/AnimeCard/AnimeCard';
import { useWatchlist } from '../hooks/useWatchlist';
import '../styles/SearchResults.css';

const HomePage = () => {
  // Initialize state variables using useState hook
  const [results, setResults] = useState([]); // Stores list of top anime
  const [loading, setLoading] = useState(true); // Manages loading state
  const [error, setError] = useState(null); // Handles potential errors
  
  // Custom hook for toast notifications when adding or removing anime from watchlist
  const { toast, setToast } = useWatchlist();

  // Fetch top anime data when component mounts
  useEffect(() => {
    // Add inner async function to fetch top anime data from Jikan API
    const fetchTopAnime = async () => {
      try {
        setLoading(true); // Set loading state to true
        const response = await fetch('https://api.jikan.moe/v4/top/anime'); // Makes GET request to Jikan API's top anime endpoint
        const data = await response.json(); // Parses JSON response into JS object, await needed bc .json() is an async function
        setResults(data.data); // Update state with anime data, data.data bc Jikan API wraps results in a data property
      } catch (error) { 
        setError(`Failed to fetch top anime: ${error.message}`); // Set error state with error message, used to display error message in UI
      } finally {
        setLoading(false); // Runs whether fetch is successful or not
      }
    };
    // Call fetchTopAnime function when component mounts
    fetchTopAnime();
  }, []); // Empty dependency array ensures this runs only once

  const handleWatchlistUpdate = (action) => {
    setToast(action === 'add' ? 'Added to Watchlist' : 'Removed from Watchlist');
  };

  // Loading and error states
  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="search-page">
      <h1 className="search-title">
        Top Anime
      </h1>
      {/* Grid layout for anime cards */}
      <div className="search-results">
        {results.map((anime) => (
          <AnimeCard 
            key={anime.mal_id} 
            anime={anime} 
            onWatchlistUpdate={handleWatchlistUpdate}
          />
        ))}
      </div>
      {/* Toast notification */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default HomePage;
