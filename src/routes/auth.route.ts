import { Router } from "express";
import { signoutController } from "@/controllers/auth.controller";
const routers = Router();

routers.post("/signout", signoutController);

export default routers;
