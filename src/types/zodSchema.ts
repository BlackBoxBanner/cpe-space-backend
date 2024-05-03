import zod from "zod";
import validator from 'validator';

const RoleEnum = zod.enum(['ADMIN', 'STUDENT', 'TEACHER', 'OFFICER']);

const CommunitiesStatusEnum = zod.enum(['PUBLIC', 'PRIVATE']);

const ProgramEnum = zod.enum(["REGULAR", "INTERNATIONAL", "HEALTH_DATA_SCIENCE", "RESFENTIAL_COLLEGE"])

export const UserSchema = zod.object({
  id: zod.string().uuid().refine(validator.isUUID),
  studentid: zod.string(),
  name: zod.string(),
  class: zod.string(),
  email: zod.string().email().refine(validator.isEmail),
  phone: zod.string().optional(),
  program: ProgramEnum.default('REGULAR'),
  password: zod.string(),
  image: zod.string(),
  touched: zod.boolean().default(false),
  role: RoleEnum.default('STUDENT'),
});

export const CommunitiesSchema = zod.object({
  id: zod.string().uuid().refine(validator.isUUID),
  userId: zod.string().uuid().refine(validator.isUUID),
  name: zod.string(),
  image: zod.string(),
  status: CommunitiesStatusEnum.default('PUBLIC'),
  createdAt: zod.date().default(() => new Date()),
});

export const TopicSchema = zod.object({
  id: zod.string().uuid().refine(validator.isUUID),
  name: zod.string(),
});

export const PostSchema = zod.object({
  id: zod.string().uuid().refine(validator.isUUID),
  content: zod.string(),
  userId: zod.string().uuid().refine(validator.isUUID),
  communitiesId: zod.string().refine(validator.isUUID).optional(),
  likes: zod.number().default(0),
  createdAt: zod.date().default(() => new Date()),
  updatedAt: zod.date().optional(),
});

export const PostTopicSchema = zod.object({
  postId: zod.string().uuid().refine(validator.isUUID),
  topicId: zod.string().uuid().refine(validator.isUUID),
});

export const PostLikesSchema = zod.object({
  id: zod.string().uuid().refine(validator.isUUID),
  postId: zod.string().uuid().refine(validator.isUUID),
  userId: zod.string().uuid().refine(validator.isUUID),
});

export const CommentSchema = zod.object({
  id: zod.string().uuid().refine(validator.isUUID),
  postId: zod.string().uuid().refine(validator.isUUID),
  userId: zod.string().uuid().refine(validator.isUUID),
  content: zod.string(),
  likes: zod.number().default(0),
  createdAt: zod.date().default(() => new Date()),
  updatedAt: zod.date().optional(),
});

export const CommentLikesSchema = zod.object({
  id: zod.string().uuid().refine(validator.isUUID),
  commentId: zod.string().uuid().refine(validator.isUUID),
  userId: zod.string().uuid().refine(validator.isUUID),
});

export const ReplaySchema = zod.object({
  id: zod.string().uuid().refine(validator.isUUID),
  commentId: zod.string().uuid().refine(validator.isUUID),
  userId: zod.string().uuid().refine(validator.isUUID),
  content: zod.string(),
  likes: zod.number().default(0),
  createdAt: zod.date().default(() => new Date()),
  updatedAt: zod.date().optional(),
});

export const ReplayLikesSchema = zod.object({
  id: zod.string().uuid().refine(validator.isUUID),
  replayId: zod.string().uuid().refine(validator.isUUID),
  userId: zod.string().uuid().refine(validator.isUUID),
});