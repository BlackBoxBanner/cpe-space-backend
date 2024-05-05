import { APIMiddleware } from '@/types/responseType';

export const userMiddleware: APIMiddleware = async (req, res, next) => {
  next();
};
