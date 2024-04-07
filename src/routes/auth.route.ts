import { Router } from "express";
import { loginController } from "@/controllers/auth.controller";
const routers = Router();

routers.post("/signin", loginController);

export default routers;
