// src/app.js (actualizado)
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const favoriteMoviesRoutes = require('./routes/favorite-movies.routes');
const moviesRoutes = require('./routes/movies.routes'); // Nueva ruta de películas
const errorHandler = require('./middlewares/error.middleware');

const app = express();

// Configuración de CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoriteMoviesRoutes);
app.use('/api/movies', moviesRoutes); // Agregamos las rutas de películas

// Ruta de prueba para verificar que el servidor está funcionando
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'API funcionando correctamente',
    environment: process.env.NODE_ENV
  });
});

// Manejo de errores centralizado
app.use(errorHandler);

module.exports = app;