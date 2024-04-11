import { APIController } from "@/types/responseType";
import { EventParticipantsType } from "@/types/zodSchema";
import { customError } from "@/utils/customError";
import prisma from "@/utils/prisma";

export const getEventParticipants: APIController<EventParticipantsType[]> = async (req, res) => {
  try {

    const { id } = req.params;

    if (!id) throw new Error("event id is required");

    const participents = await prisma.eventParticipants.findMany({
      where: {
        eventId: id
      }
    })

    return res.status(200).json({ data: participents });
  } catch (error) {
    return res.status(400).json(customError(error));
  }
}