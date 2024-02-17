import express from 'express';
import 'dotenv/config'

import mainRouter from '@/routes/main.route'
import { middleware } from '@/middleware/middleware';

// Initialize Express 
export const app = express()

// Config Middleware for parsing JSON request bodies
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.raw())

// Config Middleware for handling CORS
app.use(middleware)

// Mouth route handlers
app.use('/', mainRouter)

export default app;