import { Router } from "express";
import { loginController, signoutController } from "@/controllers/auth.controller";
const routers = Router();

routers.post("/signin", loginController);
routers.post("/signout", signoutController);

export default routers;
