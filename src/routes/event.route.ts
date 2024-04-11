import { joinEvent } from "@/controllers/event/eventAttendee.controller";
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
routers.patch("/post/:id", () => { });

// delete post
routers.delete("/post/:id", () => { });

// get all attendees
routers.get("/attendees/:id", () => { });

// join event
routers.post("/join/:id", joinEvent);

// leave event
routers.post("/leave/:id", () => { });

export default routers;
