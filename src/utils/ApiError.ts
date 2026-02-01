import { ErrorCode } from "multer";
import { ErrorKey, ERRORS } from "../../constants/error.constants";

class ApiError extends Error {
    public code: string;
    public status: number;

    constructor(error: { code: string; message: string; status: number }) {
        super(error.message);
        this.code = error.code;
        this.status = error.status;
    }

    getErrorObject() {
        return {
            code: this.code,
            message: this.message
        }
    }
}

export default ApiError;
