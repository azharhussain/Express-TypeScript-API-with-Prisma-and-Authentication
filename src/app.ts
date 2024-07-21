import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import authRoutes from './routes/authRoutes';
import postRoutes from './routes/postRoutes';
import swaggerSpec from './config/swagger';
import logger from './utils/logger';
import { AppError } from './utils/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 1000;

app.use(express.json());
app.use(cors());

// Logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Global error handler
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  logger.error(`${err.statusCode || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  res.status(err.statusCode || 500).json({
    error: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  logger.warn(`404 - Route Not Found - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  res.status(404).json({ error: 'Not Found' });
});

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  logger.info(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});