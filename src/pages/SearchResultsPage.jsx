import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination'; // Import MUI Pagination component
import SearchBar from '../components/SearchBar/SearchBar';
import Toast from '../components/Toast/Toast';
import AnimeCard from '../components/AnimeCard/AnimeCard';
import { useWatchlist } from '../hooks/useWatchlist';
import '../styles/SearchResults.css';
import '../styles/MuiPagination.css'; // Import pagination styles

// SearchResultsPage component that handles display and functionality of anime search results
const SearchResultsPage = () => {
  // Get search query from URL parameters
  const [searchParams] = useSearchParams(); // Destructure the searchParams object from the useSearchParams hook to read the query parameter
  const query = searchParams.get('q'); // Extracts the value of the 'q' parameter from the URL's query string
  // State management for search results, loading state, and error handling
  const [results, setResults] = useState([]); // State to store results from the API
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Custom hook for managing watchlist functionality
  const { toast, setToast } = useWatchlist();
  // Pagination state
  const [page, setPage] = useState(1);              // Current page number
  const [totalPages, setTotalPages] = useState(0);  // Total number of pages available

  // Effect hook to fetch search results when the query changes
  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return; // Don't fetch results if there's no query
      
      try {
        setLoading(true); // Set loading state while fetching results
        // Add pagination parameters to API call
        const response = await fetch(
          `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&page=${page}&limit=20`
        );
        const data = await response.json(); // Parse the JSON response
        setResults(data.data); // Update the results state with data property of the response object
        // Calculate total pages from API response
        setTotalPages(Math.ceil(data.pagination.items.total / 20));
      } catch (error) {
        setError(`Failed to fetch results: ${error.message}`); // Handle and display errors during fetch
      } finally {
        setLoading(false); // Reset loading state after fetching results regardless of outcome
      }
    };

    fetchResults();
  }, [query, page]); // Re-run the fetch when the query or page changes

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

  return (
    <div className="search-page">
      {/* Search bar component for new searches */}
      <div className="search-bar-container">
        <SearchBar />
      </div>

      {/* Loading and error states */}
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}

      {/* Display search results if query is present and there are no errors */}
      {query && !loading && !error && (
        <>
          <h2 className="search-title">Search Results for: {query}</h2>
          <div className="search-results">
            {/* Map through the results and display each anime card */}
            {results.map((anime) => (
              <AnimeCard 
                key={anime.mal_id} 
                anime={anime} 
                onWatchlistUpdate={handleWatchlistUpdate}
              />
            ))}
          </div>
          {/* Pagination section - only show if we have results */}
          {results.length > 0 && (
            <div className="pagination">
              <Pagination 
                count={totalPages}        // Total number of pages
                page={page}               // Current active page
                onChange={handlePageChange} // Function to call when page changes
                color="primary"           // Use primary theme color
                size="large"              // Make pagination buttons larger
                showFirstButton           // Show button to jump to first page
                showLastButton            // Show button to jump to last page
              />
            </div>
          )}
        </>
      )}
      
      {!query && !loading && (
        <div className="empty-message">
          Enter a search term to find anime
        </div>
      )}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default SearchResultsPage;
