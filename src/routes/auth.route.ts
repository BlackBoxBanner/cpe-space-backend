import { Router } from "express";
import { loginController } from "@/controllers/auth.controller";
const routers = Router();

routers.post("/sign-in", loginController);

export default routers;
