import zod from 'zod';

const invalid_type_error = 'Invalid type provided for this field';
const required_error = 'This field cannot be blank';
const invalid_value_length_error = "Invalid value length"

export const UserSchema = zod.object({
  id: zod.string({ invalid_type_error, required_error }).min(1, invalid_value_length_error),
  studentid: zod.string({ invalid_type_error, required_error }).min(1, invalid_value_length_error),
  name: zod.string({ invalid_type_error, required_error }),
  email: zod.string().email().optional(),
  phone: zod.string().optional(),
  program: zod.enum(['REGULAR', 'INTERNATIONAL', 'HEALTH_DATA_SCIENCE', 'RESFENTIAL_COLLEGE'], { invalid_type_error, required_error }).default('REGULAR'),
  password: zod.string({ invalid_type_error, required_error }).min(1, invalid_value_length_error),
  image: zod.string().optional(),
  touched: zod.boolean({ invalid_type_error, required_error }),
  role: zod.enum(['ADMIN', 'STUDENT'], { invalid_type_error, required_error }).default('STUDENT'),
  student: zod.enum(['GRADUATED', 'ENROLLED'], { invalid_type_error, required_error }).default('ENROLLED'),
})

export const UserFormSchema = UserSchema.omit({ id: true, touched: true, role: true, student: true, })

export type UserType = zod.infer<typeof UserSchema>

export type UserFormType = zod.infer<typeof UserFormSchema>

export const BlogSchema = zod.object({
  id: zod.string(),
  authorId: zod.string(),
  title: zod.string(),
  content: zod.string(),
  published: zod.boolean(),
  createdAt: zod.string(),
  updatedAt: zod.string(),
})

export const BlogFormSchema = BlogSchema.omit({ id: true, createdAt: true, updatedAt: true })

export type BlogType = zod.infer<typeof BlogSchema>

export type BlogFormType = zod.infer<typeof BlogFormSchema>

export type ConversationsType = {
  id: string
  createdAt: string
  updatedAt: string
}

export type ConversationsParticipantsSchema = {
  id: string
  conversationId: string
  userId: string
  createdAt: string
}

export const MessageSchema = zod.object({
  id: zod.string(),
  conversationId: zod.string(),
  authorId: zod.string(),
  content: zod.string(),
  read: zod.boolean(),
  createdAt: zod.string(),
  updatedAt: zod.string(),
})

export const MessageFormSchema = MessageSchema.omit({ id: true, createdAt: true, updatedAt: true })

export type MessageType = zod.infer<typeof MessageSchema>

export type MessageFormType = zod.infer<typeof MessageFormSchema>

export const AnouncementSchema = zod.object({
  id: zod.string(),
  authorId: zod.string(),
  title: zod.string(),
  content: zod.string(),
  published: zod.boolean(),
  createdAt: zod.string(),
  updatedAt: zod.string(),
})

export const AnouncementFormSchema = AnouncementSchema.omit({ id: true, createdAt: true, updatedAt: true })

export type AnouncementType = zod.infer<typeof AnouncementSchema>

export type AnouncementFormType = zod.infer<typeof AnouncementFormSchema>

export const EventPostSchema = zod.object({
  id: zod.string(),
  authorId: zod.string(),
  title: zod.string(),
  content: zod.string(),
  published: zod.boolean(),
  eventId: zod.string(),
  createdAt: zod.string(),
  updatedAt: zod.string(),
})

export const EventPostFormSchema = EventPostSchema.omit({ id: true, createdAt: true, updatedAt: true })

export type EventPostType = zod.infer<typeof EventPostSchema>

export type EventPostFormType = zod.infer<typeof EventPostFormSchema>

export const EventSchema = zod.object({
  id: zod.string(),
  authorId: zod.string(),
  title: zod.string(),
  content: zod.string(),
  eventDate: zod.string(),
  createdAt: zod.string(),
  updatedAt: zod.string(),
})

export const EventFormSchema = EventSchema.omit({ id: true, createdAt: true, updatedAt: true })

export type EventType = zod.infer<typeof EventSchema>

export type EventFormType = zod.infer<typeof EventFormSchema>

export const EventParticipantsSchema = zod.object({
  id: zod.string(),
  eventId: zod.string(),
  userId: zod.string(),
  createdAt: zod.string(),
})

export type EventParticipantsType = zod.infer<typeof EventParticipantsSchema>

export const EventParticipantsFormSchema = EventParticipantsSchema.omit({ id: true, createdAt: true })

export type EventParticipantsFormType = zod.infer<typeof EventParticipantsFormSchema>
