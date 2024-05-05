import { APIController, APIControllerImage } from '@/types/responseType';
import { customError } from '@/utils/customError';
import { useMinio } from '@/utils/minio';

type UploadBody = {
  name: string;
  base64: string;
};

export const uploadController: APIController<string, UploadBody> = async (
  req,
  res,
  _next,
) => {
  try {
    const { base64, name } = req.body;

    const nameSplit = name.split('/');

    const minio = useMinio();

    !(await minio.bucketExists(nameSplit[0])) &&
      (await minio.makeBucket(nameSplit[0]));

    const imageBuffer = Buffer.from(
      base64.replace(/^data:image\/\w+;base64,/, ''),
      'base64',
    );

    await minio.putObject(nameSplit[0], nameSplit[1], imageBuffer);

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
