import { usersGetController } from '@/controllers/users.controller'
import { Router } from 'express'

const routers = Router()

routers.get('/:id', usersGetController)

export default routers