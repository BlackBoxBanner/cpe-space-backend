import {
  createTopicController,
  getTopicController,
  searchTopicController,
} from '@/controllers/topic.controller';
import { Router } from 'express';

const routers = Router();

routers.post('/', createTopicController);
routers.get('/', getTopicController);
routers.get('/search', searchTopicController);

export default routers;
