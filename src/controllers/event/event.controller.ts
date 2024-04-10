import { APIController } from "@/types/responseType";
import { customError } from "@/utils/customError";
import prisma from "@/utils/prisma";
import { Event } from "@prisma/client";

export const getManyEventController: APIController<Event[]> = async (req, res, _next) => {
  try {
    const enents = await prisma.event.findMany()
    return res.status(200).json({ data: enents })
  } catch (error) {
    return res.status(400).json(customError(error))
  }
}