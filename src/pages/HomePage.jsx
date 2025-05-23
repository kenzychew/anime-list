import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Add useParams and useNavigate
import Pagination from '@mui/material/Pagination'; // Import Material UI's Pagination component
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Toast from '../components/Toast/Toast';
import { Link } from 'react-router-dom';
import { useWatchlist } from '../hooks/useWatchlist';
import '../styles/SearchResults.css';
import '../styles/MuiPagination.css';  // Import the new CSS file

// Define genres with their IDs (https://api.jikan.moe/v4/genres/anime)
const genres = [
  { id: 0, name: 'All Genres' },
  { id: 1, name: 'Action' },
  { id: 2, name: 'Adventure' },
  { id: 4, name: 'Comedy' },
  { id: 7, name: 'Mystery' },
  { id: 8, name: 'Drama' },
  { id: 10, name: 'Fantasy' },
  { id: 14, name: 'Horror' },
  { id: 18, name: 'Mecha' },
  { id: 20, name: 'Parody' },
  { id: 22, name: 'Romance' },
  { id: 24, name: 'Sci-Fi' },
  { id: 30, name: 'Sports' },
  { id: 36, name: 'Slice of Life' },
  { id: 37, name: 'Supernatural' },
  { id: 38, name: 'Military' },
  { id: 40, name: 'Thriller' },
  { id: 71, name: 'Pets' },
];

// Define sort options
const sortOptions = [
  { value: 'score', label: 'Score (Default)' },
  { value: 'popularity', label: 'Popularity' },
  { value: 'favorites', label: 'Favorites' }
];

const HomePage = () => {
  const { name } = useParams(); // Get genre name from URL
  const navigate = useNavigate(); // For URL navigation
  
  // Initialize state variables using useState hook
  const [results, setResults] = useState([]); // Stores list of top anime
  const [loading, setLoading] = useState(true); // Manages loading state
  const [error, setError] = useState(null); // Handles potential errors
  
  // Destructuring to extract specific functions/state from useWatchlist hook
  const { 
    toast, // State variable that holds current toast message (null or string)
    setToast, 
    isInWatchlist, // Helper function to check if anime is in watchlist (isInWatchlist(anime.mal_id) returns true or false)
    handleWatchlistToggle // Function that adds/removes anime from watchlist by making API calls to Airtable
  } = useWatchlist();

  // Pagination state
  const [page, setPage] = useState(1);              // Current page number
  const [totalPages, setTotalPages] = useState(0);  // Total number of pages available
  const [selectedGenre, setSelectedGenre] = useState(0); // Default to 'All Genres'
  const [selectedSort, setSelectedSort] = useState('score'); // Default to sort by score

  // Fetch top anime data when component mounts
  useEffect(() => {
    // Add inner async function to fetch top anime data from Jikan API
    const fetchTopAnime = async () => {
      try {
        setLoading(true); // Set loading state to true
        // Modify URL to include genre filter if a genre is selected
        const genreParam = selectedGenre !== 0 ? `&genres=${selectedGenre}` : '';
        // Only use ascending order for popularity
        const sortOrder = selectedSort === 'popularity' ? 'asc' : 'desc';
        
        const response = await fetch(
          `https://api.jikan.moe/v4/anime?page=${page}&limit=20${genreParam}&order_by=${selectedSort}&sort=${sortOrder}`
        );
        const data = await response.json(); // Parses JSON response into JS object, await needed bc .json() is an async function
        // Filter out anime with popularity #0
        const filteredData = data.data.filter(anime => anime.popularity !== 0);
        setResults(filteredData); // Update state with anime data, data.data bc Jikan API wraps results in a data property
        // Calculate total pages from API response
        setTotalPages(Math.ceil(data.pagination.items.total / 20));
      } catch (error) { 
        setError(`Failed to fetch anime: ${error.message}`); // Set error state with error message, used to display error message in UI
      } finally {
        setLoading(false); // Runs whether fetch is successful or not
      }
    };
    // Call fetchTopAnime function when component mounts
    fetchTopAnime();
  }, [page, selectedGenre, selectedSort]); // Add selectedGenre and selectedSort to dependencies

  // Update URL when genre changes
  const handleGenreChange = (event) => {
    const genreId = event.target.value;
    setSelectedGenre(genreId);
    setPage(1);
    
    // Find genre name and update URL
    if (genreId === 0) {
      navigate('/'); // Remove genre from URL if "All Genres"
    } else {
      const selectedGenre = genres.find(g => g.id === genreId);
      navigate(`/genre/${selectedGenre.name}`);
    }
  };

  // Set selected genre based on URL
  useEffect(() => {
    if (name) {
      const genre = genres.find(g => g.name.toLowerCase() === name.toLowerCase());
      if (genre) {
        setSelectedGenre(genre.id);
      }
    }
  }, [name]); // Run when URL genre changes

  const handlePageChange = (event, value) => {
    setPage(value);                // Update current page state
  };

  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
    setPage(1); // Reset to first page when sort changes
  };

  // Loading and error states
  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="search-page">
      <div className="page-header">
        <h1 className="search-title">Top Anime</h1>
        <div className="filter-controls">
        <FormControl sx={{ minWidth: 200, mr: 2 }}>
            <InputLabel id="sort-select-label">Sort By</InputLabel>
            <Select
              labelId="sort-select-label"
              id="sort-select"
              value={selectedSort}
              label="Sort By"
              onChange={handleSortChange}
            >
              {sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="genre-select-label">Genre</InputLabel>
            <Select

              labelId="genre-select-label"
              id="genre-select"
              value={selectedGenre}
              label="Genre"
              onChange={handleGenreChange}
            >
              {genres.map((genre) => (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="search-results">
        {results.map((anime) => (
          <div key={anime.mal_id} className="anime-card">
            <img
              src={anime.images?.jpg?.image_url}
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
            <button // This button handles asynchronous operations with Airtable
              onClick={async () => { // Event handler for checking anime is already in watchlist
                const action = isInWatchlist(anime.mal_id) ? 'remove' : 'add'; // Sets action to 'remove' or 'add' based on current state
                await handleWatchlistToggle(anime); // Calls handleWatchlistToggle to update Airtable database
                setToast(action === 'add' ? 'Added to Watchlist' : 'Removed from Watchlist'); // Sets toast message based on action
              }}
              className={`watchlist-button ${isInWatchlist(anime.mal_id) ? 'remove' : ''}`} // Dynamic styling by adding remove class if anime is in watchlist
            > 
              {isInWatchlist(anime.mal_id) ? 'Remove from Watchlist' : 'Add to Watchlist' /*Dynamic text based on watchlist state*/} 
            </button>
          </div>
        ))}
      </div>
      <div className="pagination">
        <Pagination 
          count={totalPages}        
          page={page}              
          onChange={handlePageChange} 
          color="primary"          
          size="large"             
          showFirstButton          
          showLastButton           
        />
      </div>
      {/* Toast notification */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default HomePage;

// https://mui.com/material-ui/api/pagination/
// https://mui.com/material-ui/api/form-control/
// https://mui.com/material-ui/api/select/
// https://mui.com/material-ui/api/input-label/
// https://mui.com/material-ui/api/menu-item/


