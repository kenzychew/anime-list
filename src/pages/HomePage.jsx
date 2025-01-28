import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [topAnime, setTopAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopAnime = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.jikan.moe/v4/top/anime?filter=airing');
        const data = await response.json();
        setTopAnime(data.data);
      } catch (err) {
        setError('Failed to fetch top anime. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTopAnime();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Top Airing Anime
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topAnime.map((anime) => (
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
            <div className="flex justify-between items-center mt-1 text-gray-600">
              <span>Score: {anime.score}</span>
              <span>Rank #{anime.rank}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
