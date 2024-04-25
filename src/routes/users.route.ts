import { usersGetController, usersPostController } from '@/controllers/users.controller'
import { Router } from 'express'

const routers = Router()

routers.get('/', usersGetController)
routers.post('/', usersPostController)

export default routers