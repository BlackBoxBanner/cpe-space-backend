import { Router } from 'express'
import { loginController } from '@/controllers/auth.controller'
const routers = Router()

routers.post('/login', loginController)

export default routers