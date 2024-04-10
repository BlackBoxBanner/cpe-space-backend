import { APIController, PostBody } from "@/types/responseType";
import { AnouncementFormSchema } from "@/types/zodSchema";
import prisma from "@/utils/prisma";
import { Anouncement } from "@prisma/client";
import bcrypt from "bcrypt";
import { SafeParseReturnType } from "zod/lib";

export const announcementGetController: APIController<any> = async (
    req,
    res,
    _next
) => {

    return res.status(200).json({
        data: {
            message: "Hello World",
        },
    });
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
                data: { zodError: validateAnnouncement.error.format() },
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
