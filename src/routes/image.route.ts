import { getPathController, uploadController } from "@/controllers/image.controller";
import { Router } from "express";
const routers = Router();

routers.get("/get", getPathController);
routers.post("/upload", uploadController);

export default routers;
