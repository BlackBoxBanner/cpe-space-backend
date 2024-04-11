import { APIController } from "@/types/responseType";
import { EventPostType } from "@/types/zodSchema";
import { customError } from "@/utils/customError";
import prisma from "@/utils/prisma";
import { Event } from "@prisma/client";

export const getManyEventPosts: APIController<EventPostType[], null> = async (req, res) => {
  try {
    const eventPosts = await prisma.eventPost.findMany();

    return res.status(200).json({ data: eventPosts });
  } catch (error) {
    return res.status(400).json(customError(error));
  }
}

export const getEventPosts: APIController<EventPostType, null> = async (req, res) => {
  try {
    const { id } = req.query as { id: string };

    const eventPost = await prisma.eventPost.findUnique({
      where: { id },
    });

    if (!eventPost) throw new Error("Event post not found");

    return res.status(200).json({ data: eventPost });
  }
  catch (error) {
    return res.status(400).json(customError(error));
  }
}
