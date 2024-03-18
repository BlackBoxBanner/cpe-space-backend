import { userChangePasswordController, userGetController } from '@/controllers/user.controller'
import { userMiddleware } from '@/middleware/user.middleware'
import { Router } from 'express'

const routers = Router()

routers.get('/', userMiddleware, userGetController)
routers.patch('/chagepassword', userMiddleware, userChangePasswordController)

export default routers