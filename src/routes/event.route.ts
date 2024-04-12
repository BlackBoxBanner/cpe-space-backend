import { patchEvent } from "@/controllers/event/event.controller";
import { getEventController, getManyEventController } from "@/controllers/event/event.controller";
import { getEventPosts, getManyEventPosts } from "@/controllers/event/eventPost.controller";
import { Router } from "express";

const routers = Router();

// get all events
routers.get("/", getManyEventController);

// get event
routers.get("/:id", getEventController);

// create event
routers.post("/", () => { });

// update event
routers.patch("/:id", patchEvent);

// delete event
routers.delete("/:id", () => { });

// get all posts
routers.get("/post", getManyEventPosts);

// get post
routers.get("/post/:id", getEventPosts);

// create post
routers.post("/post", () => { });

// update post
routers.patch("/post/:id", () => { });

// delete post
routers.delete("/post/:id", () => { });

// get all attendees
routers.get("/attendees", () => { });

// join event
routers.post("/join/:id", () => { });

// leave event
routers.post("/leave/:id", () => { });

export default routers;
