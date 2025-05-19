const { registerSchema, loginSchema } = require('../validators/auth.validator');
const authService = require('../services/auth.service');

/**
 * Registra un nuevo usuario
 */
const register = async (req, res, next) => {
  try {

    await registerSchema.validateAsync(req.body);
    const { name, email, password } = req.body;
    const user = await authService.createUser(name, email, password);
  
    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user
    });
  } catch (err) {
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
   
    await loginSchema.validateAsync(req.body);
    const { email, password } = req.body;
    const token = await authService.authenticateUser(email, password);
    
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const profile = await authService.getUserProfile(req.userId);
    res.json(profile);
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, getProfile };