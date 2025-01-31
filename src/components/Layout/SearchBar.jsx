import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/SearchBar.css';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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