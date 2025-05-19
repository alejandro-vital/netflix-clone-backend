require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log('API endpoints:');
  console.log('- POST /api/auth/register - Registrar un nuevo usuario');
  console.log('- POST /api/auth/login - Iniciar sesión');
  console.log('- GET /api/auth/profile - Obtener perfil del usuario');
  console.log('- POST /api/favorites/movies/add - Agregar película a favoritos');
  console.log('- GET /api/favorites/movies/list - Listar películas favoritas');
});