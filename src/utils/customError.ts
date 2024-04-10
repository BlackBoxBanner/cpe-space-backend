import { prismaCustomErrorHandler } from "@/utils/prisma/error";

// Define a type for the error response
export type ErrorResponse = { error: { customError: string } };

export const returnErrorFormat = (message: string): ErrorResponse => {
  return { error: { customError: message } };
};

type CustomErrorHandler = (unknownError: unknown) => ErrorResponse | undefined;

const customErrorHandler: CustomErrorHandler = (unknownError) => {
  if (unknownError instanceof Error) {
    return returnErrorFormat(unknownError.message);
  }
}
export const customError = (unknownError: unknown): ErrorResponse => {
  const prismaError = prismaCustomErrorHandler(unknownError)
  const customError = customErrorHandler(unknownError)
  return prismaError ? prismaError : customError ? customError : returnErrorFormat("Internal Error");

}