import {
  getController,
  getImagePathController,
  getPathController,
  uploadController,
} from '@/controllers/image.controller';
import { Router } from 'express';
const routers = Router();

routers.post('/upload', uploadController);
routers.get('/get', getPathController);
routers.get('/get/:path', getImagePathController);
routers.get('/get/:path/:name', getController);

export default routers;
