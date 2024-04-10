import { APIController } from "@/types/responseType";
import { customError } from "@/utils/customError";
import prisma from "@/utils/prisma";
import { Event } from "@prisma/client";

export const getManyEventController: APIController<Event[]> = async (req, res, _next) => {
  try {
    const events = await prisma.event.findMany()
    return res.status(200).json({ data: events })
  } catch (error) {
    return res.status(400).json(customError(error))
  }
}

export const getEventController: APIController<Event> = async (req, res, _next) => {
  try {
    const { id } = req.params

    const events = await prisma.event.findUnique({ where: { id } })

    if (!events) throw new Error('Event not found')

    return res.status(200).json({ data: events })
  } catch (error) {
    return res.status(400).json(customError(error))
  }
}
