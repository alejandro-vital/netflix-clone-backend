const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const favoriteMoviesRoutes = require('./routes/favorite-movies.routes');
const errorHandler = require('./middlewares/error.middleware');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoriteMoviesRoutes);

// Manejo de errores centralizado
app.use(errorHandler);

module.exports = app;
