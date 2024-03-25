export default class AsyncResponse<T = any> {
    constructor(
        public isSuccess: boolean,
        public message: string,
        public code: string | undefined,
        public error: string | undefined,
        public errorParams: Record<string, any> | undefined,
        public value: T | undefined,
    ) {}

    static success<T>(
        data: T,
        options?: {
            message?: string,
            code?: string;
        },
    ): AsyncResponse<T> {
        return new AsyncResponse<T>(
            true,
            options?.message ?? "",
            options?.code,
            undefined,
            undefined,
            data
        );
    }

    static failed<T>(
        message: string,
        options?: {
            code?: string,
            error?: string,
            errorParams?: Record<string, any>,
        },
    ): AsyncResponse<T> {
        return new AsyncResponse<T>(
            false,
            message,
            options?.code,
            options?.error,
            options?.errorParams,
            undefined
        );
    }
}