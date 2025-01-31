import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Toast from '../components/Toast/Toast';
import '../styles/SearchResults.css'; // Reusing the same styles

const HomePage = () => {
  const [topAnime, setTopAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchTopAnime = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.jikan.moe/v4/top/anime');
        const data = await response.json();
        setTopAnime(data.data);
      } catch (err) {
        setError('Failed to fetch top anime. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTopAnime();
    // Load watchlist from localStorage
    const savedWatchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    setWatchlist(savedWatchlist);
  }, []);

  const isInWatchlist = (animeId) => {
    return watchlist.some(item => item.mal_id === animeId);
  };

  const handleWatchlistToggle = (anime) => {
    const updatedWatchlist = isInWatchlist(anime.mal_id)
      ? watchlist.filter(item => item.mal_id !== anime.mal_id)
      : [...watchlist, anime];
    
    setWatchlist(updatedWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
    
    setToast(isInWatchlist(anime.mal_id) 
      ? 'Removed from Watchlist' 
      : 'Added to Watchlist');
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="search-page">
      <h1 className="search-title">
        Top Anime
      </h1>
      <div className="search-results">
        {topAnime.map((anime) => (
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
              <span>Score: {anime.score}</span> • <span>Rank #{anime.rank}</span>
            </div>
            <button 
              onClick={() => handleWatchlistToggle(anime)}
              className={`watchlist-button ${isInWatchlist(anime.mal_id) ? 'remove' : ''}`}
            >
              {isInWatchlist(anime.mal_id) ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </button>
          </div>
        ))}
      </div>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default HomePage;
