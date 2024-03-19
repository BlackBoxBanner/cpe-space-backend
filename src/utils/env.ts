export type CheckEnvVariableType = (envVar: string, defaultValue?: string | null) => string

export const checkEnvVariable: CheckEnvVariableType = (envVar, defaultValue = null) => {
  const value = process.env[envVar];

  if (!value || value === "") {
    if (defaultValue !== null) {
      return defaultValue;
    } else {
      throw new Error(`${envVar} does not exist in .env file.`);
    }
  }

  return value;
};

export const PORT_ENV = checkEnvVariable("PORT", "5100");
export const DATABASE_URL_ENV = checkEnvVariable("DATABASE_URL");
export const MINIO_ENDPOINT_ENV = checkEnvVariable("MINIO_ENDPOINT");
export const MINIO_PORT_ENV = checkEnvVariable("MINIO_PORT");
export const MINIO_SECRET_KEY_ENV = checkEnvVariable("MINIO_SECRET_KEY");
export const MINIO_ACCESS_KEY_ENV = checkEnvVariable("MINIO_ACCESS_KEY");
export const API_TOKEN_ENV = checkEnvVariable("API_TOKEN");
export const JWT_SECRET_ENV = checkEnvVariable("JWT_SECRET")