import { Prisma } from "@prisma/client";
import { ErrorResponse, returnErrorFormat } from "@/utils/customError";

// Define a type for prismaErrorCode
type PrismaErrorCode = keyof typeof prismaErrorCode;

const prismaErrorCode = {
  P1013: "Invalid database string.",
  P1014: "Model does not exist.",
  P1015: "Unsupported schema features.",
  P1016: "Incorrect number of parameters.",
  P1017: "Connection closed by server.",
  P2000: "Value too long for column.",
  P2001: "Record does not exist.",
  P2002: "Unique constraint failed.",
  P2003: "Foreign key constraint failed.",
  P2004: "Constraint failed on database.",
  P2005: "Invalid value for field.",
  P2006: "Invalid value for field.",
  P2007: "Data validation error.",
  P2008: "Failed to parse query.",
  P2009: "Failed to validate query.",
  P2010: "Raw query failed.",
  P2011: "Null constraint violation.",
  P2012: "Missing required value.",
  P2013: "Missing required argument.",
  P2014: "Violation of required relation.",
  P2015: "Related record not found.",
  P2016: "Query interpretation error.",
  P2017: "Records for relation not connected.",
  P2018: "Required connected records not found.",
  P2019: "Input error.",
  P2020: "Value out of range.",
  P2021: "Table does not exist.",
  P2022: "Column does not exist.",
  P2023: "Inconsistent column data.",
  P2024: "Connection pool timeout.",
  P2025: "Operation depends on missing records.",
  P2026: "Unsupported feature used.",
  P2027: "Multiple database errors.",
  P2028: "Transaction API error.",
  P2029: "Query parameter limit exceeded.",
  P2030: "Fulltext index not found.",
  P2031: "MongoDB replica set required.",
  P2033: "Number exceeds limit.",
  P2034: "Transaction conflict.",
  P2035: "Assertion violation.",
  P2036: "External connector error.",
  P2037: "Too many open connections.",
  P3000: "Failed to create database.",
  P3001: "Destructive migration possible.",
  P3002: "Migration rollback.",
  P3003: "Invalid migration format.",
  P3004: "System database modification.",
  P3005: "Non-empty database schema.",
  P3006: "Failed to apply migration.",
  P3007: "Unsupported preview features.",
  P3008: "Migration already applied.",
  P3009: "Failed migrations found.",
  P3010: "Migration name too long.",
  P3011: "Migration not applied.",
  P3012: "Cannot rollback migration.",
  P3013: "Unsupported datasource provider.",
  P3014: "Shadow database creation failed.",
  P3015: "Missing migration file.",
  P3016: "Database reset failed.",
  P3017: "Migration not found.",
  P3018: "Migration apply failed.",
  P3019: "Datasource provider mismatch.",
  P3020: "Shadow database creation disabled.",
  P3021: "No foreign keys support.",
  P3022: "No direct DDL execution.",
  P4000: "Introspection operation failed.",
  P4001: "Empty introspected database.",
  P4002: "Inconsistent introspected schema.",
  P6000: "Server error.",
  P6001: "Invalid data source.",
  P6002: "Unauthorized access.",
  P6003: "Plan limit reached.",
  P6004: "Query timeout.",
  P6005: "Invalid parameters.",
  P6006: "Incompatible Prisma version.",
  P6008: "Engine startup error.",
  P6009: "Response size limit exceeded."
} as const

type PrismaCustomErrorHandler = (unknownError: unknown) => ErrorResponse | undefined;

export const prismaCustomErrorHandler: PrismaCustomErrorHandler = (unknownError) => {
  if (unknownError instanceof Prisma.PrismaClientKnownRequestError) {
    if (Object.keys(prismaErrorCode).includes(unknownError.code)) {
      const errorCode = unknownError.code as PrismaErrorCode
      return returnErrorFormat(prismaErrorCode[errorCode]);
    }
  }
}
