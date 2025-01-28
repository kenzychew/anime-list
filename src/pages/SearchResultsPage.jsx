import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import SearchBar from '../components/Layout/SearchBar';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&sfw=true`
        );
        const data = await response.json();
        setResults(data.data);
      } catch (err) {
        setError('Failed to fetch results. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <SearchBar />
      </div>
      
      {loading && <div className="text-center py-8">Loading...</div>}
      {error && <div className="text-center py-8 text-red-500">{error}</div>}
      
      {query && !loading && !error && (
        <>
          <h2 className="text-2xl font-bold mb-4">Search Results for: {query}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((anime) => (
              <div
                key={anime.mal_id}
                className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <img
                  src={anime.images.jpg.image_url}
                  alt={anime.title}
                  className="w-full h-64 object-cover rounded-md"
                />
                <Link 
                  to={`/anime/${anime.mal_id}`}
                  className="block mt-2 hover:text-blue-600"
                >
                  <h3 className="text-xl font-semibold">{anime.title}</h3>
                </Link>
                <p className="text-gray-600 mt-1">{anime.type} • {anime.episodes} episodes</p>
              </div>
            ))}
          </div>
        </>
      )}
      
      {!query && !loading && (
        <div className="text-center text-gray-600">
          Enter a search term to find anime
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
