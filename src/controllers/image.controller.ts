import { UploadBody, uploadImage } from '@/services/image.service';
import { APIController, APIControllerImage } from '@/types/responseType';
import { customError } from '@/utils/customError';
import { useMinio } from '@/utils/minio';

export const uploadController: APIController<string, UploadBody> = async (
  req,
  res,
  _next,
) => {
  try {
    const { base64, name } = req.body;

    await uploadImage({ base64, name });

    return res.status(200).json({ data: name });
  } catch (error) {
    return res.status(400).json(customError(error));
  }
};

export const getController: APIControllerImage = async (req, res, _next) => {
  try {
    const { name, path } = req.params as { name: string; path: string };
    const minio = useMinio();
    const stream = await minio.getObject(path, name);
    return stream.pipe(res);
  } catch (error) {
    return res.status(200).json(customError(error));
  }
};

export const getPathController: APIController<string[]> = async (
  req,
  res,
  _next,
) => {
  try {
    const minio = useMinio();
    const list = await minio.listBuckets();
    return res.status(200).json({
      data: list.reduce((acc, cur) => acc.concat(cur.name), [] as string[]),
    });
  } catch (error) {
    return res.status(200).json(customError(error));
  }
};

export const getImagePathController: APIController<string[]> = async (
  req,
  res,
  _next,
) => {
  try {
    const { path } = req.params as { path: string };
    const minio = useMinio();
    const fileStream = minio.listObjects(path);

    if (!(await minio.bucketExists(path))) throw new Error('Bucket not found');

    let listFile: string[] = [];
    fileStream.on('data', obj => {
      obj.name && listFile.push(obj.name);
    });
    fileStream.on('end', () => {
      res.json({ data: listFile });
    });

    return res.status(200);
  } catch (error) {
    return res.status(200).json(customError(error));
  }
};
