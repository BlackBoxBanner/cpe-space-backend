import { APIController } from "@/types/responseType";
import { EventPostSchema, EventPostType } from "@/types/zodSchema";
import { customError } from "@/utils/customError";
import prisma from "@/utils/prisma";

export const patchPostEvent: APIController<EventPostType> = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error("id is required");

    const body = req.body;

    const validateData = EventPostSchema.omit({ id: true, createdAt: true, updatedAt: true, authorId: true }).parse(body);

    const data = await prisma.eventPost.update({
      where: { id },
      data: {
        ...validateData,
        updatedAt: new Date(),
      },
    });

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(400).json(customError(error));
  }
}