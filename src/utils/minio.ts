import { Client } from "minio";
import { MINIO_ACCESS_KEY_ENV, MINIO_ENDPOINT_ENV, MINIO_PORT_ENV, MINIO_SECRET_KEY_ENV, } from "@/utils/env";

const useMinio = () => {
  return new Client({
    endPoint: MINIO_ENDPOINT_ENV,
    port: Number.parseInt(MINIO_PORT_ENV),
    useSSL: false,
    accessKey: MINIO_ACCESS_KEY_ENV,
    secretKey: MINIO_SECRET_KEY_ENV,
  })
}
export { useMinio }