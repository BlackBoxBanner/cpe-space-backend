import { uploadController } from "@/controllers/image.controller";
import { Router } from "express";
const routers = Router();

routers.post("/upload", uploadController);

export default routers;
