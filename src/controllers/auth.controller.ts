import { APIController } from "@/types/responseType"

export const signoutController: APIController<string> = async (req, res, _next) => {
    try {
        res.clearCookie("cpe_space_session")
        res.clearCookie("user-id")

        return res.status(200).json({ data: "signout success" })
    } catch (error) {
        if (error instanceof Error) {
            return res.status(403).json({ error: { customError: error.message } })
        }
        return res.status(200).json({ error: { customError: "Internal Error" } })
    }

}