import { Router } from "express";
import { loginController, registerController, signoutController, changePasswordController, checkPasswordController } from "@/controllers/auth.controller";
const routers = Router();

routers.post("/signin", loginController);
routers.post("/signout", signoutController);
routers.post("/register", registerController)
routers.post("/change-password", changePasswordController);
routers.post("/check-password", checkPasswordController);

export default routers;
