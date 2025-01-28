import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import SearchBar from '../components/Layout/SearchBar';
import '../styles/SearchResults.css';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&sfw=true`
        );
        const data = await response.json();
        setResults(data.data);
      } catch (err) {
        setError('Failed to fetch results. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const handleAddToWatchlist = (anime) => {
    // Get existing watchlist from localStorage
    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    
    // Check if anime is already in watchlist
    if (!watchlist.some(item => item.mal_id === anime.mal_id)) {
      // Add anime to watchlist
      const updatedWatchlist = [...watchlist, anime];
      localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
      alert('Added to watchlist!');
    } else {
      alert('Already in watchlist!');
    }
  };

  return (
    <div className="search-page">
      <div className="search-bar-container">
        <SearchBar />
      </div>
      
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      
      {query && !loading && !error && (
        <>
          <h2 className="search-title">Search Results for: {query}</h2>
          <div className="search-results">
            {results.map((anime) => (
              <div key={anime.mal_id} className="anime-card">
                <img
                  src={anime.images.jpg.image_url}
                  alt={anime.title}
                  className="anime-image"
                />
                <Link to={`/anime/${anime.mal_id}`} className="anime-title">
                  <h3>{anime.title}</h3>
                </Link>
                <p className="anime-info">{anime.type} • {anime.episodes} episodes</p>
                <button 
                  onClick={() => handleAddToWatchlist(anime)}
                  className="watchlist-button"
                >
                  Add to Watchlist
                </button>
              </div>
            ))}
          </div>
        </>
      )}
      
      {!query && !loading && (
        <div className="empty-message">
          Enter a search term to find anime
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
