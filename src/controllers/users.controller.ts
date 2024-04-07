import { APIController, PostBody } from "@/types/responseType";
import prisma from "@/utils/prisma";
import { User } from "@prisma/client";

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
