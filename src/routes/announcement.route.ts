import {
    announcementDeleteController,
    announcementGetController,
    announcementGetbyIdController,
    announcementPostController,
} from "@/controllers/announcement.controller";
import { Router } from "express";

const routers = Router();

routers.get("/", announcementGetController);
routers.get("/:id", announcementGetbyIdController);
routers.post("/", announcementPostController);
routers.delete("/:id", announcementDeleteController);
export default routers;
