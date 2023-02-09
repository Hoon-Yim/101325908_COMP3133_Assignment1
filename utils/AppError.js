class AppError extends Error {
    constructor(message) {
        super(message);

        this.status = "failed";

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;