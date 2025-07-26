export enum AppErrorCode {
  // Common Error
  InternalServerError = 1000,
  Unauthorized = 1001,
  BadRequest = 1002,
  NotFound = 1003,
  TooManyRequests = 1004,
  ValidationFailed = 1005,
  Forbidden = 1006,
  DuplicateUniqueResource = 1007,
  BadConfiguration = 1008,
  Conflict = 1009, // Concurrent tasks disallowed
  DataNotFound = 1010,
}
