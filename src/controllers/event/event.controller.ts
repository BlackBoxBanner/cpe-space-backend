import { APIController } from "@/types/responseType";
import { customError } from "@/utils/customError";
import prisma from "@/utils/prisma";

export const deleteEvent: APIController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || id === "") throw new Error("Id is required");

    const event = await prisma.event.delete({
      where: {
        id
      },
    });
    return res.status(200).json({ data: event });
  } catch (error: any) {
    return res.status(400).json(customError(error));
  }
}