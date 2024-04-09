import { APIController, APIControllerImage } from "@/types/responseType";
import { useMinio } from "@/utils/minio";

export const getPathController: APIController<string[]> = async (req, res, _next) => {
  try {
    const minio = useMinio();
    const list = await minio.listBuckets();
    return res.status(200).json({ data: list.reduce((acc, cur) => acc.concat(cur.name), [] as string[]) });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(403).json({ error: { customError: error.message } });
    }
    return res.status(200).json({ error: { customError: "Internal Error" } });
  }
}