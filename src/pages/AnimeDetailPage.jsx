import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/AnimeDetail.css';

const AnimeDetailPage = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
        const data = await response.json();
        setAnime(data.data);
      } catch (error) {
        setError(`Failed to fetch anime details: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeDetails();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!anime) return <div className="empty-message">Anime not found</div>;

  return (
    <div className="anime-detail">
      <div className="detail-card">
        <div className="detail-content">
          <div className="detail-image-container">
            <img
              src={anime.images.jpg.large_image_url}
              alt={anime.title}
              className="detail-image"
            />
          </div>
          <div className="detail-info">
            <h1 className="detail-title">{anime.title}</h1>
            {anime.title_english && anime.title_english !== anime.title && (
              <h2 className="detail-english-title">{anime.title_english}</h2>
            )}
            
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
                <span className="detail-stat-label">Status:</span> {anime.status}
              </div>
              <div className="detail-stat">
                <span className="detail-stat-label">Episodes:</span> {anime.episodes}
              </div>
              <div className="detail-stat">
                <span className="detail-stat-label">Duration:</span> {anime.duration}
              </div>
            </div>

            <div className="detail-section">
              <h3 className="detail-section-title">Synopsis</h3>
              <p className="detail-synopsis">{anime.synopsis}</p>
            </div>

            <div className="detail-section">
              <h3 className="detail-section-title">Information</h3>
              <div className="detail-info-grid">
                <div className="detail-stat">
                  <span className="detail-stat-label">Type:</span> {anime.type}
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
    </div>
  );
};

export default AnimeDetailPage;
