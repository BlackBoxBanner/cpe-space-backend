import { APIController } from '@/types/responseType';
import {
  CommentSchema,
  CommunitiesSchema,
  PostSchema,
  TopicSchema,
  UserSchema,
} from '@/types/zodSchema';
import { customError } from '@/utils/customError';
import prisma from '@/utils/prisma';
import { Topic } from '@prisma/client';
import { z } from 'zod';

type TopicType = z.infer<typeof TopicSchema>;

export type TopicsType = z.infer<typeof TopicSchema> & {
  user: z.infer<typeof UserSchema>;
  PostTopic: z.infer<typeof PostSchema>[];
  comments: z.infer<typeof CommentSchema>[];
  communities: z.infer<typeof CommunitiesSchema> | null;
  topics: z.infer<typeof TopicSchema>[];
};

export const createTopicController: APIController<TopicType> = async (
  req,
  res,
  _next,
) => {
  try {
    const body = req.body;

    console.log(body);

    const validateTopic = TopicSchema.omit({ id: true }).safeParse(body.data);

    if (!validateTopic.success)
      throw new Error(validateTopic.error.errors[0].path[0].toString());

    const validateTopicData = await prisma.topic.findUnique({
      where: { name: validateTopic.data.name },
    });
    if (validateTopicData) throw new Error('Topic already exists');

    const topic = await prisma.topic.create({ data: validateTopic.data });

    return res.status(201).json({ data: topic });
  } catch (error) {
    return res.status(400).json(customError(error));
  }
};

export const getTopicController: APIController<TopicType[]> = async (
  req,
  res,
  _next,
) => {
  try {
    const query: Partial<Topic> = {
      id: req.query.id ? req.query.id.toString() : undefined,
      name: req.query.name ? req.query.name.toString() : undefined,
    };

    const topic = await prisma.topic.findMany({
      where: {
        ...query,
      },
    });

    return res.status(200).json({ data: topic });
  } catch (error) {
    return res.status(400).json(customError(error));
  }
};

export const searchTopicController: APIController<TopicType[]> = async (
  req,
  res,
  _next,
) => {
  try {
    const topic = await prisma.topic.findMany({
      where: {
        OR: [
          {
            name: {
              contains: req.query.search as string,
              mode: 'insensitive',
            },
          },
        ],
      },
    });

    return res.status(200).json({ data: topic });
  } catch (error) {
    return res.status(400).json(customError(error));
  }
};

export const getTopicPostController: APIController<TopicType[]> = async (
  req,
  res,
  _next,
) => {
  try {
    const topic = await prisma.topic.findMany({
      where: {
        id: req.query.id as string,
      },
      include: {
        posts: {
          include: {
            user: true,
            PostTopic: true,
            comments: true,
            communities: true,
            topics: true,
          },
        },
      },
    });

    return res.status(200).json({ data: topic });
  } catch (error) {
    return res.status(400).json(customError(error));
  }
};
