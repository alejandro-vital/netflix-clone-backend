const prisma = require('../config/prisma');

const addMovieToFavorites = async (userId, movieId, title, posterUrl, overview) => {
  const favorite = await prisma.favorite.create({
    data: {
        userId,
        movieId,
        title,
        posterUrl,
        overview,
      },
  });
  return favorite;
};

const getFavoriteMovies = async (userId) => {
  const favorites = await prisma.favorite.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
  return favorites;
}


module.exports = { addMovieToFavorites, getFavoriteMovies };
