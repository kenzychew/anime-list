import { useState, useEffect } from 'react';
import { createAnimeRecord, deleteAnimeRecord, fetchWatchlist } from '../services/airtable';
/**
 * Custom hook for managing an anime watchlist with Airtable integration
 * 
 * @returns {Object} An object containing:
 *   - watchlist: Array of anime items in the watchlist
 *   - loading: Boolean indicating if data is being loaded
 *   - error: String containing error message if any
 *   - toast: String containing notification message
 *   - setToast: Function to update toast message
 *   - isInWatchlist: Function to check if an anime is in watchlist
 *   - handleWatchlistToggle: Function to add/remove anime from watchlist
 */
export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState([]); // Stores the list of anime
  const [loading, setLoading] = useState(true); // Loading state indicator
  const [error, setError] = useState(null); // Error state management
  const [toast, setToast] = useState(null); // Notification message state
  
  // Load watchlist data when the hook is initialized
  useEffect(() => {
    loadWatchlist();
  }, []);

  /**
   * Fetches the watchlist data from Airtable
   * Sets loading state while fetching and handles any errors
   */
  const loadWatchlist = async () => {
    try {
      setLoading(true);
      const data = await fetchWatchlist();
      setWatchlist(data);
    } catch (error) {
      setError(`Failed to load watchlist: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Checks if an anime is already in the watchlist
   * @param {number} animeId - The MAL ID of the anime to check
   * @returns {boolean} True if anime is in watchlist, false otherwise
   */
  const isInWatchlist = (animeId) => {
    return watchlist.some(item => item.mal_id === animeId);
  };

  /**
   * Toggles an anime's presence in the watchlist (add/remove)
   * @param {Object} anime - The anime object to toggle
   * @param {number} anime.mal_id - MyAnimeList ID of the anime
   * 
   * If the anime is already in the watchlist:
   * - Removes it from Airtable and local state
   * - Shows "Removed from Watchlist" toast
   * 
   * If the anime is not in the watchlist:
   * - Adds it to Airtable and local state
   * - Shows "Added to Watchlist" toast
   */
  const handleWatchlistToggle = async (anime) => {
    try {
      if (isInWatchlist(anime.mal_id)) {
        // Remove the anime from the watchlist
        const recordToDelete = watchlist.find(item => item.mal_id === anime.mal_id);
        await deleteAnimeRecord(recordToDelete.airtableId);
        setWatchlist(watchlist.filter(item => item.mal_id !== anime.mal_id));
        setToast('Removed from Watchlist');
      } else {
        // Add the anime to the watchlist
        const newRecord = await createAnimeRecord(anime);
        setWatchlist([...watchlist, newRecord]);
        setToast('Added to Watchlist');
      }
    } catch (err) {
      setToast('Error updating watchlist');
      console.error('Watchlist update error:', err);
    }
  };
  
  // Return the hook's state and functions for use in components
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