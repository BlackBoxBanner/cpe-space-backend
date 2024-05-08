import {
  createTopicController,
  getTopicController,
  searchTopicController,
  getTopicPostController,
} from '@/controllers/topic.controller';
import { Router } from 'express';

const routers = Router();

routers.post('/', createTopicController);
routers.get('/', getTopicController);
routers.get('/search', searchTopicController);
routers.get('/post', getTopicPostController);

export default routers;
