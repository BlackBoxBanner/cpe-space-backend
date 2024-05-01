import zod from 'zod';
import { APIController } from "@/types/responseType"
import { cookieOptions } from "@/utils/cookies"
import { customError } from "@/utils/customError"
import { UserSchema } from "@/types/zodSchema"
import { decrypt } from "@/utils/decryption"
import prisma from "@/utils/prisma"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from 'uuid';
import { env } from "@/utils/env"
import { mailerSend, sentFrom, setRecipients } from "@/utils/mailersend"
import { EmailParams } from "mailersend"
import { User } from "@prisma/client"

type UserType = zod.infer<typeof UserSchema>

export const loginController: APIController<{ session: string, userId: string }> = async (req, res, _next) => {
    try {
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

        if (user.touched === false) throw new Error("Please change your password first")

        const token = jwt.sign(
            { email: user.email },
            env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("cpe_space_session", token, cookieOptions);

        res.cookie("user-id", user.id, cookieOptions);

        return res.status(200).json({ data: { session: token, userId: user.id } })

    } catch (error) {
        return res.status(400).json(customError(error))
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

const UserFormSchema = UserSchema.omit({
    id: true,
    touched: true,
    role: true,
    // program: true,
})

type UserFormType = zod.infer<typeof UserFormSchema>

export const registerController: APIController<string> = async (req, res, _next) => {
    try {
        const { confirmPassword, ...restbody } = decrypt<UserFormType & { confirmPassword: string }>(req.body.data)

        const validateUser = UserFormSchema.safeParse(restbody)

        console.log(validateUser);


        if (!validateUser.success) return res.status(403).json({ error: { zodError: validateUser.error.format() } })

        if (restbody.password !== confirmPassword) throw new Error("password does not match")

        const hashPassword = await bcrypt.hash(restbody.password, 10)

        const { password, ...restData } = validateUser.data

        await prisma.user.create({
            data: {
                id: uuidv4(),
                ...restData,
                password: hashPassword,
                program: restData.program as User["program"],
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

        const user = await prisma.user.findUnique({
            where: {
                studentid
            }
        })

        if (!user) throw new Error("user does not exist")

        if (await bcrypt.compare(password, user.password)) throw new Error("can not use the same password")

        await prisma.user.update({
            where: {
                studentid
            },
            data: {
                password: hash,
                touched: true,
            }
        })

        return res.status(200).json({ data: "Successfully change user password." })

    } catch (error) {
        return res.status(200).json(customError(error))
    }
}


export const checkPasswordController: APIController<string> = async (req, res, _next) => {
    try {
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

        return res.status(200).json({ data: "Matched" })

    } catch (error) {
        return res.status(400).json(customError(error))
    }

}

export const changePasswordValidTicketController: APIController<User> = async (req, res, _next) => {
    const { data } = req.params

    if (!data) return res.status(403).json({
        error: {
            customError: "ticket is required"
        }
    })

    try {

        const validTicket = jwt.verify(data, env.JWT_SECRET) as {
            studentid: string,
            password: string,
            iat: number,
            exp: number,
        }

        const user = await prisma.user.findUnique({ where: { studentid: validTicket.studentid } })

        if (!user) throw new Error("invalid ticke")

        const isPasswordSame = user.password === validTicket.password

        if ((validTicket.exp * 1000) >= new Date().getTime() && isPasswordSame) {
            return res.status(200).json({ data: user })
        }

        throw new Error("invalid ticket")
    } catch (error) {
        console.log(error);

        return res.status(400).json(customError(error))
    }
}

export const generateChangePasswordTicketController: APIController<string, { data: { studentid: string } }> = async (req, res, _next) => {
    const data = req.body.data


    if (!data.studentid) return res.status(403).json({
        error: {
            customError: "studentid is required"
        }
    })

    try {
        const user = await prisma.user.findUnique({
            where: {
                studentid: data.studentid
            }
        })

        if (!user) throw new Error("user does not exist")

        const ticket = jwt.sign(
            { studentid: user.studentid, password: user.password },
            env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        if (!user.email) throw new Error("user does not have email")

        const emailParams = new EmailParams()
            .setFrom(sentFrom)
            .setTo(setRecipients({ email: user.email, name: user.name }))
            .setReplyTo(sentFrom)
            .setSubject("Change Password Ticket")
            .setHtml(`Your ticket is <a href="${env.CLIENT_DOMAIN}/change-password/${ticket}">here</a>`)
            .setText(`Your ticket is ${env.CLIENT_DOMAIN}/change-password/${ticket}`)

        const emailRes = await mailerSend.email.send(emailParams)

        console.log(emailRes.body)

        return res.status(200).json({ data: ticket })
    } catch (error) {
        return res.status(400).json(customError(error))
    }

}
