import { Router } from "express";
import { loginController, registerController, signoutController,changePasswordController } from "@/controllers/auth.controller";
const routers = Router();

routers.post("/signin", loginController);
routers.post("/signout", signoutController);
routers.post("/register", registerController)
routers.post("/change-password", changePasswordController);

export default routers;
