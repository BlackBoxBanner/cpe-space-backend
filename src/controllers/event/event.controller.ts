import { APIController } from "@/types/responseType";
import { EventSchema, EventType } from "@/types/zodSchema";
import { customError } from "@/utils/customError";
import prisma from "@/utils/prisma";

export const patchEvent: APIController<EventType> = async (req, res) => {
  try {
    const { id } = req.params;

    const validateEnvent = EventSchema.omit({ updatedAt: true, createdAt: true }).safeParse(req.body);

    if (!validateEnvent.success) return res.status(400).json({ error: { zodError: validateEnvent.error.format() } });

    const eventUpdate = validateEnvent.data

    if (!id || id === "") throw new Error("Id is required");

    const event = await prisma.event.update({
      where: {
        id
      },
      data: {
        ...eventUpdate,
        updatedAt: new Date()
      },
    });
    return res.status(200).json({ data: event });
  } catch (error: any) {
    return res.status(400).json(customError(error));
  }
}