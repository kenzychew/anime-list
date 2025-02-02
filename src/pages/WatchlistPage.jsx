// Import necessary dependencies
import { Link } from 'react-router-dom';  // For navigation between pages
import Toast from '../components/Toast/Toast';  // Toast notification component
import { useWatchlist } from '../hooks/useWatchlist';  // Custom hook for watchlist management
import '../styles/SearchResults.css';  // Styles shared with search results page

/**
 * WatchlistPage Component
 * Displays a user's saved anime watchlist with options to remove items and navigate to detail pages.
 * Uses the useWatchlist custom hook for state management and operations.
 */
const WatchlistPage = () => {
  // Destructure values and functions from the useWatchlist hook
  const { 
    watchlist,           // Array of saved anime
    loading,            // Loading state indicator
    error,              // Error state message
    handleWatchlistToggle,  // Function to add/remove anime from watchlist
    toast,              // Current toast message
    setToast,           // Function to update toast message
    clearWatchlist      // Function to clear entire watchlist
  } = useWatchlist();

  // Show loading state while data is being fetched
  if (loading) return <div className="loading">Loading watchlist...</div>;
  
  // Show error message if something goes wrong
  if (error) return <div className="error">{error}</div>;

  // Filter out invalid entries from the watchlist
  // This prevents crashes from malformed data and ensures all entries have valid IDs
  const validWatchlist = watchlist.filter(anime => 
    anime && 
    typeof anime.mal_id === 'number' && 
    !isNaN(anime.mal_id)
  );

  return (
    <div className="search-page">
      {/* Header section with title and clear button */}
      <div className="watchlist-header">
        <h1 className="search-title">My Watchlist</h1>
        {validWatchlist.length > 0 && (
          <button 
            onClick={() => {
              clearWatchlist();
              setToast('Watchlist cleared');
            }}
            className="clear-watchlist-button"
          >
            Burn It All
          </button>
        )}
      </div>
      
      {/* Show message for empty watchlist */}
      {validWatchlist.length === 0 ? (
        <div className="empty-message">
          Your watchlist is empty. Add some anime from the home page or search!
        </div>
      ) : (
        // Display grid of anime cards if watchlist has items
        <div className="search-results">
          {validWatchlist.map((anime) => (
            <div key={anime.mal_id} className="anime-card">
              {/* Anime image */}
              <img
                src={anime.image_url}
                alt={anime.title || `Anime Image`}
                className="anime-image"
              />
              {/* Clickable title linking to detail page */}
              <Link to={`/anime/${anime.mal_id}`} className="anime-title">
                <h3>{anime.title}</h3>
              </Link>
              {/* Remove from watchlist button */}
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

      {/* Toast notification - only shown when toast message exists */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default WatchlistPage;