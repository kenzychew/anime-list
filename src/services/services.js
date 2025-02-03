const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const TABLE_NAME = 'Watchlist';
const API_URL = 'https://api.airtable.com/v0';

/**
 * Creates a new anime record in Airtable
 * Data flow: Component -> useWatchlist hook -> createAnimeRecord -> Airtable API
 * 
 * Takes in an anime object from the Jikan API
 * Returns the created record with the Airtable ID
 */
const createAnimeRecord = async (anime) => {
  try {
    console.log('Creating anime record:', anime);

    // Transform Jikan API data structure to match Airtable schema
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

    // Handle API errors
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Airtable API Error:', errorData);
      throw new Error(`Airtable API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    // Return created record with Airtable ID
    const data = await response.json();
    console.log('Airtable response:', data);
    return { ...anime, airtableId: data.id };
  } catch (error) {
    console.error('Error creating record:', error);
    throw error;
  }
};

/**
 * Deletes an anime record from Airtable
 * Data flow: Component -> useWatchlist hook -> deleteAnimeRecord -> Airtable API
 * 
 * Takes in an Airtable ID
 * Returns the deleted record
 */
const deleteAnimeRecord = async (airtableId) => {
  try {
    // Make DELETE request to Airtable API
    const response = await fetch(`${API_URL}/${AIRTABLE_BASE_ID}/${TABLE_NAME}/${airtableId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      }
    });

    // Handle API errors
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

/**
 * Fetches all anime records from Airtable
 * Data flow: Component -> useWatchlist hook -> fetchWatchlist -> Airtable API
 * 
 * Returns an array of anime records
 */
const fetchWatchlist = async () => {
  try {
    // Make GET request to Airtable API
    const response = await fetch(
      `${API_URL}/${AIRTABLE_BASE_ID}/${TABLE_NAME}`,
      {
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        }
      }
    );

    // Handle API errors
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Airtable API Error:', errorData);
      throw new Error(`Airtable API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    // Transform Airtable data structure to match app's expected format
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