import { APIController } from "@/types/responseType"
import { UserSchema, UserType } from "@/types/zodSchema"

export const mainGetController: APIController<{ message: string }> = async (req, res, _next) => {
  return res.status(200).json({ data: { message: "Server says HI!!" } })
}

export const mainPostController: APIController = async (req, res, _next) => {
  const body = req.body

  return res.status(200).json({ data: { body } })
}