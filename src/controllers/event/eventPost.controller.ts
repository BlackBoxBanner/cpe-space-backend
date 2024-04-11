import { APIController } from "@/types/responseType";
import { customError } from "@/utils/customError";
import prisma from "@/utils/prisma";

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