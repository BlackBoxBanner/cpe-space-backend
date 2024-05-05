import {
  createTopicController,
  getTopicController,
} from '@/controllers/topic.controller';
import { Router } from 'express';

const routers = Router();

routers.post('/', createTopicController);
routers.get('/', getTopicController);

export default routers;
