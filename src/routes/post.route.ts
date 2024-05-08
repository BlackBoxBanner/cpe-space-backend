import {
  createPostController,
  deletePostController,
  getPostController,
} from '@/controllers/post.controller';
import { createLikeController } from '@/controllers/like.controller';
import { Router } from 'express';
import {
  createCommentController,
  deleteCommentController,
  getCommentController,
} from '@/controllers/comment.controller';

const routers = Router();

// Post Routes
routers.get('/', getPostController);
routers.post('/', createPostController);
routers.delete('/:id', deletePostController);

// Comment in Post Route
routers.get('/:id/comment', getCommentController);
routers.post('/:id/comment', createCommentController);
routers.delete('/:id/comment', deleteCommentController);

// Like of the  Post Route
routers.post('/:id/like', createLikeController);
// routers.delete("/:id/like", removeLikeController);

export default routers;
