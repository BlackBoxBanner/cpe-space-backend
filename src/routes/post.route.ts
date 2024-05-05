import { createPostController, deletePostController, getPostController } from "@/controllers/post.controller";
import { Router } from "express";
const routers = Router();

routers.get("/", getPostController);
routers.post("/", createPostController);
routers.patch("/:id", () => {});
routers.delete("/:id",  deletePostController);
export default routers;
