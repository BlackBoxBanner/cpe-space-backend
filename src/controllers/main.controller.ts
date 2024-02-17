import { APIController } from "@/types/responseType"

export const mainGetController: APIController = async (req, res, _next) => {
  return res.status(200).json({ data: { message: "Hello, World!" } })
}

export const mainPostController: APIController = async (req, res, _next) => {
  const body = req.body

  return res.status(200).json({ data: { body } })
}