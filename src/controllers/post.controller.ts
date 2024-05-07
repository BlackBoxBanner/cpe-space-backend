import { APIController } from '@/types/responseType';
import { CommentSchema, PostFormSchema } from '@/types/zodSchema';
import { customError } from '@/utils/customError';
import prisma from '@/utils/prisma';
import { Post, Comment } from '@prisma/client';
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
    if (req.query.id === undefined) {
      const posts = await prisma.post.findMany();
      return res.status(200).json({ data: posts });
    }

    const query: Partial<Omit<Post, 'createdAt'>> = {
      id: req.query.id ? req.query.id.toString() : undefined,
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

    const result = await prisma.post.delete({ where: { id } });

    return res.status(201).json({ data: result });
  } catch (error) {
    return res.status(400).json(customError(error));
  }
};

export const createCommentController: APIController<any> = async (
  req,
  res,
  _next,
) => {
  try {
    const body = req.body;
    const userId = req.cookies['user-id'];
    const postId: string = req.params.id;

    if (!postId) throw new Error ('postId is required');
    if (!userId) throw new Error('Unautorized user');

    const validateComment = CommentSchema.omit({
      id: true,
      userId: true,
      postId: true,
    }).safeParse(body);

    if (!validateComment.success) {
      const errorMessage = validateComment.error.errors[0].message;
      throw new Error(errorMessage);
    }

    const comment = await prisma.comment.create({
      data: {
        userId,
        postId,
        content: validateComment.data.content,
        likes: validateComment.data.likes,
      },
    });

    return res.status(201).json({ data: comment });
  } catch (error) {
    return res.status(400).json(customError(error));
  }
};

export const getCommentController: APIController<any> = async (
  req,
  res,
  _next,
) => {
  try {

    const query: Partial<Omit<Comment, 'createdAt'>> = {
      postId: req.query.id ? req.query.id.toString() : undefined,
      // postId: req.query.id.toString()
    };

    const comments = await prisma.comment.findMany({ where: query });

    return res.status(201).json({ data: comments });
  } catch (error) {
    return res.status(400).json(customError(error));
  }
};

export const deleteCommentController: APIController<any> = async (
  req,
  res,
  _next,
) => {
  try {
    const id: string = req.params.id;

    // validate id in param request is required
    if (!id) throw new Error('Id is required');

    const result = await prisma.comment.delete({ where: { id } });

    return res.status(201).json({ data: result });
  } catch (error) {
    return res.status(400).json(customError(error));
  }
};

