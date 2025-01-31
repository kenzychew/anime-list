import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import SearchBar from '../components/Layout/SearchBar';
import Toast from '../components/Toast/Toast';
import { useWatchlist } from '../hooks/useWatchlist';
import '../styles/SearchResults.css';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isInWatchlist, handleWatchlistToggle, toast, setToast } = useWatchlist();

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
                  onClick={() => handleWatchlistToggle(anime)}
                  className={`watchlist-button ${isInWatchlist(anime.mal_id) ? 'remove' : ''}`}
                >
                  {isInWatchlist(anime.mal_id) ? 'Remove from Watchlist' : 'Add to Watchlist'}
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
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default SearchResultsPage;
