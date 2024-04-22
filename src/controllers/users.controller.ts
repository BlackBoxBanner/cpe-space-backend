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
        const query = req.query;

        const id = query.id as string;
        const stuendtid = query.studentid as string;


        if (id) {
            const userWithId = await prisma.user.findUnique({
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

            if (!userWithId) throw new Error("User not found");

            return res.status(200).json({ data: userWithId });
        }

        if (stuendtid) {
            console.log("studentid");

            const userWithStudentId = await prisma.user.findUnique({
                where: { studentid: stuendtid },
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

            if (!userWithStudentId) throw new Error("User not found");

            return res.status(200).json({ data: userWithStudentId });
        }

        const userData = await prisma.user.findMany({
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

        return res.status(200).json({ data: userData });

    } catch (error) {
        return res.status(200).json(customError(error));

    };
}