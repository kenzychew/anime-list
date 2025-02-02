import { Link } from 'react-router-dom';
import Toast from '../components/Toast/Toast';
import { useWatchlist } from '../hooks/useWatchlist';
import '../styles/SearchResults.css';

const WatchlistPage = () => {
  const { watchlist, loading, error, handleWatchlistToggle, toast, setToast } = useWatchlist();

  if (loading) return <div className="loading">Loading watchlist...</div>;
  if (error) return <div className="error">{error}</div>;

  // Filter out any invalid entries
  const validWatchlist = watchlist.filter(anime => 
    anime && 
    typeof anime.mal_id === 'number' && 
    !isNaN(anime.mal_id)
  );

  return (
    <div className="search-page">
      <h1 className="search-title">My Watchlist</h1>
      
      {validWatchlist.length === 0 ? (
        <div className="empty-message">
          Your watchlist is empty. Add some anime from the home page or search!
        </div>
      ) : (
        <div className="search-results">
          {validWatchlist.map((anime) => (
            <div key={anime.mal_id} className="anime-card">
              <img
                src={anime.image_url}
                alt={anime.title || `Anime Image`}
                className="anime-image"
              />
              <Link to={`/anime/${anime.mal_id}`} className="anime-title">
                <h3>{anime.title}</h3>
              </Link>
              <button 
                onClick={() => handleWatchlistToggle(anime)}
                className="watchlist-button remove"
              >
                Remove from Watchlist
              </button>
            </div>
          ))}
        </div>
      )}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default WatchlistPage;
