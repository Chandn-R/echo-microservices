class ApiError extends Error {

    statusCode: number;
    data: any | null;
    success: boolean;
    error: any[];

    constructor(statusCode: number, message = "Internal Server Error", error: any[] = [], stack?: string) {

        super(message);
        Object.setPrototypeOf(this, ApiError.prototype);

        this.statusCode = statusCode;
        this.data = null;
        this.success = false;
        this.error = error;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError;