import zod from "zod"

const envSchema = zod.object({
  PORT: zod.string({ required_error: "PORT is required" }),
  DATABASE_URL: zod.string({ required_error: "DATABASE_URL is required" }),
  MINIO_ENDPOINT: zod.string({ required_error: "MINIO_ENDPOINT is required" }),
  MINIO_PORT: zod.string({ required_error: "MINIO_PORT is required" }),
  MINIO_ACCESS_KEY: zod.string({ required_error: "MINIO_SECRET_KEY is required" }),
  MINIO_SECRET_KEY: zod.string({ required_error: "MINIO_ACCESS_KEY is required" }),
  API_TOKEN: zod.string({ required_error: "API_TOKEN is required" }),
  JWT_SECRET: zod.string({ required_error: "JWT_SECRET is required" }),
  CLIENT_DOMAIN: zod.string({ required_error: "CLIENT_DOMAIN is required" }),
  MAILERSEND_API_KEY: zod.string({ required_error: "MAILERSEND_API_KEY is required" }),
  MAILERSEND_MAIL: zod.string({ required_error: "MAILERSEND_MAIL is required" })
})

export const env = envSchema.parse({
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  MINIO_ENDPOINT: process.env.MINIO_ENDPOINT,
  MINIO_PORT: process.env.MINIO_PORT,
  MINIO_ACCESS_KEY: process.env.MINIO_ACCESS_KEY,
  MINIO_SECRET_KEY: process.env.MINIO_SECRET_KEY,
  API_TOKEN: process.env.API_TOKEN,
  JWT_SECRET: process.env.JWT_SECRET,
  CLIENT_DOMAIN: process.env.CLIENT_DOMAIN,
  MAILERSEND_API_KEY: process.env.MAILERSEND_API_KEY,
  MAILERSEND_MAIL: process.env.MAILERSEND_MAIL
})