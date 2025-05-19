const prisma = require('../config/prisma');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (name, email, password) => {
  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password: hashed },
    select: { id: true, name: true, email: true },
  });
  return user;
};

const authenticateUser = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw { status: 400, message: 'Usuario no encontrado' };

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw { status: 400, message: 'Contraseña incorrecta' };

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

const getUserProfile = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true },
  });
  return user;
};

module.exports = { createUser, authenticateUser, getUserProfile };
