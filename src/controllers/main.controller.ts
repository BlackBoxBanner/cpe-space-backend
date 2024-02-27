import { APIController } from "@/types/responseType"
import { UserSchema, UserType } from "@/types/zodSchema"

export const mainGetController: APIController<UserType> = async (req, res, _next) => {
  const body = req.body
  const parseBody = UserSchema.safeParse(body)

  if (!parseBody.success) {
    return res.status(400).json({ error: { zodError: parseBody.error.format() } })
  }

  return res.status(200).json({ data: parseBody.data })
}

export const mainPostController: APIController = async (req, res, _next) => {
  const body = req.body

  return res.status(200).json({ data: { body } })
}