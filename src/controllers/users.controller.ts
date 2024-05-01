import bcrypt from 'bcrypt';
import { APIController, PostBody } from "@/types/responseType";
import { UserSchema } from "@/types/zodSchema";
import { customError } from "@/utils/customError";
import prisma from "@/utils/prisma";
import { Prisma, User } from "@prisma/client";
import { z } from "zod";


const GetUserSchema = UserSchema.omit({ password: true });

type GetUserType = z.infer<typeof GetUserSchema>;

export const usersGetController: APIController<GetUserType[]> = async (
    req,
    res,
    _next
) => {
    try {
        const queries = req.query;

        const query: Partial<Omit<User, "password">> = {
            id: queries.id ? queries.id.toString() : undefined,
            studentid: queries.studentid ? queries.studentid.toString() : undefined,
            email: queries.email ? queries.email.toString() : undefined,
            name: queries.name ? queries.name.toString() : undefined,
            program: queries.program ? queries.program as User["program"] : undefined,
            role: queries.role ? queries.role as User["role"] : undefined,
            touched: queries.touched ? (queries.touched ? true : false) : undefined,
        }

        const userData = await prisma.user.findMany({
            where: {
                ...query
            },
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
            },
        })

        const userVerify = z.array(GetUserSchema).safeParse(userData);
        if (!userVerify.success) throw new Error(userVerify.error.errors[0].message);

        return res.status(200).json({ data: userVerify.data });

    } catch (error) {
        return res.status(200).json(customError(error));

    };
}