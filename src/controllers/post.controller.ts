import { APIController } from '@/types/responseType';
import { PostFormSchema } from '@/types/zodSchema';
import { customError } from '@/utils/customError';
import prisma from '@/utils/prisma';
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

    if (!validatePost.success)
      throw new Error(validatePost.error.errors[0].path[0].toString());

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
