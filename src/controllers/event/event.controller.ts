import { APIController } from "@/types/responseType";
import { EventPostType, EventPostSchema } from "@/types/zodSchema";
import { customError } from "@/utils/customError";
import prisma from "@/utils/prisma";
import { v4 as uuidv4 } from "uuid";

// const

export const postEventPost: APIController<EventPostType, Omit<EventPostType, "createdAt" | "updatedAt" | "id" | "authorId">> = async (req, res) => {
  try {
    const body = req.body;
    const cookies = req.cookies;

    const userId = cookies.userId;

    if (!userId) throw new Error("User not found");

    const validateData = EventPostSchema.omit({ id: true, createdAt: true, updatedAt: true, authorId: true }).parse(body);

    const data = await prisma.eventPost.create({
      data: {
        ...validateData,
        authorId: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
        id: uuidv4(),

      }
    });

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(400).json(customError(error));
  }
}