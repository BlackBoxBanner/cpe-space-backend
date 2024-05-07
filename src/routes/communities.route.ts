import {
  createCommunityController,
  deleteCommunityController,
  getCommunityController,
  searchCommunityController,
  updateCommunityController,
} from '@/controllers/communities.controller';
import { Router } from 'express';

const routers = Router();

routers.post('/', createCommunityController);
routers.get('/', getCommunityController);
routers.patch('/', updateCommunityController);
routers.delete('/:id', deleteCommunityController);
routers.get('/search', searchCommunityController);

export default routers;
