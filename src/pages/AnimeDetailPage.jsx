import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AnimeDetail } from '../components/AnimeDetail/AnimeDetail';
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
  const [anime, setAnime] = useState(null);        // Stores the anime data
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
        setAnime(data.data);
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
  if (!anime) return <div className="empty-message">Anime not found</div>;

  return <AnimeDetail anime={anime} />;
};

export default AnimeDetailPage;
