import { createPostController } from "@/controllers/post.controller";
import { Router } from "express";
const routers = Router();

routers.get("/", () => {});
routers.post("/", createPostController);
routers.patch("/:id", () => {});
routers.delete("/:id",  () => {});
export default routers;
