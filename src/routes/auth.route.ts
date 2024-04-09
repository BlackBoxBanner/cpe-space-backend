import { Router } from "express";
import { changePasswordController } from "@/controllers/auth.controller";
const routers = Router();

routers.post("/change-password", changePasswordController);

export default routers;
