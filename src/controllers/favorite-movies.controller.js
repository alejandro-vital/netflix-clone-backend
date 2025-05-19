const favoriteMovieService = require('../services/favorite-movies.service');

const addMovieToFavorites = async (req, res, next) => {
  try {
    const { movieId, title, posterUrl, overview } = req.body || {};
    const userId = req.userId;

    if (!movieId || !title || !posterUrl || !overview) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    const favorite = await favoriteMovieService.addMovieToFavorites(userId, movieId, title, posterUrl, overview);
    res.status(201).json(favorite);
  } catch (err) {
    next(err);
  }
}

const getFavoriteMovies = async (req, res, next) => {
  try {
    const userId = req.userId;
    const favorites = await favoriteMovieService.getFavoriteMovies(userId);
    res.json(favorites);
  } catch (err) {
    next(err);
  }
}


module.exports = { addMovieToFavorites, getFavoriteMovies};
