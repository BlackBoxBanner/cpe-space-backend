import { createLikeController } from "@/controllers/like.controller";
import { createPostController, deletePostController, getPostController } from "@/controllers/post.controller";
import { Router } from "express";
const routers = Router();

routers.get("/", getPostController);
routers.post("/", createPostController);
routers.patch("/:id", () => {});
routers.delete("/:id",  deletePostController);

routers.post("/:id/like", createLikeController);
routers.delete("/:id/like", () => {});

export default routers;
