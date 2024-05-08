import {
  createCommunity,
  deleteCommunity,
  findCommunity,
  updateCommunity,
} from '@/services/communities.service';
import { APIController } from '@/types/responseType';
import {
  CommentSchema,
  CommunitiesFormSchema,
  CommunitiesSchema,
  CommunitiesUpdateFormSchema,
  PostLikesSchema,
  PostSchema,
  TopicSchema,
  UserSchema,
} from '@/types/zodSchema';
import { customError } from '@/utils/customError';
import { Communities, CommunitiesStatus } from '@prisma/client';
import { z } from 'zod';
import fs from 'fs';
import { uploadImage } from '@/services/image.service';
import prisma from '@/utils/prisma';

type CommunitiesType = z.infer<typeof CommunitiesSchema>;

export const createCommunityController: APIController<CommunitiesType> = async (
  req,
  res,
  _next,
) => {
  try {
    const body = req.body;
    const userId = req.cookies['user-id'];

    if (!userId) throw new Error('Unautorized user');

    const base64 = fs.readFileSync(
      './src/assets/communityDefault.png',
      'base64',
    );

    let validateCommunity = CommunitiesFormSchema.safeParse(body.data);

    if (!validateCommunity.success)
      throw new Error(validateCommunity.error.errors[0].path[0].toString());

    if (!validateCommunity.data.image) {
      await uploadImage({
        base64,
        name: `community/defaultCommunity.png`,
      });
      validateCommunity.data.image = 'community/defaultCommunity.png';
    }

    const communities = await createCommunity({
      userId,
      ...validateCommunity.data,
    } as Communities);

    return res.status(201).json({ data: communities });
  } catch (error) {
    return res.status(400).json(customError(error));
  }
};

export const getCommunityController: APIController<CommunitiesType[]> = async (
  req,
  res,
  _next,
) => {
  try {
    const queries = req.query;

    const query: Partial<Omit<Communities, 'createdAt'>> = {
      id: req.query.id ? req.query.id.toString() : undefined,
      name: req.query.name ? req.query.name.toString() : undefined,
      status: (req.query.status as CommunitiesStatus)
        ? (req.query.status as CommunitiesStatus)
        : undefined,
    };

    const result = await findCommunity(query);

    return res.status(201).json({ data: result });
  } catch (error) {
    return res.status(400).json(customError(error));
  }
};

export const updateCommunityController: APIController<CommunitiesType> = async (
  req,
  res,
  _next,
) => {
  try {
    const body = req.body;

    const validateCommunity = CommunitiesUpdateFormSchema.safeParse(body);

    if (!validateCommunity.success)
      throw new Error(validateCommunity.error.errors[0].path[0].toString());

    const result = await updateCommunity(validateCommunity.data as Communities);

    return res.status(201).json({ data: result });
  } catch (error) {
    return res.status(400).json(customError(error));
  }
};

export const deleteCommunityController: APIController<CommunitiesType> = async (
  req,
  res,
  _next,
) => {
  try {
    const id: string = req.params.id;

    // validate id in param request is required
    if (!id) throw new Error('Id is required');

    const result = await deleteCommunity(id);

    return res.status(201).json({ data: result });
  } catch (error) {
    return res.status(400).json(customError(error));
  }
};

export const searchCommunityController: APIController<
  CommunitiesType[]
> = async (req, res, _next) => {
  try {
    const queries = req.query;

    const communitiesData = await prisma.communities.findMany({
      where: {
        OR: [
          {
            name: { contains: queries.search?.toString(), mode: 'insensitive' },
          },
        ],
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    console.log(communitiesData);

    return res.status(200).json({ data: communitiesData });
  } catch (error) {
    return res.status(400).json(customError(error));
  }
};

export type CommunitiesPostType = z.infer<typeof PostSchema> & {
  user: z.infer<typeof UserSchema>;
  PostTopic: z.infer<typeof PostSchema>[];
  comments: (z.infer<typeof CommentSchema> & {
    user: z.infer<typeof UserSchema>;
  })[];
  communities: z.infer<typeof CommunitiesSchema> | null;
  topics: z.infer<typeof TopicSchema>[];
  postLikes: z.infer<typeof PostLikesSchema>[];
};

export const getCommunityPostController: APIController<any> = async (
  req,
  res,
  _next,
) => {
  try {
    const topic = await prisma.post.findMany({
      where: {
        communities: {
          id: req.query.id as string,
        },
      },
      include: {
        user: true,
        PostTopic: true,
        comments: {
          include: {
            user: true,
          },
        },
        communities: true,
        topics: true,
        postLikes: true,
      },
    });

    console.log(topic);

    return res.status(200).json({ data: topic });
  } catch (error) {
    return res.status(400).json(customError(error));
  }
};
