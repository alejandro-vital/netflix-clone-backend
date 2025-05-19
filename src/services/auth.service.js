const prisma = require('../config/prisma');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * Crear un nuevo usuario
 */
const createUser = async (name, email, password) => {
  try {
    const hashed = await bcrypt.hash(password, 10);
    
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
    throw error;
  }
};

/**
 * Autenticar usuario y generar JWT
 */
const authenticateUser = async (email, password) => {
  const user = await prisma.user.findUnique({ 
    where: { email: email.toLowerCase() } 
  });
  
  if (!user) {
    throw { 
      status: 401, 
      message: 'Credenciales inválidas' 
    };
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw { 
      status: 401, 
      message: 'Credenciales inválidas' 
    };
  }

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