import { useMinio } from '@/utils/minio';

export type UploadBody = {
  name: string;
  base64: string;
};

export const uploadImage = async ({ base64, name }: UploadBody) => {
  const nameSplit = name.split('/');

  const minio = useMinio();

  !(await minio.bucketExists(nameSplit[0])) &&
    (await minio.makeBucket(nameSplit[0]));

  const imageBuffer = Buffer.from(
    base64.replace(/^data:image\/\w+;base64,/, ''),
    'base64',
  );

  await minio.putObject(nameSplit[0], nameSplit[1], imageBuffer);
};
