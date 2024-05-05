import { APIMiddleware } from '@/types/responseType';

export const mainMiddleware: APIMiddleware = async (req, res, next) => {
  next();
};
