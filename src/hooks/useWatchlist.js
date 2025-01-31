import { useState, useEffect } from 'react';
import { createAnimeRecord, deleteAnimeRecord, fetchWatchlist } from '../services/airtable';

export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadWatchlist();
  }, []);

  const loadWatchlist = async () => {
    try {
      setLoading(true);
      const data = await fetchWatchlist();
      setWatchlist(data);
    } catch (err) {
      setError('Failed to load watchlist');
    } finally {
      setLoading(false);
    }
  };

  const isInWatchlist = (animeId) => {
    return watchlist.some(item => item.mal_id === animeId);
  };

  const handleWatchlistToggle = async (anime) => {
    try {
      if (isInWatchlist(anime.mal_id)) {
        const recordToDelete = watchlist.find(item => item.mal_id === anime.mal_id);
        await deleteAnimeRecord(recordToDelete.airtableId);
        setWatchlist(watchlist.filter(item => item.mal_id !== anime.mal_id));
        setToast('Removed from Watchlist');
      } else {
        const newRecord = await createAnimeRecord(anime);
        setWatchlist([...watchlist, newRecord]);
        setToast('Added to Watchlist');
      }
    } catch (err) {
      setToast('Error updating watchlist');
      console.error('Watchlist update error:', err);
    }
  };

  return {
    watchlist,
    loading,
    error,
    toast,
    setToast,
    isInWatchlist,
    handleWatchlistToggle
  };
}; 