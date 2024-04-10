import { APIController } from "@/types/responseType"
import { UserFormSchema, UserFormType, UserSchema } from "@/types/zodSchema"
import { cookieOptions } from "@/utils/cookies"
import { customError } from "@/utils/customError"
import { decrypt } from "@/utils/decryption"
import { JWT_SECRET_ENV } from "@/utils/env"
import prisma from "@/utils/prisma"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from 'uuid';

export const loginController: APIController<string> = async (req, res, _next) => {
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST');

        const body = decrypt(req.body.data)

        const validateLogin = UserSchema.pick({ studentid: true, password: true }).safeParse(body)

        if (!validateLogin.success) return res.status(403).json({ error: { zodError: validateLogin.error.format() } })

        const { password, studentid } = validateLogin.data

        const user = await prisma.user.findUnique({
            where: {
                studentid
            }
        })

        if (!user) throw new Error("user does not exist")

        const match = await bcrypt.compare(password, user.password)

        if (!match) throw new Error("password doest not match")

        const token = jwt.sign(
            { email: user.email },
            JWT_SECRET_ENV,
            { expiresIn: "1d" }
        );

        res.cookie("cpe_space_session", token, cookieOptions);

        res.cookie("user-id", user.id, cookieOptions);

        return res.status(200).json({ data: token })

    } catch (error) {
        return res.status(200).json(customError(error))
    }

}

export const signoutController: APIController<string> = async (_req, res, _next) => {
    try {
        res.clearCookie("cpe_space_session")
        res.clearCookie("user-id")

        return res.status(200).json({ data: "signout success" })
    } catch (error) {
        return res.status(200).json(customError(error))
    }

}

export const registerController: APIController<string> = async (req, res, _next) => {
    try {
        const { confirmPassword, ...restbody } = decrypt<UserFormType & { confirmPassword: string }>(req.body.data)

        const validateUser = UserFormSchema.safeParse(restbody)

        if (!validateUser.success) return res.status(403).json({ error: { zodError: validateUser.error.format() } })

        if (restbody.password !== confirmPassword) throw new Error("password does not match")

        const hashPassword = await bcrypt.hash(restbody.password, 10)

        const { password, ...restData } = validateUser.data

        await prisma.user.create({
            data: {
                id: uuidv4(),
                touched: false,
                role: "STUDENT",
                ...restData,
                password: hashPassword,
            }
        })

        return res.status(200).json({ data: "register success" })
    } catch (error) {
        return res.status(200).json(customError(error))
    }
}
export const changePasswordController: APIController<string> = async (req, res, _next) => {
    try {
        const body = decrypt(req.body.data)

        const validateChangePassword = UserSchema.pick({ studentid: true, password: true }).safeParse(body)

        if (!validateChangePassword.success) return res.status(400).json({ error: { zodError: validateChangePassword.error.format() } })

        const { studentid, password } = validateChangePassword.data

        const hash = await bcrypt.hash(password, 10)

        await prisma.user.update({
            where: {
                studentid
            },
            data: {
                password: hash
            }
        })

        return res.status(200).json({ data: "Successfully change user password." })

    } catch (error) {
        return res.status(200).json(customError(error))
    }
}