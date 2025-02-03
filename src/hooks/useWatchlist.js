import { useState, useEffect } from 'react';
import { createAnimeRecord, deleteAnimeRecord, fetchWatchlist } from '../services/services';
/**
 * Custom hook for managing an anime watchlist with Airtable integration
 * 
 */
export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState([]); // Array of anime objects in watchlist
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

  // Helper function to check the watchlist array
  const isInWatchlist = (mal_id) => {
    return watchlist.some(item => item.mal_id === mal_id); //? Returns true if item with matching mal_id is found
  };

  //* This function maintains sync between Airtable and local state and has 2 flows:
  //*  1. Remove (Delete from Airtable and filter from local state)
  //*  2. Add (create new record in Airtable and add to local state)
  const handleWatchlistToggle = async (anime) => {
    try { // Checks if anime is already in watchlist
      if (isInWatchlist(anime.mal_id)) {
        // Find record to delete
        const recordToDelete = watchlist.find(item => item.mal_id === anime.mal_id); //? Returns first anime object in watchlist with matching mal_id
        // Delete from Airtable database
        await deleteAnimeRecord(recordToDelete.airtableId);
        // Update local watchlist state
        setWatchlist(watchlist.filter(item => item.mal_id !== anime.mal_id)); //? Filters out deleted items
        setToast('Removed from Watchlist');
      } else {
        // Create new record in Airtable
        const newRecord = await createAnimeRecord(anime);
        // Update local state by adding anime object to watchlist
        setWatchlist([...watchlist, newRecord]);
        setToast('Added to Watchlist');
      }
    } catch (err) {
      setToast('Error updating watchlist');
      console.error('Watchlist update error:', err);
    }
  };

  /**
   * Clears the entire watchlist
   * Removes all anime entries from Airtable and local state
   */
  const clearWatchlist = async () => {
    try {
      // Waits for all delete promises to complete
      await Promise.all( //? Promise.all runs all delete promises in parallel, waits for all deletes to finish before continuing
        watchlist.map(anime => deleteAnimeRecord(anime.airtableId)) //? Creates array of delete promises
      );
      // Clear local state only after all deletes are complete
      setWatchlist([]);
    } catch (err) {
      setToast('Error clearing watchlist');
      console.error('Watchlist clear error:', err);
    }
  };
  
  
  // Return the hook's state and functions for use in components
  return {
    watchlist, // Watchlist array containing anime objects
    loading, // Boolean indicating if data is being loaded
    error, // String containing error message if any
    toast, // String containing notification message
    setToast, // Function to update toast message
    isInWatchlist, // Helper function to check if anime is in watchlist
    handleWatchlistToggle, // Function that adds/removes anime from watchlist by making API calls to Airtable
    clearWatchlist // Function to clear the entire watchlist
  };
};