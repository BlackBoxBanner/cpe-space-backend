import { APIController } from "@/types/responseType"
import { UserSchema } from "@/types/zodSchema"
import { decrypt } from "@/utils/decryption"
import prisma from "@/utils/prisma"
import bcrypt from "bcrypt"

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
        if (error instanceof Error) {
            return res.status(400).json({ error: { customError: error.message } })
        }
        return res.status(400).json({ error: { customError: "Internal Error" } })
    }
}