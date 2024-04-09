import { loginController } from "@/controllers/auth.controller";
import { Router } from "express";
const routers = Router();

routers.post("/signin", loginController);

export default routers;
