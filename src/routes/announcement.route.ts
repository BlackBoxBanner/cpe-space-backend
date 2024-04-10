import { announcementGetController, announcementPostController } from '@/controllers/announcement.controller'
import { Router } from 'express'

const routers = Router()

routers.get('/', announcementGetController)
routers.post('/', announcementPostController)

export default routers