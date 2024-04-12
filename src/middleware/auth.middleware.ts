import { APIMiddleware } from "@/types/responseType"

export const authMiddleware: APIMiddleware = async (req, res, next) => {
  const cookies = req.cookies

  const session = cookies["cpe_space_session"]
  const userId = cookies["user-id"]

  if (!session || !userId) return res.status(403).json({ error: { customError: "not login" } })

  next()
}