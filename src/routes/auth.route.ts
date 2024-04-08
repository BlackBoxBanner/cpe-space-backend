import { Router } from "express";
import { loginController, registerController, signoutController } from "@/controllers/auth.controller";
const routers = Router();

routers.post("/signin", loginController);
routers.post("/signout", signoutController);
routers.post("/register", registerController)

export default routers;
