const { registerSchema, loginSchema } = require('../validators/auth.validator');
const authService = require('../services/auth.service');

/**
 * Registra un nuevo usuario
 */
const register = async (req, res, next) => {
  try {
    // Validar datos de entrada
    await registerSchema.validateAsync(req.body);
    
    // Verificar si el email ya existe
    const { name, email, password } = req.body;
    
    // Crear usuario
    const user = await authService.createUser(name, email, password);
    
    // Responder con el usuario creado (sin la contraseña)
    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user
    });
  } catch (err) {
    // Si el error es de Joi, ya está formateado en el middleware de errores
    // Si el error es específico de email duplicado, formateamos el mensaje
    if (err.code === 'P2002' && err.meta?.target?.includes('email')) {
      return next({
        status: 400,
        message: 'El email ya está registrado'
      });
    }
    next(err);
  }
};

/**
 * Inicia sesión de un usuario
 */
const login = async (req, res, next) => {
  try {
    // Validar datos de entrada
    await loginSchema.validateAsync(req.body);
    
    // Autenticar usuario
    const { email, password } = req.body;
    const token = await authService.authenticateUser(email, password);
    
    // Responder con el token JWT
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

/**
 * Obtiene el perfil del usuario autenticado
 */
const getProfile = async (req, res, next) => {
  try {
    // El middleware de autenticación ya añadió req.userId
    const profile = await authService.getUserProfile(req.userId);
    res.json(profile);
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, getProfile };