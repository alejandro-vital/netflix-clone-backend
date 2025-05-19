const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/auth.controller');
const verifyToken = require('../middlewares/auth.middleware');

// Rutas de autenticación
router.post('/register', register);
router.post('/login', login);
router.get('/profile', verifyToken, getProfile);

module.exports = router;
