import { ZodFormattedError } from "zod";
import type { Request, Response, NextFunction } from "express";

export type APIController<T = Record<string, any>> = (
  req: Request,
  res: Response<ReturnResponse<T>>,
  next: NextFunction
) => Promise<Response<ReturnResponse<T>>>;


export type APIMiddleware<T = never> = (
  req: Request,
  res: Response<ReturnResponse<T>>,
  next: NextFunction
) => Promise<Response<ReturnResponse<T>> | void>

export type ReturnResponse<T> =
  | {
    data: T;
    error?: never;
  }
  | {
    data?: never;
    error: ErrorResponse<T>;
  };

export type ErrorResponse<T> =
  | {
    zodError: ZodFormattedError<T>;
    customError?: never;
  }
  | {
    zodError?: never;
    customError: string;
  };
