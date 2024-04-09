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

type UploadBody = {
  name: string;
  base64: string;
};

export const uploadController: APIController<string, UploadBody> = async (req, res, _next) => {
  try {
    const { base64, name } = req.body;

    const nameSplit = name.split("/");

    const minio = useMinio();

    !(await minio.bucketExists(nameSplit[0])) &&
      (await minio.makeBucket(nameSplit[0]));

    const imageBuffer = Buffer.from(
      base64.replace(/^data:image\/\w+;base64,/, ""),
      "base64",
    );

    await minio.putObject(nameSplit[0], nameSplit[1], imageBuffer);

    return res.status(200).json({ data: name });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(403).json({ error: { customError: error.message } });
    }
    return res.status(200).json({ error: { customError: "Internal Error" } });
  }
};