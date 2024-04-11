import { patchPostEvent } from "@/controllers/event/eventPost.controller";
import { Router } from "express";

const routers = Router();

// get all events
routers.get("/", () => { });

// get event
routers.get("/:id", () => { });

// create event
routers.post("/", () => { });

// update event
routers.patch("/:id", () => { });

// delete event
routers.delete("/:id", () => { });

// get all posts
routers.get("/post", () => { });

// get post
routers.get("/post/:id", () => { });

// create post
routers.post("/post", () => { });

// update post
routers.patch("/post/:id", patchPostEvent);

// delete post
routers.delete("/post/:id", () => { });

// get all attendees
routers.get("/attendees", () => { });

// join event
routers.post("/join/:id", () => { });

// leave event
routers.post("/leave/:id", () => { });

export default routers;
