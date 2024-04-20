import { usersGetController } from '@/controllers/users.controller'
import { Router } from 'express'

const routers = Router()

routers.get('/', usersGetController)

export default routers