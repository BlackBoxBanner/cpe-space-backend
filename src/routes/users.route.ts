import { usersGetController, usersPostController } from '@/controllers/users.controller'
import { Router } from 'express'

const routers = Router()

routers.get('/:id', usersGetController)
routers.post('/', usersPostController)

export default routers