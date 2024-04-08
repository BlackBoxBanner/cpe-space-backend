import { ZodFormattedError } from "zod";
import type { Request, Response, NextFunction } from "express";

export type APIController<T = Record<string, any>, U = PostBody, J = string> = (
  req: Request<Record<string, any>, any, U>,
  res: Response<ReturnResponse<T, J>>,
  next: NextFunction
) => Promise<Response<ReturnResponse<T>>>;


export type APIMiddleware<T = never> = (
  req: Request,
  res: Response<ReturnResponse<T>>,
  next: NextFunction
) => Promise<Response<ReturnResponse<T>> | void>

export type ReturnResponse<T, J = string> =
  | {
    data: T;
    error?: never;
  }
  | {
    data?: never;
    error: ErrorResponse<T, J>;
  };

export type ErrorResponse<T, J> =
  | {
    zodError: ZodFormattedError<T>;
    customError?: never;
  }
  | {
    zodError?: never;
    customError: J;
  };

export type PostBody = {
  data: string
}