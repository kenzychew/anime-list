import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/SearchResults.css'; // Reusing the same styles

const HomePage = () => {
  const [topAnime, setTopAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopAnime = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.jikan.moe/v4/top/anime?filter=airing');
        const data = await response.json();
        setTopAnime(data.data);
      } catch (err) {
        setError('Failed to fetch top anime. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTopAnime();
  }, []);

  const handleAddToWatchlist = (anime) => {
    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    
    if (!watchlist.some(item => item.mal_id === anime.mal_id)) {
      const updatedWatchlist = [...watchlist, anime];
      localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
      alert('Added to watchlist!');
    } else {
      alert('Already in watchlist!');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="search-page">
      <h1 className="search-title">
        Top Airing Anime
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
              onClick={() => handleAddToWatchlist(anime)}
              className="watchlist-button"
            >
              Add to Watchlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
