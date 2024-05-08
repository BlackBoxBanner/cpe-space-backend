import {
  usersGetController,
  searchUserGetController,
  updateUserController,
} from '@/controllers/users.controller';
import { Router } from 'express';

const routers = Router();

routers.get('/', usersGetController);
routers.get('/search', searchUserGetController);
routers.patch('/', updateUserController);
// routers.post('/', usersPostController)

export default routers;
