import { APIMiddleware } from "@/types/responseType"
import { getCookies } from "@/utils/cookies"
import { util } from "node-forge"

export const middleware: APIMiddleware = async (req, res, next) => {
  const { headers } = req
  const headerToken = (headers.authorization) ? headers.authorization.split(' ')[1] : null
  const token = process.env.API_TOKEN

  if (!headerToken || headerToken !== token) {
    return res.status(401).json({ error: { customError: "Unauthorized" } })
  }

  if (headerToken !== token) return res.status(401).json({ error: { customError: "Unauthorized" } })

  next()
}