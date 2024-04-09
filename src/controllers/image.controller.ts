import { APIController, APIControllerImage } from "@/types/responseType";
import { useMinio } from "@/utils/minio";

export const getController: APIControllerImage = async (req, res, _next) => {
  try {
    const { name, path } = req.params as { name: string; path: string };
    const minio = useMinio();
    const stream = await minio.getObject(path, name)
    return stream.pipe(res);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(403).json({ error: { customError: error.message } });
    }
    return res.status(200).json({ error: { customError: "Internal Error" } });
  }
};