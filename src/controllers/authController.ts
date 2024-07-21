import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/authService';
import { catchAsync } from '../utils/errorHandler';
import logger from '../utils/logger';

export const register = catchAsync(async (req: Request, res: Response) => {
  logger.info('Register endpoint called');
  const { email, password, name } = req.body;
  const user = await authService.register(email, password, name);
  logger.info(`User registered successfully: ${user.id}`);
  res.status(201).json(user);
});

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  logger.info('Login endpoint called');
  const { email, password } = req.body;
  const token = await authService.login(email, password);
  logger.info(`User logged in successfully: ${email}`);
  res.json({ token });
});