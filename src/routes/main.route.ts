import {
  mainGetController,
  mainPostController,
} from '@/controllers/main.controller';
import { mainMiddleware } from '@/middleware/main.middleware';
import { Router } from 'express';

const routers = Router();

routers.get('/', mainMiddleware, mainGetController);
routers.post('/', mainMiddleware, mainPostController);

export default routers;
