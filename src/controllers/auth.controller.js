const { registerSchema, loginSchema } = require('../validators/auth.validator');
const authService = require('../services/auth.service');

const register = async (req, res, next) => {
  try {
    await registerSchema.validateAsync(req.body);
    const user = await authService.createUser(req.body.name, req.body.email, req.body.password);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    await loginSchema.validateAsync(req.body);
    const token = await authService.authenticateUser(req.body.email, req.body.password);
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
