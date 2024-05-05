import { Router } from 'express';
import {
  loginController,
  registerController,
  signoutController,
  changePasswordController,
  checkPasswordController,
  changePasswordValidTicketController,
  generateChangePasswordTicketController,
} from '@/controllers/auth.controller';
const routers = Router();

routers.post('/signin', loginController);
routers.post('/signout', signoutController);
routers.post('/register', registerController);
routers.post('/change-password', changePasswordController);
routers.get('/change-password/:data', changePasswordValidTicketController);
routers.post('/change-password-ticket', generateChangePasswordTicketController);
routers.post('/check-password', checkPasswordController);

export default routers;
