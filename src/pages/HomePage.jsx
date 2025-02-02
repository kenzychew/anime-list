import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Toast from '../components/Toast/Toast';
import { useWatchlist } from '../hooks/useWatchlist';
import '../styles/SearchResults.css'; // Reusing the same styles

const HomePage = () => {
  // State management for anime data and loading states
  const [topAnime, setTopAnime] = useState([]); // Tracks list of top anime
  const [loading, setLoading] = useState(true); // Manages loading state
  const [error, setError] = useState(null); // Handles potential errors
  
  // Custom hook for watchlist functionality
  const { isInWatchlist, handleWatchlistToggle, toast, setToast } = useWatchlist();

  // Fetch top anime data when component mounts
  useEffect(() => {
    // Add inner async function to fetch top anime data from Jikan API
    const fetchTopAnime = async () => {
      try {
        setLoading(true); // Set loading state to true
        const response = await fetch('https://api.jikan.moe/v4/top/anime'); // Makes GET request to Jikan API's top anime endpoint
        const data = await response.json(); // Parses JSON response into JS object, await needed bc .json() is an async function
        setTopAnime(data.data); // Update state with anime data, data.data bc Jikan API wraps results in a data property
      } catch (error) { 
        setError(`Failed to fetch top anime: ${error.message}`); // Set error state with error message, used to display error message in UI
      } finally {
        setLoading(false); // Runs whether fetch is successful or not
      }
    };
    // Call fetchTopAnime function when component mounts
    fetchTopAnime();
  }, []); // Empty dependency array ensures this runs only once

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
        {topAnime.map((anime) => (
          <div key={anime.mal_id} className="anime-card">
            <img
              src={anime.images.jpg.image_url}
              alt={anime.title}
              className="anime-image"
            />
            {/* Link to detailed view */}
            <Link to={`/anime/${anime.mal_id}`} className="anime-title">
              <h3>{anime.title}</h3>
            </Link>
            {/* <div className="anime-info">
              <span>Score: {anime.score}</span> • <span>Rank #{anime.rank}</span>
            </div> */}
            {/* Watchlist toggle button */}
            <button 
              onClick={() => handleWatchlistToggle(anime)}
              className={`watchlist-button ${isInWatchlist(anime.mal_id) ? 'remove' : ''}`}
            >
              {isInWatchlist(anime.mal_id) ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </button>
          </div>
        ))}
      </div>
      {/* Toast notification */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default HomePage;
