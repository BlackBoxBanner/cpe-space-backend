import { getImagePathController } from "@/controllers/image.controller";
import { Router } from "express";
const routers = Router();

routers.get("/get/:path", getImagePathController);

export default routers;
