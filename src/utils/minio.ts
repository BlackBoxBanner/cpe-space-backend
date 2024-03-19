import Minio from "minio";
import { MINIO_ACCESS_KEY_ENV, MINIO_ENDPOINT_ENV, MINIO_SECRET_KEY_ENV, } from "@/utils/env";

export const minio = new Minio.Client({
  endPoint: MINIO_ENDPOINT_ENV || 'localhost:9000',
  port: 9000,
  useSSL: true,
  accessKey: MINIO_ACCESS_KEY_ENV || "NvyrAOeXthfbguezGizGxIqLrQbv6ROC",
  secretKey: MINIO_SECRET_KEY_ENV || "LEXNjqN0OlW53cHFTsBZfc7q2NGjZiIs",
})