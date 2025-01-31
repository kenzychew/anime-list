import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Toast from '../components/Toast/Toast';
import '../styles/SearchResults.css';

const WatchlistPage = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    setWatchlist(savedWatchlist);
  }, []);

  const handleRemoveFromWatchlist = (animeId) => {
    const updatedWatchlist = watchlist.filter(anime => anime.mal_id !== animeId);
    setWatchlist(updatedWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
    setToast('Removed from Watchlist');
  };

  return (
    <div className="search-page">
      <h1 className="search-title">My Watchlist</h1>
      
      {watchlist.length === 0 ? (
        <div className="empty-message">
          Your watchlist is empty. Add some anime from the home page or search!
        </div>
      ) : (
        <div className="search-results">
          {watchlist.map((anime) => (
            <div key={anime.mal_id} className="anime-card">
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                className="anime-image"
              />
              <Link to={`/anime/${anime.mal_id}`} className="anime-title">
                <h3>{anime.title}</h3>
              </Link>
              <div className="anime-info">
                <span>Type: {anime.type}</span>
                {anime.episodes && <span> • {anime.episodes} episodes</span>}
              </div>
              <button 
                onClick={() => handleRemoveFromWatchlist(anime.mal_id)}
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
