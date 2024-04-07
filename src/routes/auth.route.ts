import { Router } from "express";
import { changePasswordController, loginController } from "@/controllers/auth.controller";
const routers = Router();

routers.post("/sign-in", loginController);
routers.post("/change-password", changePasswordController);

export default routers;
