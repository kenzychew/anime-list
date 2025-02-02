import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/SearchBar.css';

const SearchBar = () => {
  // State to store and update the search input value
  const [searchQuery, setSearchQuery] = useState('');
  // Use the navigate function to change routes
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh when form is submitted
    if (searchQuery.trim()) { // Validate that the search query is not empty
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`); // Navigate to the search results page with the search query
    } // encodeURIComponent is used to encode the search query so it can be used in the URL
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value); // Update the search query state with the input value
  };

  return (
    <form onSubmit={handleSubmit} className="search-form"> {/* Form to submit the search query */}

      <div className="search-container">
        <input
          type="text"
          value={searchQuery} // Input value is controlled by the searchQuery state
          onChange={handleChange} // Changes the search query state when the input value changes
          placeholder="Search for anime..."
          className="search-input" 
        />

        <button
          type="submit"
          className="search-button"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;