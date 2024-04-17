import { patchEvent, postEventPost } from "@/controllers/event/event.controller";
import { getEventController, getManyEventController, deleteEvent } from "@/controllers/event/event.controller";
import { deletePostEvent, getEventPosts, getManyEventPosts, patchPostEvent } from "@/controllers/event/eventPost.controller";
import { joinEvent, leaveEvent, getEventParticipants } from "@/controllers/event/eventAttendee.controller";
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
routers.delete("/:id", deleteEvent);

// get all posts
routers.get("/post", getManyEventPosts);

// get post
routers.get("/post/:id", getEventPosts);

// create post
routers.post("/post", postEventPost);

// update post
routers.patch("/post/:id", patchPostEvent);

// delete post
routers.delete("/post/:id", deletePostEvent);

// get all attendees
routers.get("/attendees/:id", getEventParticipants);

// join event
routers.post("/join/:id", joinEvent);

// leave event
routers.post("/leave/:id", leaveEvent);

export default routers;
