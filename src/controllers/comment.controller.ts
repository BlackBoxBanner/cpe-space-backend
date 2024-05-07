import { APIController } from '@/types/responseType';
import { CommentSchema } from '@/types/zodSchema';
import { customError } from '@/utils/customError';
import { Comment } from '@prisma/client';
import prisma from '@/utils/prisma';

export const createCommentController: APIController<any> = async (
  req,
  res,
  _next,
) => {
  try {
    const body = req.body;
    const userId = req.cookies['user-id'];
    const postId: string = req.params.id;

    if (!postId) throw new Error('postId is required');
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

    const id: string = req.params.id;

    const comments = await prisma.comment.findMany({ where: {id}, include: { user: true }});

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
