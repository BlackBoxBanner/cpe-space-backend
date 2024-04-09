import { getPathController } from "@/controllers/image.controller";
import { Router } from "express";
const routers = Router();

routers.get("/get", getPathController);

export default routers;
