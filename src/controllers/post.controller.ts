import { APIController } from '@/types/responseType';
import { PostFormSchema } from '@/types/zodSchema';
import { customError } from '@/utils/customError';
import prisma from '@/utils/prisma';
import { Post } from '@prisma/client';
import { query } from 'express';
import { z } from 'zod';

type TopicType = z.infer<typeof PostFormSchema>;

export const createPostController: APIController<any> = async (
  req,
  res,
  _next,
) => {
  try {
    const body = req.body;
    const userId = req.cookies['user-id'];

    if (!userId) throw new Error('Unautorized user');

    const validatePost = PostFormSchema.omit({
      id: true,
      userId: true,
    }).safeParse(body);

    if (!validatePost.success) {
      const errorMessage = validatePost.error.errors[0].message;
      throw new Error(errorMessage);
    }

    const post = await prisma.post.create({
      data: {
        userId,
        content: validatePost.data.content,
        communitiesId: validatePost.data.communitiesId,
        likes: validatePost.data.likes,
        PostTopic: {
          create: validatePost.data.topicId.map(topic => ({ topicId: topic })),
        },
      },
    });

    return res.status(201).json({ data: post });
  } catch (error) {
    return res.status(400).json(customError(error));
  }
};

export const getPostController: APIController<any> = async (
  req,
  res,
  _next,
) => {
  try {
    const queries = req.query;

    if (req.query.id === undefined ) {
      const posts = await prisma.post.findMany();
      return res.status(200).json({ data: posts });
    }

    const query: Partial<Omit<Post, 'createdAt'>> = {
      id: req.query.id ? req.query.id.toString() : undefined,
      // id: req.query.id.toString()
    };
    
    const postview = await prisma.post.findMany({ where: query });

    return res.status(201).json({ data: postview });
  } catch (error) {
    return res.status(400).json(customError(error));
  }
};

export const deletePostController: APIController<any> = async (
  req,
  res,
  _next,
) => {
  try {
    const id: string = req.params.id;

    // validate id in param request is required
    if (!id) throw new Error('Id is required');

    const result = await prisma.post.delete({ where: { id } });;  

    return res.status(201).json({ data: result });
  } catch (error) {
    return res.status(400).json(customError(error));
  }
};
