import { z } from 'zod';
import validator from 'validator';

const RoleEnum = z.enum(['ADMIN', 'STUDENT', 'TEACHER', 'OFFICER']);

const CommunitiesStatusEnum = z.enum(['PUBLIC', 'PRIVATE']);

const ProgramEnum = z.enum([
  'REGULAR',
  'INTERNATIONAL',
  'HEALTH_DATA_SCIENCE',
  'RESFENTIAL_COLLEGE',
]);

export const UserSchema = z.object({
  id: z.string().uuid().refine(validator.isUUID),
  studentid: z.string(),
  name: z.string(),
  class: z.string(),
  email: z.string().email().refine(validator.isEmail),
  phone: z.string().optional(),
  program: ProgramEnum.default('REGULAR'),
  password: z.string(),
  image: z.string(),
  touched: z.boolean().default(false),
  role: RoleEnum.default('STUDENT'),
});

export const CommunitiesSchema = z.object({
  id: z.string().uuid().refine(validator.isUUID),
  userId: z.string().uuid().refine(validator.isUUID),
  name: z.string(),
  image: z.string(),
  status: CommunitiesStatusEnum.default('PUBLIC'),
  createdAt: z.date().default(() => new Date()),
});

export const CommunitiesFormSchema = CommunitiesSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
});
export const CommunitiesUpdateFormSchema = CommunitiesSchema.omit({
  createdAt: true,
});

export const TopicSchema = z.object({
  id: z.string().uuid().refine(validator.isUUID),
  name: z.string(),
});
export type PostType = z.infer<typeof PostSchema>

export const PostSchema = z.object({
  id: z.string().uuid().refine(validator.isUUID),
  content: z.string(),
  userId: z.string().uuid().refine(validator.isUUID),
  communitiesId: z.string().refine(validator.isUUID).optional(),
  likes: z.number().default(0),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().optional(),
});

export const PostTopicSchema = z.object({
  postId: z.string().uuid().refine(validator.isUUID),
  topicId: z.string().uuid().refine(validator.isUUID),
});

export const PostLikesSchema = z.object({
  id: z.string().uuid().refine(validator.isUUID),
  postId: z.string().uuid().refine(validator.isUUID),
  userId: z.string().uuid().refine(validator.isUUID),
});

export const CommentSchema = z.object({
  id: z.string().uuid().refine(validator.isUUID),
  postId: z.string().uuid().refine(validator.isUUID),
  userId: z.string().uuid().refine(validator.isUUID),
  content: z.string(),
  likes: z.number().default(0),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().optional(),
});

export const CommentLikesSchema = z.object({
  id: z.string().uuid().refine(validator.isUUID),
  commentId: z.string().uuid().refine(validator.isUUID),
  userId: z.string().uuid().refine(validator.isUUID),
});

export const ReplaySchema = z.object({
  id: z.string().uuid().refine(validator.isUUID),
  commentId: z.string().uuid().refine(validator.isUUID),
  userId: z.string().uuid().refine(validator.isUUID),
  content: z.string(),
  likes: z.number().default(0),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().optional(),
});

export const ReplayLikesSchema = z.object({
  id: z.string().uuid().refine(validator.isUUID),
  replayId: z.string().uuid().refine(validator.isUUID),
  userId: z.string().uuid().refine(validator.isUUID),
});
