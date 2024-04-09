import { APIController } from "@/types/responseType"
import { UserFormSchema, UserFormType } from "@/types/zodSchema"
import { decrypt } from "@/utils/decryption"
import prisma from "@/utils/prisma"
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from 'uuid';

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
        if (error instanceof Error) {
            return res.status(403).json({ error: { customError: error.message } })
        }
        return res.status(200).json({ error: { customError: "Internal Error" } })
    }
}