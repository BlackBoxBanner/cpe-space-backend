import { Client } from "minio";
import { env } from "@/utils/env";

const useMinio = () => {
  return new Client({
    endPoint: env.MINIO_ENDPOINT,
    port: Number.parseInt(env.MINIO_PORT),
    useSSL: false,
    accessKey: env.MINIO_ACCESS_KEY,
    secretKey: env.MINIO_SECRET_KEY,
  })
}
export { useMinio }