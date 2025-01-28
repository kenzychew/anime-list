import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const AnimeDetailPage = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
        const data = await response.json();
        setAnime(data.data);
      } catch (err) {
        setError('Failed to fetch anime details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeDetails();
  }, [id]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!anime) return <div className="text-center py-8">Anime not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img
              src={anime.images.jpg.large_image_url}
              alt={anime.title}
              className="w-full h-auto"
            />
          </div>
          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{anime.title}</h1>
            {anime.title_english && anime.title_english !== anime.title && (
              <h2 className="text-xl text-gray-600 mb-4">{anime.title_english}</h2>
            )}
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-gray-600"><span className="font-semibold">Score:</span> {anime.score}</p>
                <p className="text-gray-600"><span className="font-semibold">Rank:</span> #{anime.rank}</p>
                <p className="text-gray-600"><span className="font-semibold">Popularity:</span> #{anime.popularity}</p>
              </div>
              <div>
                <p className="text-gray-600"><span className="font-semibold">Status:</span> {anime.status}</p>
                <p className="text-gray-600"><span className="font-semibold">Episodes:</span> {anime.episodes}</p>
                <p className="text-gray-600"><span className="font-semibold">Duration:</span> {anime.duration}</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Synopsis</h3>
              <p className="text-gray-600">{anime.synopsis}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Information</h3>
              <p className="text-gray-600"><span className="font-semibold">Type:</span> {anime.type}</p>
              <p className="text-gray-600"><span className="font-semibold">Aired:</span> {anime.aired.string}</p>
              <p className="text-gray-600"><span className="font-semibold">Rating:</span> {anime.rating}</p>
              <p className="text-gray-600">
                <span className="font-semibold">Genres:</span>{' '}
                {anime.genres.map(genre => genre.name).join(', ')}
              </p>
            </div>

            {anime.trailer.embed_url && (
              <div>
                <h3 className="text-xl font-semibold mb-2">Trailer</h3>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={anime.trailer.embed_url}
                    title="Trailer"
                    allowFullScreen
                    className="w-full h-64 rounded-lg"
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetailPage;
