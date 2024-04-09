import { getController } from "@/controllers/image.controller";
import { Router } from "express";
const routers = Router();

routers.get("/get/:path/:name", getController);

export default routers;
import { uploadController } from "@/controllers/image.controller";
import { Router } from "express";
const routers = Router();

routers.post("/upload", uploadController);

export default routers;
