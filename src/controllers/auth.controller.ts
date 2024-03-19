import { APIController } from "@/types/responseType"
import { UserSchema, UserType } from "@/types/zodSchema"
import { JWT_SECRET_ENV } from "@/utils/env"
import { prisma } from "@/utils/prisma"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const loginController: APIController<Pick<UserType, "password" | "studentid"> | Omit<UserType, "password">> = async (req, res, _next) => {
    try {
        const validateLogin = UserSchema.pick({ studentid: true, password: true }).safeParse(req.body)

        if (!validateLogin.success) return res.status(400).json({ error: { zodError: validateLogin.error.format() } })

        const { password, studentid } = validateLogin.data

        const user = await prisma.user.findUnique({
            where: {
                studentid
            }
        })

        if (!user) throw new Error("user does not exist")

        const match = await bcrypt.compare(password, user.password)

        if (!match) throw new Error("user or password doest not match")

        const token = jwt.sign(
            { email: user.email },
            JWT_SECRET_ENV,
            { expiresIn: "1d" }
        );

        res.cookie("cpe_space_session", token, {
            maxAge: 300000,
            secure: true,
            httpOnly: true,
            sameSite: "none",
        });

        res.cookie("user-id", user.id, {
            maxAge: 300000,
            secure: true,
            httpOnly: true,
            sameSite: "none",
        });
        const { password: newpassword, ...returnData } = user as UserType
        return res.status(200).json({ data: returnData })

    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            return res.status(404).json({ error: { customError: error.message } })
        }
        return res.status(200).json({ error: { customError: "Internal Error" } })
    }

}