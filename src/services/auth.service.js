// src/services/auth.service.js (actualizado)
const prisma = require('../config/prisma');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * Crear un nuevo usuario
 */
const createUser = async (name, email, password) => {
  try {
    // Hashear la contraseña
    const hashed = await bcrypt.hash(password, 10);
    
    // Crear el usuario en la base de datos
    const user = await prisma.user.create({
      data: { 
        name, 
        email: email.toLowerCase(), 
        password: hashed 
      },
      select: { 
        id: true, 
        name: true, 
        email: true 
      },
    });
    
    return user;
  } catch (error) {
    // Reenviar el error para manejarlo en el controlador
    throw error;
  }
};

/**
 * Autenticar usuario y generar JWT
 */
const authenticateUser = async (email, password) => {
  // Buscar usuario por email
  const user = await prisma.user.findUnique({ 
    where: { email: email.toLowerCase() } 
  });
  
  // Si no existe el usuario
  if (!user) {
    throw { 
      status: 401, 
      message: 'Credenciales inválidas' 
    };
  }

  // Verificar contraseña
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw { 
      status: 401, 
      message: 'Credenciales inválidas' 
    };
  }

  // Generar token JWT
  const token = jwt.sign(
    { id: user.id }, 
    process.env.JWT_SECRET, 
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

  return token;
};

/**
 * Obtener perfil de usuario
 */
const getUserProfile = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { 
      id: true, 
      name: true, 
      email: true 
    },
  });
  
  if (!user) {
    throw { 
      status: 404, 
      message: 'Usuario no encontrado' 
    };
  }
  
  return user;
};

module.exports = { createUser, authenticateUser, getUserProfile };