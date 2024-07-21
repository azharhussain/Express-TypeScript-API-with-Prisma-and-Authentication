import { Request, Response, NextFunction } from 'express';
import * as postService from '../services/postService';
import { catchAsync, AppError } from '../utils/errorHandler';

interface AuthRequest extends Request {
  userId?: number;
}

export const createPost = catchAsync(async (req: AuthRequest, res: Response) => {
  const { title, content } = req.body;
  const post = await postService.createPost(title, content, req.userId!);
  res.status(201).json(post);
});

export const getPosts = catchAsync(async (req: Request, res: Response) => {
  const posts = await postService.getPosts();
  res.json(posts);
});

export const getPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const post = await postService.getPost(Number(req.params.id));
  if (!post) {
    return next(new AppError('Post not found', 404));
  }
  res.json(post);
});

export const updatePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { title, content } = req.body;
  const post = await postService.updatePost(Number(req.params.id), title, content);
  if (!post) {
    return next(new AppError('Post not found', 404));
  }
  res.json(post);
});

export const deletePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const post = await postService.deletePost(Number(req.params.id));
  if (!post) {
    return next(new AppError('Post not found', 404));
  }
  res.status(204).send();
});