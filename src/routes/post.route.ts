import { createPostController } from "@/controllers/post.controller";
import { Router } from "express";
const routers = Router();

routers.get("/", () => {});
routers.post("/", createPostController);
routers.patch("/:id", () => {});
routers.delete("/:id",  () => {});

routers.post("/:id/like", () => {});
routers.get("/:id/like", () => {});

export default routers;
