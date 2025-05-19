const errorHandler = (err, req, res, next) => {
  
  console.error('ERROR:', err);

  // Errores de Axios (para las peticiones proxy a TheMovieDB)
  if (err.isAxiosError) {
    const status = err.response?.status || 500;
    const message = err.response?.data?.status_message || 'Error en la API externa';
    
    return res.status(status).json({
      error: message
    });
  }

  // Errores de validación de Joi
  if (err.isJoi) {
    return res.status(400).json({ 
      error: err.details[0].message 
    });
  }

  // Errores de Prisma
  if (err.name === 'PrismaClientKnownRequestError') {
    if (err.code === 'P2002') {
      return res.status(409).json({
        error: `Ya existe un registro con ese ${err.meta.target.join(', ')}`
      });
    }
    
    return res.status(400).json({
      error: 'Error en la base de datos'
    });
  }

  // Error personalizado con status
  if (err.status) {
    return res.status(err.status).json({
      error: err.message
    });
  }

  // Error genérico
  res.status(500).json({
    error: err.message || 'Error interno del servidor'
  });
};

module.exports = errorHandler;