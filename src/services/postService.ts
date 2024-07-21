import prisma from '../config/database';

export const createPost = async (title: string, content: string, authorId: number) => {
  return prisma.post.create({ data: { title, content, authorId } });
};

export const getPosts = async () => {
  return prisma.post.findMany();
};

export const getPost = async (id: number) => {
  return prisma.post.findUnique({ where: { id } });
};

export const updatePost = async (id: number, title: string, content: string) => {
  return prisma.post.update({ where: { id }, data: { title, content } });
};

export const deletePost = async (id: number) => {
  return prisma.post.delete({ where: { id } });
};