import {
  createCommentController,
  createPostController,
  deleteCommentController,
  deletePostController,
  getCommentController,
  getPostController,
} from '@/controllers/post.controller';
import { createLikeController, removeLikeController } from '@/controllers/like.controller';
import { Router } from 'express';

const routers = Router();

routers.get('/', getPostController);
routers.post('/', createPostController);
// routers.patch('/:id', () => {});
routers.delete('/:id', deletePostController);
routers.get('/:id/comment', getCommentController);
routers.post('/:id/comment', createCommentController);
routers.delete('/:id/comment', deleteCommentController);

routers.post("/:id/like", createLikeController);
routers.delete("/:id/like", removeLikeController);

export default routers;
