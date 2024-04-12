import { APIController } from "@/types/responseType";
import { EventParticipantsType } from "@/types/zodSchema";
import { customError } from "@/utils/customError";
import prisma from "@/utils/prisma";

export const joinEvent: APIController<string> = async (req, res) => {
  try {

    const { id } = req.params;
    const cookies = req.cookies;
    const userid = cookies.userid;

    if (!id) throw new Error("event id is required");
    if (!userid) throw new Error("signin to join event");

    await prisma.eventParticipants.create({
      data: {
        eventId: id,
        userId: userid,
        createdAt: new Date(),
      }
    })

    return res.status(200).json({ data: "Event participent joined." });
  } catch (error) {
    return res.status(400).json(customError(error));
  }
}