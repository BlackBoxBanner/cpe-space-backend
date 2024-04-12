import { APIController } from "@/types/responseType";
import { EventPostType } from "@/types/zodSchema";
import { customError } from "@/utils/customError";
import prisma from "@/utils/prisma";

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

export const deletePostEvent: APIController<string> = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error("Id is required");

    await prisma.eventPost.delete({
      where: {
        id: id,
      },
    });

    return res.status(200).json({ data: `Delete post id of \'${id}\'` });
  } catch (error) {
    return res.status(400).json(customError(error));
  }
}