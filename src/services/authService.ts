import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/database';
import { AppError } from '../utils/errorHandler';
import logger from '../utils/logger';

export const register = async (email: string, password: string, name: string) => {
  logger.info(`Attempting to register user with email: ${email}`);
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    logger.warn(`Registration failed: Email already in use - ${email}`);
    throw new AppError('Email already in use', 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashedPassword, name },
  });
  logger.info(`User registered successfully: ${user.id}`);
  return user;
};

export const login = async (email: string, password: string) => {
  logger.info(`Login attempt for user: ${email}`);
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    logger.warn(`Login failed: User not found - ${email}`);
    throw new AppError('User not found', 404);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    logger.warn(`Login failed: Invalid password for user - ${email}`);
    throw new AppError('Invalid password', 401);
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  logger.info(`User logged in successfully: ${user.id}`);
  return token;
};