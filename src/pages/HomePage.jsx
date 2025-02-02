import { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination'; // Import Material UI's Pagination component
import Toast from '../components/Toast/Toast';
import AnimeCard from '../components/AnimeCard/AnimeCard';
import { useWatchlist } from '../hooks/useWatchlist';
import '../styles/SearchResults.css';
import '../styles/MuiPagination.css';  // Import the new CSS file

const HomePage = () => {
  // Initialize state variables using useState hook
  const [results, setResults] = useState([]); // Stores list of top anime
  const [loading, setLoading] = useState(true); // Manages loading state
  const [error, setError] = useState(null); // Handles potential errors
  
  // Custom hook for toast notifications when adding or removing anime from watchlist
  const { toast, setToast } = useWatchlist();

  // Pagination state
  const [page, setPage] = useState(1);              // Current page number
  const [totalPages, setTotalPages] = useState(0);  // Total number of pages available

  // Fetch top anime data when component mounts
  useEffect(() => {
    // Add inner async function to fetch top anime data from Jikan API
    const fetchTopAnime = async () => {
      try {
        setLoading(true); // Set loading state to true
        // Fetch anime with pagination parameters (page number and items per page)
        const response = await fetch(`https://api.jikan.moe/v4/top/anime?page=${page}&limit=20`);
        const data = await response.json(); // Parses JSON response into JS object, await needed bc .json() is an async function
        setResults(data.data); // Update state with anime data, data.data bc Jikan API wraps results in a data property
        // Calculate total pages from API response
        setTotalPages(Math.ceil(data.pagination.items.total / 20));
      } catch (error) { 
        setError(`Failed to fetch top anime: ${error.message}`); // Set error state with error message, used to display error message in UI
      } finally {
        setLoading(false); // Runs whether fetch is successful or not
      }
    };
    // Call fetchTopAnime function when component mounts
    fetchTopAnime();
  }, [page]); // Re-fetch when page number changes

  // Handle page change from MUI Pagination component
  // event: The event that triggered the change
  // value: The new page number
  const handlePageChange = (event, value) => {
    setPage(value);                // Update current page
    window.scrollTo(0, 0);         // Scroll back to top of page
  };

  const handleWatchlistUpdate = (action) => {
    setToast(action === 'add' ? 'Added to Watchlist' : 'Removed from Watchlist');
  };

  // Loading and error states
  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="search-page">
      <h1 className="search-title">
        Top Anime
      </h1>
      {/* Grid layout for anime cards */}
      <div className="search-results">
        {results.map((anime) => (
          <AnimeCard 
            key={anime.mal_id} 
            anime={anime} 
            onWatchlistUpdate={handleWatchlistUpdate}
          />
        ))}
      </div>
      <div className="pagination">
        <Pagination 
          count={totalPages}        // Total number of pages
          page={page}              // Current active page
          onChange={handlePageChange} // Function to call when page changes
          color="primary"          // Use primary theme color
          size="large"             // Make pagination buttons larger
          showFirstButton          // Show button to jump to first page
          showLastButton           // Show button to jump to last page
        />
      </div>
      {/* Toast notification */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default HomePage;
