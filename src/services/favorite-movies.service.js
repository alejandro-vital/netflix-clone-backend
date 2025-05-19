const prisma = require('../config/prisma');

/**
 * Buscar si una película ya está en favoritos
 */
const findFavorite = async (userId, movieId) => {
  return prisma.favorite.findUnique({
    where: {
      userId_movieId: {
        userId,
        movieId: parseInt(movieId)
      }
    }
  });
};

/**
 * Agregar una película a favoritos
 */
const addMovieToFavorites = async (userId, movieId, title, posterUrl, overview) => {
  return prisma.favorite.create({
    data: {
      userId,
      movieId: parseInt(movieId),
      title,
      posterUrl,
      overview,
    },
  });
};

/**
 * Obtener lista de películas favoritas
 */
const getFavoriteMovies = async (userId) => {
  return prisma.favorite.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
};

/**
 * Eliminar una película de favoritos
 */
const removeFromFavorites = async (userId, movieId) => {
  try {
    console.log(`Servicio: Eliminando película con ID ${movieId} para usuario ${userId}`);
    
    const parsedMovieId = parseInt(movieId, 10);
    
    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_movieId: {
          userId,
          movieId: parsedMovieId
        }
      }
    });
    
    if (!favorite) {
      console.log(`No se encontró película ${parsedMovieId} para usuario ${userId}`);
      return null;
    }
    
    console.log(`Encontrado favorito ${favorite.id}, procediendo a eliminar`);
    
    return await prisma.favorite.delete({
      where: {
        userId_movieId: {
          userId,
          movieId: parsedMovieId
        }
      }
    });
  } catch (error) {
    console.error('Error en removeFromFavorites:', error);
    if (error.code === 'P2025') {
      return null;
    }
    throw error;
  }
};

module.exports = { 
  findFavorite,
  addMovieToFavorites, 
  getFavoriteMovies,
  removeFromFavorites 
};