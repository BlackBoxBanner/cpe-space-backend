import { APIController, PostBody } from "@/types/responseType";
import { customError } from "@/utils/customError";
import prisma from "@/utils/prisma";
import { User } from "@prisma/client";

type UserExcludePassword = Omit<User, "password">;
export const usersGetController: APIController<UserExcludePassword | UserExcludePassword[]> = async (
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
            touched: queries.touched ? (queries.touched == "true" ? true : false) : undefined,
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
                student: true,
            },
        });

        return res.status(200).json({ data: userData.length > 1 ? userData : userData[0] });

    } catch (error) {
        return res.status(200).json(customError(error));

    };
}