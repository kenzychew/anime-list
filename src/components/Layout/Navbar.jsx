import { Link } from 'react-router-dom';
import '../../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            Anime List
          </Link>
          <div className="navbar-links">
            <Link to="/search" className="navbar-link">
              Search
            </Link>
            <Link to="/watchlist" className="navbar-link">
              Watchlist
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
