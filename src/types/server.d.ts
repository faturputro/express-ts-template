type SendSuccess =
	| Record<string, unknown>
	| Record<string, unknown>[]
	| unknown
	| undefined;
type SendError = {
	message?: string | unknown;
	code?: number;
	status?: number;
	data?: Record<string, unknown>;
	errors?: Record<string, unknown>;
};

type SessionClaim = {
	id: number;
	email: string;
};

declare namespace Express {
	export interface Request {
		user: UserSession;
		request_id: string;
		timestamp: string;
	}

	export interface Response {
		success: (data?: unknown, message?: string, t?: DictPath<Locale> | {
      key: DictPath<Locale>,
      values: Record<string, string>
    }) => void;
    failed: (e: Error) => void;
	}
}
