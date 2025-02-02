import { useWatchlist } from '../../hooks/useWatchlist';
import Toast from '../Toast/Toast';

/**
 * AnimeDetail Component
 * Renders the detailed view of an anime including images, stats, synopsis, and trailer.
 * Properties:
 * - anime: The anime data to display
 */
export const AnimeDetail = ({ anime }) => {
  const { isInWatchlist, handleWatchlistToggle, toast, setToast } = useWatchlist();

  const handleWatchlistUpdate = async () => {
    const action = isInWatchlist(anime.mal_id) ? 'remove' : 'add';
    await handleWatchlistToggle(anime);
    setToast(action === 'add' ? 'Added to Watchlist' : 'Removed from Watchlist');
  };

  return (
    <div className="anime-detail">
      <div className="detail-card">
        <div className="detail-content">
          {/* Image and Stats section */}
          <div className="detail-image-container">
            <img
              src={anime.images.jpg.large_image_url}
              alt={anime.title}
              className="detail-image"
            />
            <div className="detail-stats-container">
              <h3 className="detail-section-title">Stats</h3>
              <div className="detail-stats">
                <div className="detail-stat">
                  <span className="detail-stat-label">Score:</span> {anime.score}
                </div>
                <div className="detail-stat">
                  <span className="detail-stat-label">Rank:</span> #{anime.rank}
                </div>
                <div className="detail-stat">
                  <span className="detail-stat-label">Popularity:</span> #{anime.popularity}
                </div>
                <div className="detail-stat">
                  <span className="detail-stat-label">Favorites:</span> #{anime.favorites}
                </div>
                <div className="detail-stat">
                  <span className="detail-stat-label">Type:</span> {anime.type}
                </div>
              </div>
              <button 
                onClick={handleWatchlistUpdate}
                className={`watchlist-button ${isInWatchlist(anime.mal_id) ? 'remove' : ''}`}
              >
                {isInWatchlist(anime.mal_id) ? 'Remove from Watchlist' : 'Add to Watchlist'}
              </button>
            </div>
          </div>

          {/* Main information section */}
          <div className="detail-info">
            {/* Title section - Shows both original and English titles if different */}
            <h1 className="detail-title">{anime.title}</h1>
            {anime.title_english && anime.title_english !== anime.title && (
              <h2 className="detail-english-title">{anime.title_english}</h2>
            )}

            {/* Synopsis section */}
            <div className="detail-section">
              <h3 className="detail-section-title">Synopsis</h3>
              <p className="detail-synopsis">{anime.synopsis}</p>
            </div>

            {/* Additional information section */}
            <div className="detail-section">
              <h3 className="detail-section-title">Information</h3>
              <div className="detail-info-grid">
                <div className="detail-stat">
                  <span className="detail-stat-label">Studios:</span> {anime.studios.map(studio => studio.name).join(', ')}
                </div>
                <div className="detail-stat">
                  <span className="detail-stat-label">Producers:</span> {anime.producers.map(producer => producer.name).join(', ')}
                </div>
                <div className="detail-stat">
                  <span className="detail-stat-label">Licensors:</span> {anime.licensors.map(licensor => licensor.name).join(', ')}
                </div>
                <div className="detail-stat">
                  <span className="detail-stat-label">Status:</span> {anime.status}
                </div>
                <div className="detail-stat">
                  <span className="detail-stat-label">Episodes:</span> {anime.episodes}
                </div>
                <div className="detail-stat">
                  <span className="detail-stat-label">Duration:</span> {anime.duration}
                </div>
                <div className="detail-stat">
                  <span className="detail-stat-label">Aired:</span> {anime.aired.string}
                </div>
                <div className="detail-stat">
                  <span className="detail-stat-label">Rating:</span> {anime.rating}
                </div>
                <div className="detail-stat">
                  <span className="detail-stat-label">Genres:</span>{' '}
                  {anime.genres.map(genre => genre.name).join(', ')}
                </div>
              </div>
            </div>

            {/* Conditional render of trailer section if available */}
            {anime.trailer.embed_url && (
              <div className="detail-section">
                <h3 className="detail-section-title">Trailer</h3>
                <div className="detail-trailer">
                  <iframe
                    src={anime.trailer.embed_url}
                    title="Trailer"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  )
}

export default AnimeDetail;