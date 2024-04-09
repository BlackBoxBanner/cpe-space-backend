import { APIController, APIControllerImage } from "@/types/responseType";
import { useMinio } from "@/utils/minio";
export const getImagePathController: APIController<string[]> = async (req, res, _next) => {
  try {
    const { path } = req.params as { path: string };
    const minio = useMinio();
    const fileStream = minio.listObjects(path)

    if (!(await minio.bucketExists(path))) throw new Error("Bucket not found")

    let listFile: string[] = []
    fileStream.on("data", (obj) => {
      obj.name && listFile.push(obj.name)
    })
    fileStream.on("end", () => {
      res.json({ data: listFile });
    })

    return res.status(200)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(403).json({ error: { customError: error.message } });
    }
    return res.status(200).json({ error: { customError: "Internal Error" } });
  }
}