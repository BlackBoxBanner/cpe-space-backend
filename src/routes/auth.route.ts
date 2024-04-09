import { Router } from "express";
import { registerController } from "@/controllers/auth.controller";
const routers = Router();

routers.post("/register", registerController)

export default routers;
