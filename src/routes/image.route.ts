import { getController } from "@/controllers/image.controller";
import { Router } from "express";
const routers = Router();

routers.get("/get/:path/:name", getController);

export default routers;
