export enum ApiExceptionType {
  SUCCESS = "Success",
  USER_NOT_FOUND = "User not found",
  USER_INVITATION_NOT_FOUND = "User invitation not found",
  INTERNAL_ERROR = "Internal server error",
  DATABASE_ERROR = "Database error",
  SERVER_TIMEOUT = "Server timeout",
}

const ApiStatusExceptionTypes = new Map<ApiExceptionType, number>([
  [ApiExceptionType.SUCCESS, 200],
  [ApiExceptionType.USER_NOT_FOUND, 404],
  [ApiExceptionType.USER_INVITATION_NOT_FOUND, 404],
  [ApiExceptionType.INTERNAL_ERROR, 500],
  [ApiExceptionType.DATABASE_ERROR, 501],
  [ApiExceptionType.SERVER_TIMEOUT, 503],
]);

export const getStatusCode = (type: ApiExceptionType): number => {
  return ApiStatusExceptionTypes.get(type) ?? 500;
};

export const getResponseCode = (type: ApiExceptionType): string => {
  return `0${getStatusCode(type)}`;
};
