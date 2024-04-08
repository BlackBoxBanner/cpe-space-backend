import { APIController } from "@/types/responseType";
import { useMinio } from "@/utils/minio";

type UploadBody = {
  name: string,
  base64: string
}


export const uploadController: APIController<string, UploadBody> = async (req, res, _next) => {
  try {
    const { base64, name } = req.body

    const minio = useMinio()

    !(await minio.bucketExists("user-images")) && await minio.makeBucket("user-images")

    const imageBuffer = Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64')

    await minio.putObject("user-images", name, imageBuffer)

    return res.status(200).json({ data: name })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(403).json({ error: { customError: error.message } })
    }
    return res.status(200).json({ error: { customError: "Internal Error" } })
  }
}

const getController: APIController<string, string> = async (req, res, _next) => {
  try {
    return res.status(200).json({ data: "upload" })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(403).json({ error: { customError: error.message } })
    }
    return res.status(200).json({ error: { customError: "Internal Error" } })
  }
}