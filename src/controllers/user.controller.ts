import { prisma } from "@/utils/prisma"
import bcrypt from "bcrypt"

import { APIController } from "@/types/responseType"
import { UserSchema, UserType } from "@/types/zodSchema"
import { getCookies } from "@/utils/cookies"



type test = Omit<UserType, "password">
export const userGetController: APIController<UserType> = async (req, res, _next) => {
  const body = req.body
  const parseBody = UserSchema.safeParse(body)

  if (!parseBody.success) {
    return res.status(400).json({ error: { zodError: parseBody.error.format() } })
  }

  return res.status(200).json({ data: parseBody.data })
}


export const userChangePasswordController: APIController<Pick<UserType, "password"> | null> = async (req, res, _next) => {
  const cookie = getCookies(req.headers.cookie)
  const userid = cookie["user-id"]

  const body = req.body
  const parseBody = UserSchema.pick({ password: true }).safeParse(body)

  if (!parseBody.success) {
    return res.status(400).json({ error: { zodError: parseBody.error.format() } })
  }

  try {
    await prisma.user.update({
      where: {
        id: userid
      },
      data: {
        password: await bcrypt.hash(parseBody.data.password, 10)
      }
    })
  } catch (err: unknown) {
    if (err instanceof Error) res.status(400).json({ error: { customError: err.message } })
    return res.status(400).json({ error: { customError: "Unable to change user password due to some problems. Please contact admin to continue the process." } })
  }

  return res.status(200).json({ data: null })
}