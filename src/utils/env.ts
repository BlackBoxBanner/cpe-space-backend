import { envVariable } from "@dookdiks/utils";

export const PORT_ENV = envVariable("PORT", "5100");
export const DATABASE_URL_ENV = envVariable("DATABASE_URL");
export const MINIO_ENDPOINT_ENV = envVariable("MINIO_ENDPOINT");
export const MINIO_PORT_ENV = envVariable("MINIO_PORT");
export const MINIO_SECRET_KEY_ENV = envVariable("MINIO_SECRET_KEY");
export const MINIO_ACCESS_KEY_ENV = envVariable("MINIO_ACCESS_KEY");
export const API_TOKEN_ENV = envVariable("API_TOKEN");
export const JWT_SECRET_ENV = envVariable("JWT_SECRET")