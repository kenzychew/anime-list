import { Link } from 'react-router-dom';
import { useWatchlist } from '../../hooks/useWatchlist';
import '../../styles/AnimeCard.css';

const AnimeCard = ({ anime, onWatchlistUpdate }) => {
  const { isInWatchlist, handleWatchlistToggle } = useWatchlist();

  const handleClick = async () => {
    const action = isInWatchlist(anime.mal_id) ? 'remove' : 'add';
    await handleWatchlistToggle(anime);
    onWatchlistUpdate?.(action); // Call the callback with the action if provided
  };

  return (
    <div className="anime-card">
      <img
        src={anime.images?.jpg?.image_url || anime.image_url}
        alt={anime.title || 'Anime Image'}
        className="anime-image"
      />
      <Link to={`/anime/${anime.mal_id}`} className="anime-title">
        <h3>{anime.title}</h3>
      </Link>
      <div className="anime-info">
        <span>Score: {anime.score}</span> • <span>Popularity #{anime.popularity}</span>
      </div>
      <div className="anime-info">
        <span>Rank #{anime.rank}</span> • <span>Favorites: {anime.favorites}</span>
      </div>
      <button 
        onClick={handleClick}
        className={`watchlist-button ${isInWatchlist(anime.mal_id) ? 'remove' : ''}`}
      >
        {isInWatchlist(anime.mal_id) ? 'Remove from Watchlist' : 'Add to Watchlist'}
      </button>
    </div>
  );
};

export default AnimeCard; 