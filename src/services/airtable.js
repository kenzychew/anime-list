/**
 * Airtable Integration Module
 * Handles CRUD operations for anime records in an Airtable database.
 * This module provides functions to create, delete, and fetch anime records
 * from a specified Airtable base.
 */

// Environment variables for Airtable configuration
const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const TABLE_NAME = 'Watchlist';
const API_URL = 'https://api.airtable.com/v0';


//* Creates a new anime record in Airtable
// Takes in anime object containing MAL data and returns the created anime record with airtableId
const createAnimeRecord = async (anime) => {
  try {
    console.log('Creating anime record:', anime);
    // Transform anime object into Airtable fields format
    const fields = {
      mal_id: Number(anime.mal_id),
      title: anime.title,
      type: anime.type,
      episodes: Number(anime.episodes),
      image_url: anime.images.jpg.image_url,
      score: Number(anime.score),
      rank: Number(anime.rank),
      popularity: Number(anime.popularity),
    };

    console.log('Sending fields to Airtable:', fields);
    // Make POST request to Airtable API
    const response = await fetch(`${API_URL}/${AIRTABLE_BASE_ID}/${TABLE_NAME}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fields })
    });
    // Handle error responses from Airtable
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Airtable API Error:', errorData);
      throw new Error(`Airtable API error: ${errorData.error?.message || 'Unknown error'}`);
    }
    // Process successful response
    const data = await response.json();
    console.log('Airtable response:', data);
    return { ...anime, airtableId: data.id }; // Spreads all properties from original anime object and adds a new property airtableId set to the ID that Airtable generated
  } catch (error) {
    console.error('Error creating record:', error);
    throw error;
  }
};
/* Example of object returned
{
  mal_id: 5114,
  title: "Fullmetal Alchemist: Brotherhood",
  type: "TV",
  episodes: 64,
  // ... other original anime properties ...
  airtableId: "rec7F9XIUZYx3x4Xm" // <- The new Airtable ID
}*/

//* Deletes an anime record from Airtable
const deleteAnimeRecord = async (airtableId) => {
  try {
    // Make DELETE request to Airtable API
    const response = await fetch(`${API_URL}/${AIRTABLE_BASE_ID}/${TABLE_NAME}/${airtableId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      }
    });
    // Handles error response from Airtable
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Airtable API Error:', errorData);
      throw new Error(`Airtable API error: ${errorData.error?.message || 'Unknown error'}`);
    }
  } catch (error) {
    console.error('Error deleting record:', error);
    throw error;
  }
};


//* Fetches all anime records from the watchlist
const fetchWatchlist = async () => {
  try {
    const response = await fetch(
      `${API_URL}/${AIRTABLE_BASE_ID}/${TABLE_NAME}`,
      {
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        }
      }
    );
    // Handle error responses from Airtable
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Airtable API Error:', errorData);
      throw new Error(`Airtable API error: ${errorData.error?.message || 'Unknown error'}`);
    }
    // Transforms Airtable records back into MAL-compatible format
    const data = await response.json();
    return data.records.map(record => ({
      ...record.fields,
      airtableId: record.id,
      mal_id: parseInt(record.fields.mal_id),
      images: {
        jpg: {
          image_url: record.fields.image_url
        }
      }
    }));
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    throw error;
  }
};

export { createAnimeRecord, deleteAnimeRecord, fetchWatchlist }; 