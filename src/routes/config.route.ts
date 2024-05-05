import { configGetRsaKeyController } from '@/controllers/config.controller';
import { Router } from 'express';

const routers = Router();

routers.get('/rsa-key', configGetRsaKeyController);

export default routers;
