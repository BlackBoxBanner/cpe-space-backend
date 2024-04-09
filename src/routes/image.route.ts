import { deleteController } from "@/controllers/image.controller";
import { Router } from "express";
const routers = Router();

routers.delete("/delete/:path/:name", deleteController);

export default routers;
