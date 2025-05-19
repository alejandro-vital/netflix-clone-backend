const express = require('express');
const router = express.Router();
const {
  getTrending,
  getPopular,
  getTopRated,
  getUpcoming,
  getMovieDetails,
  searchMovies,
  getMoviesByGenre,
  getGenres,
  getImageUrl
} = require('../controllers/movies.controller');

// Rutas públicas (no requieren autesnticación)
router.get('/trending', getTrending);
router.get('/popular', getPopular);
router.get('/top-rated', getTopRated);
router.get('/upcoming', getUpcoming);
router.get('/details/:id', getMovieDetails);
router.get('/search', searchMovies);
router.get('/genre', getMoviesByGenre);
router.get('/genres', getGenres);
router.get('/image/:size/:path', getImageUrl);

module.exports = router;