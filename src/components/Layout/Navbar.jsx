import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold hover:text-blue-200">
            Anime List
          </Link>
          <div className="flex items-center space-x-6">
            <Link to="/search" className="hover:text-blue-200">
              Search
            </Link>
            <Link to="/watchlist" className="hover:text-blue-200">
              Watchlist
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
