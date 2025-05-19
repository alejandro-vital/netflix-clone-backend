const express = require('express');
const router = express.Router();
const { addMovieToFavorites, getFavoriteMovies } = require('../controllers/favorite-movies.controller');
const verifyToken = require('../middlewares/auth.middleware');

router.post('/movies/add', verifyToken, addMovieToFavorites);
router.get('/movies/list', verifyToken, getFavoriteMovies);

module.exports = router;


