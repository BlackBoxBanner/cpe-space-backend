import express from 'express';
import 'dotenv/config'
import cookieParser from "cookie-parser"

import mainRouter from '@/routes/main.route'
import authRouter from '@/routes/auth.route'
import configRouter from '@/routes/config.route'
import imageRouter from '@/routes/image.route'
import usersRouter from '@/routes/users.route'
import announcementRouter from '@/routes/announcement.route'
import eventRouter from '@/routes/event.route'
import { middleware } from '@/middleware/middleware';
import { publicKeyPem, privateKeyPem } from '@/utils/decryption/generate';
import cors from "cors"
import { authMiddleware } from '@/middleware/auth.middleware';
import { env } from '@/utils/env';


// Initialize Express 
export const app = express()

// Config Middleware for parsing JSON request bodies
app.use(express.json({ limit: '50mb', type: ["image/*", "application/*"] }))
app.use(express.urlencoded({ extended: true }))
app.use(express.raw())
app.use(cookieParser())
app.use(
  cors({
    origin: env.CLIENT_DOMAIN,
    credentials: true,
  })
);

app.set("trust proxy", 1);

// Set app variables
app.set("publicKeyPem", publicKeyPem)
app.set("privateKeyPem", privateKeyPem)

// Config Middleware for handling CORS
// app.use(middleware)

// Mouth route handlers
app.use('/', mainRouter)
app.use('/api/user', middleware, usersRouter)
app.use('/api/auth', middleware, authRouter)
app.use('/api/config', middleware, configRouter)
app.use('/api/announcement', middleware, authMiddleware, announcementRouter)
app.use('/api/event', middleware, authMiddleware, eventRouter)
app.use('/api/image', imageRouter)

export default app;