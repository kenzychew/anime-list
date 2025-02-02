import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/AnimeDetail.css';

/**
 * AnimeDetailPage Component
 * Displays detailed information about a specific anime based on the URL parameter ID.
 * Fetches data from the Jikan API and renders various anime details including
 * images, stats, synopsis, and trailer if available.
 */
const AnimeDetailPage = () => {
  // Extract the anime ID from the URL parameters
  const { id } = useParams();
  
  // State management
  const [results, setResults] = useState(null);        // Stores the anime data
  const [loading, setLoading] = useState(true);    // Tracks loading state
  const [error, setError] = useState(null);        // Stores any error messages

  /**
   * useEffect hook to fetch anime details when the component mounts
   * or when the ID parameter changes
   */
  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        setLoading(true);
        // Fetch anime data from Jikan API
        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
        const data = await response.json();
        setResults(data.data);
      } catch (error) {
        setError(`Failed to fetch anime details: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeDetails();
  }, [id]); // Dependency array - effect runs when ID changes

  // Conditional rendering based on component state
  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!results) return <div className="empty-message">Anime not found</div>;

  return (
    <div className="anime-detail">
      <div className="detail-card">
        <div className="detail-content">
          {/* Image section */}
          <div className="detail-image-container">
            <img
              src={results.images.jpg.large_image_url}
              alt={results.title}
              className="detail-image"
            />
          </div>

          {/* Main information section */}
          <div className="detail-info">
            {/* Title section - Shows both original and English titles if different */}
            <h1 className="detail-title">{results.title}</h1>
            {results.title_english && results.title_english !== results.title && (
              <h2 className="detail-english-title">{results.title_english}</h2>
            )}
            
            {/* Basic stats section */}
            <div className="detail-stats">
              <div className="detail-stat">
                <span className="detail-stat-label">Score:</span> {results.score}
              </div>
              <div className="detail-stat">
                <span className="detail-stat-label">Rank:</span> #{results.rank}
              </div>
              <div className="detail-stat">
                <span className="detail-stat-label">Popularity:</span> #{results.popularity}
              </div>
              <div className="detail-stat">
                <span className="detail-stat-label">Status:</span> {results.status}
              </div>
              <div className="detail-stat">
                <span className="detail-stat-label">Episodes:</span> {results.episodes}
              </div>
              <div className="detail-stat">
                <span className="detail-stat-label">Duration:</span> {results.duration}
              </div>
            </div>

            {/* Synopsis section */}
            <div className="detail-section">
              <h3 className="detail-section-title">Synopsis</h3>
              <p className="detail-synopsis">{results.synopsis}</p>
            </div>

            {/* Additional information section */}
            <div className="detail-section">
              <h3 className="detail-section-title">Information</h3>
              <div className="detail-info-grid">
                <div className="detail-stat">
                  <span className="detail-stat-label">Type:</span> {results.type}
                </div>
                <div className="detail-stat">
                  <span className="detail-stat-label">Aired:</span> {results.aired.string}
                </div>
                <div className="detail-stat">
                  <span className="detail-stat-label">Rating:</span> {results.rating}
                </div>
                <div className="detail-stat">
                  <span className="detail-stat-label">Genres:</span>{' '}
                  {results.genres.map(genre => genre.name).join(', ')}
                </div>
              </div>
            </div>

            {/* Conditional render of trailer section if available */}
            {results.trailer.embed_url && (
              <div className="detail-section">
                <h3 className="detail-section-title">Trailer</h3>
                <div className="detail-trailer">
                  <iframe
                    src={results.trailer.embed_url}
                    title="Trailer"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetailPage;