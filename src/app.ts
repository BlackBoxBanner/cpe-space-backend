import express from 'express';
import 'dotenv/config'
import cookieParser from "cookie-parser"

import mainRouter from '@/routes/main.route'
import authRouter from '@/routes/auth.route'
import configRouter from '@/routes/config.route'
import usersRouter from '@/routes/users.route'
import { middleware } from '@/middleware/middleware';
import { publicKeyPem, privateKeyPem } from '@/utils/decryption/generate';
import cors from "cors"


// Initialize Express 
export const app = express()

// Config Middleware for parsing JSON request bodies
app.use(express.json({ limit: '50mb', type: ["image/*", "application/*"] }))
app.use(express.urlencoded({ extended: true }))
app.use(express.raw())
app.use(cookieParser())
app.use(cors())
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

export default app;