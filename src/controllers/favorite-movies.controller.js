// src/controllers/favorite-movies.controller.js (ajustado)
const favoriteMovieService = require('../services/favorite-movies.service');

/**
 * Agregar una película a favoritos
 */
const addMovieToFavorites = async (req, res, next) => {
  try {
    const { movieId, title, posterUrl, overview } = req.body || {};
    const userId = req.userId; // Añadido por el middleware de autenticación

    // Validar datos requeridos
    if (!movieId || !title || !posterUrl) {
      return res.status(400).json({ 
        error: 'Se requieren los campos movieId, title y posterUrl' 
      });
    }

    // Verificar si la película ya está en favoritos
    const existingFavorite = await favoriteMovieService.findFavorite(userId, movieId);
    
    if (existingFavorite) {
      return res.status(409).json({ 
        error: 'Esta película ya está en tus favoritos',
        favorite: existingFavorite
      });
    }

    // Agregar la película a favoritos
    const favorite = await favoriteMovieService.addMovieToFavorites(
      userId, 
      movieId, 
      title, 
      posterUrl, 
      overview || ''
    );
    
    res.status(201).json({
      message: 'Película agregada a favoritos',
      favorite
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Obtener lista de películas favoritas
 */
const getFavoriteMovies = async (req, res, next) => {
  try {
    const userId = req.userId; // Añadido por el middleware de autenticación
    
    const favorites = await favoriteMovieService.getFavoriteMovies(userId);
    
    res.json(favorites);
  } catch (err) {
    next(err);
  }
};

/**
 * Eliminar una película de favoritos
 */
const removeFromFavorites = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const userId = req.userId;

    if (!movieId) {
      return res.status(400).json({ error: 'Se requiere el ID de la película' });
    }

    console.log(`Eliminando película ${movieId} para el usuario ${userId}`);
    
    const result = await favoriteMovieService.removeFromFavorites(userId, parseInt(movieId));
    
    if (!result) {
      return res.status(404).json({ error: 'Película no encontrada en tus favoritos' });
    }
    
    res.json({ 
      message: 'Película eliminada de favoritos',
      movieId: parseInt(movieId) 
    });
  } catch (err) {
    console.error('Error al eliminar de favoritos:', err);
    next(err);
  }
};

module.exports = { 
  addMovieToFavorites, 
  getFavoriteMovies,
  removeFromFavorites
};