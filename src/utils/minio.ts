import Minio from "minio";

export const minio = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || 'localhost:9000',
  port: 9000,
  useSSL: true,
  accessKey: process.env.MINIO_ACCESS_KEY || "NvyrAOeXthfbguezGizGxIqLrQbv6ROC",
  secretKey: process.env.MINIO_SECRET_KEY || "LEXNjqN0OlW53cHFTsBZfc7q2NGjZiIs",
})