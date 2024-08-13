export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
  PAYLOAD_TOO_LARGE = 413,
  WRONG_FORMAT = 422,
}

export type HajimeError = {
  status: 'error' | 'success'
  statusCode: number
  error: {
    code: string
    message: string
    // details: string,
    timestamp: string
    path: string
    suggestion: string
  }
  // requestId: string,
  // documentation_url: string
}

export type HajimeErrorInput = {
  status: 'error' | 'success'
  code: HttpStatus
  message: string
  path: string
  suggestion: string
}

export function hajimeError(input: HajimeErrorInput): HajimeError {
  return {
    status: input.status,
    statusCode: input.code,
    error: {
      code: `${input.code}`,
      message: input.message,
      timestamp: new Date().toISOString(),
      path: input.path,
      suggestion: input.suggestion,
    },
  }
}
