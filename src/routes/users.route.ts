import { usersGetController, searchUserGetController } from '@/controllers/users.controller'
import { Router } from 'express'

const routers = Router()

routers.get('/', usersGetController)
routers.get('/search', searchUserGetController)
// routers.post('/', usersPostController)

export default routers