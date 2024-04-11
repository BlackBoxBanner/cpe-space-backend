import {
    announcementDeleteController,
    announcementGetController,
    announcementGetbyIdController,
    announcementPatchController,
    announcementPostController,
} from "@/controllers/announcement.controller";
import { Router } from "express";

const routers = Router();

routers.get("/", announcementGetController);
routers.get("/:id", announcementGetbyIdController);
routers.post("/", announcementPostController);
routers.patch("/:id", announcementPatchController);
routers.delete("/:id", announcementDeleteController);
export default routers;
