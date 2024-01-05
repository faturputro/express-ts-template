type SendSuccess = { data?: Record<string, unknown> | Record<string, unknown>[] | unknown | undefined; message?: string };
type SendError = { message?: string | unknown; code?: number; status?: number; data?: Record<string, unknown>; errors?: Record<string, unknown> };
type UserSession = {
  id: number;
  email: string;
}

declare namespace Express {
  export interface Request {
    user: UserSession
  }

  export interface Response {
    sendSuccess: (data?: SendSuccess) => void;
    sendError: (data?: SendError) => void;
    failed: (message?: string) => void;
  }
}
