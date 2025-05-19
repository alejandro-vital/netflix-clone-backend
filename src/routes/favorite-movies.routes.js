// src/routes/favorite-movies.routes.js (corregido)
const express = require('express');
const router = express.Router();
const { 
  addMovieToFavorites, 
  getFavoriteMovies,
  removeFromFavorites
} = require('../controllers/favorite-movies.controller');
const verifyToken = require('../middlewares/auth.middleware');

// Todas las rutas requieren autenticación
router.use(verifyToken);

// Rutas de películas favoritas
router.post('/movies/add', addMovieToFavorites);
router.get('/movies/list', getFavoriteMovies);
router.delete('/movies/:movieId', removeFromFavorites);

module.exports = router;