import {
    announcementGetController,
    announcementGetbyIdController,
    announcementPostController,
} from "@/controllers/announcement.controller";
import { Router } from "express";

const routers = Router();

routers.get("/", announcementGetController);
routers.get("/:id", announcementGetbyIdController);
routers.post("/", announcementPostController);

export default routers;
