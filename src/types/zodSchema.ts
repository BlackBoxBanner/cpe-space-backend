import zod from 'zod';

const invalid_type_error = (field: string, type: string) => {
  return `${field} must be a ${type}`
}

const invalid_type_error_enum = (field: string, enumValues: string[]) => {
  return `${field} must be a enum and one of ${enumValues.join(", ")}`
}

const required_error = "This field is required"

const invalid_value_length_error = (field: string, length: number) => {
  return `${field} have to be at least ${length} character long`
}

export const UserSchema = zod.object({
  id: zod.string({ invalid_type_error: invalid_type_error("ID", "string"), required_error }).min(1, invalid_value_length_error("ID", 1)),
  studentid: zod.string({ invalid_type_error: invalid_type_error("Student ID", "string"), required_error }).min(1, invalid_value_length_error("Student ID", 1)),
  name: zod.string({ invalid_type_error: invalid_type_error("Name", "string"), required_error }),
  email: zod.string({ invalid_type_error: invalid_type_error("Email", "string") }).email({ message: "Invalid email" }).optional(),
  phone: zod.string().optional(),
  program: zod.enum(['REGULAR', 'INTERNATIONAL', 'HEALTH_DATA_SCIENCE', 'RESFENTIAL_COLLEGE'], { invalid_type_error: invalid_type_error_enum("Program", ['REGULAR', 'INTERNATIONAL', 'HEALTH_DATA_SCIENCE', 'RESFENTIAL_COLLEGE']), required_error }).default('REGULAR'),
  password: zod.string({ invalid_type_error: invalid_type_error("Password", "string"), required_error }).min(1, invalid_value_length_error("Password", 1)),
  image: zod.string().optional(),
  touched: zod.boolean({ invalid_type_error: invalid_type_error("Touched", "boolean"), required_error }),
  role: zod.enum(['ADMIN', 'STUDENT'], { invalid_type_error: invalid_type_error_enum("role", ['ADMIN', 'STUDENT']), required_error }).default('STUDENT'),
  student: zod.enum(['GRADUATED', 'ENROLLED'], { invalid_type_error: invalid_type_error_enum("student", ['GRADUATED', 'ENROLLED']), required_error }).default('ENROLLED'),
})

export const UserFormSchema = UserSchema.omit({ id: true, touched: true, role: true, student: true, })

export type UserType = zod.infer<typeof UserSchema>

export type UserFormType = zod.infer<typeof UserFormSchema>

export const BlogSchema = zod.object({
  id: zod.string({ invalid_type_error: invalid_type_error("ID", "string"), required_error }).min(1, invalid_value_length_error("ID", 1)),
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
  id: zod.string({ invalid_type_error: invalid_type_error("ID", "string"), required_error }).min(1, invalid_value_length_error("ID", 1)),
  conversationId: zod.string({ invalid_type_error: invalid_type_error("Conversation ID", "string"), required_error }).min(1, invalid_value_length_error("Conversation ID", 1)),
  authorId: zod.string({ invalid_type_error: invalid_type_error("Author ID", "string"), required_error }).min(1, invalid_value_length_error("Author ID", 1)),
  content: zod.string({ invalid_type_error: invalid_type_error("Content", "string"), required_error }).min(1, invalid_value_length_error("Content", 1)),
  read: zod.boolean({ invalid_type_error: invalid_type_error("Read", "boolean"), required_error }),
  createdAt: zod.string({ invalid_type_error: invalid_type_error("Created At", "string"), required_error }).min(1, invalid_value_length_error("Created At", 1)),
  updatedAt: zod.string({ invalid_type_error: invalid_type_error("Updated At", "string"), required_error }).min(1, invalid_value_length_error("Updated At", 1)),
})

export const MessageFormSchema = MessageSchema.omit({ id: true, createdAt: true, updatedAt: true })

export type MessageType = zod.infer<typeof MessageSchema>

export type MessageFormType = zod.infer<typeof MessageFormSchema>

export const AnouncementSchema = zod.object({
  id: zod.string({ invalid_type_error: invalid_type_error("ID", "string"), required_error }).min(1, invalid_value_length_error("ID", 1)),
  authorId: zod.string({ invalid_type_error: invalid_type_error("Author ID", "string"), required_error }).min(1, invalid_value_length_error("Author ID", 1)),
  title: zod.string({ invalid_type_error: invalid_type_error("Title", "string"), required_error }).min(1, invalid_value_length_error("Title", 1)),
  content: zod.string({ invalid_type_error: invalid_type_error("Content", "string"), required_error }).min(1, invalid_value_length_error("Content", 1)),
  published: zod.boolean({ invalid_type_error: invalid_type_error("Published", "boolean"), required_error }),
  createdAt: zod.string({ invalid_type_error: invalid_type_error("Created At", "string"), required_error }).min(1, invalid_value_length_error("Created At", 1)),
  updatedAt: zod.string({ invalid_type_error: invalid_type_error("Updated At", "string"), required_error }).min(1, invalid_value_length_error("Updated At", 1)),
})

export const AnouncementFormSchema = AnouncementSchema.omit({ id: true, authorId: true, createdAt: true, updatedAt: true })

export type AnouncementType = zod.infer<typeof AnouncementSchema>

export type AnouncementFormType = zod.infer<typeof AnouncementFormSchema>

export const EventPostSchema = zod.object({
  id: zod.string({ invalid_type_error: invalid_type_error("ID", "string"), required_error }).min(1, invalid_value_length_error("ID", 1)),
  authorId: zod.string({ invalid_type_error: invalid_type_error("Author ID", "string"), required_error }).min(1, invalid_value_length_error("Author ID", 1)),
  title: zod.string({ invalid_type_error: invalid_type_error("Title", "string"), required_error }).min(1, invalid_value_length_error("Title", 1)),
  content: zod.string({ invalid_type_error: invalid_type_error("Content", "string"), required_error }).min(1, invalid_value_length_error("Content", 1)),
  published: zod.boolean({ invalid_type_error: invalid_type_error("Published", "boolean"), required_error }),
  eventId: zod.string({ invalid_type_error: invalid_type_error("Event ID", "string"), required_error }).min(1, invalid_value_length_error("Event ID", 1)),
  createdAt: zod.string({ invalid_type_error: invalid_type_error("Created At", "string"), required_error }).min(1, invalid_value_length_error("Created At", 1)),
  updatedAt: zod.string({ invalid_type_error: invalid_type_error("Updated At", "string"), required_error }).min(1, invalid_value_length_error("Updated At", 1)),
})

export type EventPostType = zod.infer<typeof EventPostSchema>

export const EventSchema = zod.object({
  id: zod.string({ invalid_type_error: invalid_type_error("ID", "string"), required_error }).min(1, invalid_value_length_error("ID", 1)),
  authorId: zod.string({ invalid_type_error: invalid_type_error("Author ID", "string"), required_error }).min(1, invalid_value_length_error("Author ID", 1)),
  title: zod.string({ invalid_type_error: invalid_type_error("Title", "string"), required_error }).min(1, invalid_value_length_error("Title", 1)),
  content: zod.string({ invalid_type_error: invalid_type_error("Content", "string"), required_error }).min(1, invalid_value_length_error("Content", 1)),
  eventDate: zod.date({ invalid_type_error: invalid_type_error("Event Date", "date"), required_error }),
  createdAt: zod.date({ invalid_type_error: invalid_type_error("Created At", "date"), required_error }),
  updatedAt: zod.date({ invalid_type_error: invalid_type_error("Updated At", "date"), required_error }),
})

export type EventType = zod.infer<typeof EventSchema>

export const EventParticipantsSchema = zod.object({
  id: zod.string({ invalid_type_error: invalid_type_error("ID", "string"), required_error }).min(1, invalid_value_length_error("ID", 1)),
  eventId: zod.string({ invalid_type_error: invalid_type_error("Event ID", "string"), required_error }).min(1, invalid_value_length_error("Event ID", 1)),
  userId: zod.string({ invalid_type_error: invalid_type_error("User ID", "string"), required_error }).min(1, invalid_value_length_error("User ID", 1)),
  createdAt: zod.string({ invalid_type_error: invalid_type_error("Created At", "string"), required_error }).min(1, invalid_value_length_error("Created At", 1)),
})

export type EventParticipantsType = zod.infer<typeof EventParticipantsSchema>