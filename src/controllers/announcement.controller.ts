import { APIController, PostBody } from "@/types/responseType";
import { AnouncementFormSchema } from "@/types/zodSchema";
import { customError } from "@/utils/customError";
import prisma from "@/utils/prisma";
import { Anouncement } from "@prisma/client";

export const announcementGetController: APIController<Anouncement[]> = async (
    req,
    res,
    _next
) => {
    try {
        const announcement = await prisma.anouncement.findMany();

        if (announcement == null)
            return res
                .status(204)
                .json({ error: { customError: "No announcement found" } });

        return res.status(200).json({ data: announcement });
    } catch (error) {
        if (error instanceof Error) {
            return res
                .status(403)
                .json({ error: { customError: error.message } });
        }

        return res
            .status(200)
            .json({ error: { customError: "Internal Error" } });
    }
};

export const announcementGetbyIdController: APIController<Anouncement> = async (
    req,
    res,
    _next
) => {
    try {
        const id: string = req.params.id;
        const announcement = await prisma.anouncement.findUnique({
            where: { id },
        });

        if (announcement == null)
            return res
                .status(204)
                .json({ error: { customError: "No announcement found" } });

        return res.status(200).json({ data: announcement });
    } catch (error) {
        if (error instanceof Error) {
            return res
                .status(403)
                .json({ error: { customError: error.message } });
        }

        return res
            .status(200)
            .json({ error: { customError: "Internal Error" } });
    }
};

export const announcementPostController: APIController<any> = async (
    req,
    res,
    _next
) => {
    const body = req.body.data;
    const authorId: string = req.cookies["user-id"];

    try {
        const validateAnnouncement = AnouncementFormSchema.safeParse(body);

        if (!validateAnnouncement.success)
            return res.status(403).json({
                error: { zodError: validateAnnouncement.error.format() },
            });

        const anouncement = await prisma.anouncement.create({
            data: { authorId, ...validateAnnouncement.data },
        });

        return res.status(200).json({ data: anouncement });
    } catch (error) {
        if (error instanceof Error) {
            return res
                .status(403)
                .json({ error: { customError: error.message } });
        }

        return res
            .status(200)
            .json({ error: { customError: "Internal Error" } });
    }
};

export const announcementDeleteController: APIController<Anouncement> = async (
    req,
    res,
    _next
) => {
    try {
        const id: string = req.params.id;
        const announcement = await prisma.anouncement.delete({ where: { id } });

        if (announcement == null)
            return res
                .status(204)
                .json({ error: { customError: "No announcement delete" } });

        return res.status(200).json({ data: announcement });
    } catch (error) {
        return res.status(400).json(customError(error));
    }
};

export const announcementPatchController: APIController<Anouncement> = async (
    req,
    res,
    _next
) => {
    const body = req.body.data;
    const id: string = req.params.id;
    try {
        const validateAnnouncement = AnouncementFormSchema.safeParse(body);

        if (!validateAnnouncement.success)
            return res.status(403).json({
                error: { zodError: validateAnnouncement.error.format() },
            });
        const anouncement = await prisma.anouncement.update({
            where: { id },
            data: { ...validateAnnouncement.data },
        });

        return res.status(200).json({ data: anouncement });
    } catch (error) {
        return res.status(400).json(customError(error));
    }
};
