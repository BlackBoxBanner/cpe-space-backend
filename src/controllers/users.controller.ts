import { APIController, PostBody } from "@/types/responseType";
import { UserFormSchema } from "@/types/zodSchema";
import { customError } from "@/utils/customError";
import prisma from "@/utils/prisma";
import { Prisma, User } from "@prisma/client";
import { z } from "zod";

type UserExcludePassword = Omit<User, "password">;
export const usersGetController: APIController<UserExcludePassword> = async (
    req,
    res,
    _next
) => {
    const id = req.params.id;

    const userData = await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            studentid: true,
            name: true,
            email: true,
            phone: true,
            program: true,
            image: true,
            touched: true,
            role: true,
            student: true,
        },
    });

    if (!userData) {
        return res
            .status(404)
            .json({ error: { customError: "User not found" } });
    }

    return res.status(200).json({ data: userData });
};

export const usersPostController: APIController<Prisma.BatchPayload> = async (
    req,
    res,
    _next
) => {
    try {
        const UserFormSchemaArray = z.array(UserFormSchema);

        const validateUser = UserFormSchemaArray.safeParse(req.body);

        if (!validateUser.success)
            return res
                .status(400)
                .json({ error: { zodError: validateUser.error.format() } });

        const userData = await prisma.user.createMany({
            data: validateUser.data,
            skipDuplicates: true,
        });

        return res.status(201).json({ data: userData });

    } catch (error) {
        return res.status(400).json(customError(error));
    }
};