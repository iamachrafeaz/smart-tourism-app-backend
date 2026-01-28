class ApiError extends Error {

    statusCode: any

    constructor(statusCode: any, message: any) {
        super(message);
        this.statusCode = statusCode;
    }
}

export default ApiError;