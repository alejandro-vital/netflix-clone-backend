const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.isJoi) {
    return res.status(400).json({ error: err.details[0].message });
  }

  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor',
  });
};

module.exports = errorHandler;
