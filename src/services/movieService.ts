import axios from 'axios';

const fetchMovies = async (term) => {
  try {
    const response = await axios.get(`https://itunes.apple.com/search?term=${term}&country=au&media=movie&all`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies", error);
    return [];
  }
};

export default fetchMovies;
