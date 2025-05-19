const axios = require('axios');

// Configuración base para todas las peticiones a TheMovieDB
const tmdbApi = axios.create({
  baseURL: process.env.TMDB_API_BASE_URL,
  params: {
    api_key: process.env.TMDB_API_KEY,
    language: 'es-MX'
  }
});

/**
 * Obtiene películas en tendencia
 */
const getTrending = async (req, res, next) => {
  try {
    const { page = 1 } = req.query;
    const response = await tmdbApi.get('/trending/movie/week', {
      params: { page }
    });
    res.json(response.data);
  } catch (err) {
    next(err);
  }
};

/**
 * Obtiene películas populares
 */
const getPopular = async (req, res, next) => {
  try {
    const { page = 1 } = req.query;
    const response = await tmdbApi.get('/movie/popular', {
      params: { page }
    });
    res.json(response.data);
  } catch (err) {
    next(err);
  }
};

/**
 * Obtiene películas mejor valoradas
 */
const getTopRated = async (req, res, next) => {
  try {
    const { page = 1 } = req.query;
    const response = await tmdbApi.get('/movie/top_rated', {
      params: { page }
    });
    res.json(response.data);
  } catch (err) {
    next(err);
  }
};

/**
 * Obtiene películas próximas a estrenarse
 */
const getUpcoming = async (req, res, next) => {
  try {
    const { page = 1 } = req.query;
    const response = await tmdbApi.get('/movie/upcoming', {
      params: { page }
    });
    res.json(response.data);
  } catch (err) {
    next(err);
  }
};

/**
 * Obtiene detalles de una película
 */
const getMovieDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await tmdbApi.get(`/movie/${id}`, {
      params: {
        append_to_response: 'videos,credits,similar'
      }
    });
    res.json(response.data);
  } catch (err) {
    next(err);
  }
};

/**
 * Busca películas
 */
const searchMovies = async (req, res, next) => {
  try {
    const { query, page = 1 } = req.query;
    
    if (!query) {
      return res.status(400).json({ error: 'El parámetro query es requerido' });
    }
    
    const response = await tmdbApi.get('/search/movie', {
      params: {
        query,
        page,
        include_adult: false
      }
    });
    res.json(response.data);
  } catch (err) {
    next(err);
  }
};

/**
 * Obtiene películas por género
 */
const getMoviesByGenre = async (req, res, next) => {
  try {
    const { genreId, page = 1 } = req.query;
    
    if (!genreId) {
      return res.status(400).json({ error: 'El parámetro genreId es requerido' });
    }
    
    const response = await tmdbApi.get('/discover/movie', {
      params: {
        with_genres: genreId,
        page
      }
    });
    res.json(response.data);
  } catch (err) {
    next(err);
  }
};

/**
 * Obtiene lista de géneros
 */
const getGenres = async (req, res, next) => {
  try {
    const response = await tmdbApi.get('/genre/movie/list');
    res.json(response.data);
  } catch (err) {
    next(err);
  }
};

/**
 * Obtiene la URL de la imagen
 */
const getImageUrl = (req, res) => {
  const { path, size = 'original' } = req.params;
  
  if (!path) {
    return res.status(400).json({ error: 'El parámetro path es requerido' });
  }
  
  const imageUrl = `${process.env.TMDB_IMAGE_BASE_URL}/${size}${path}`;
  
  res.json({ url: imageUrl });
};

module.exports = {
  getTrending,
  getPopular,
  getTopRated,
  getUpcoming,
  getMovieDetails,
  searchMovies,
  getMoviesByGenre,
  getGenres,
  getImageUrl
};