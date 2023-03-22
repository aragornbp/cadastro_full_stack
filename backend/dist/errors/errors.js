"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.AppError = void 0;
class AppError extends Error {
    constructor(statusCode = 400, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.AppError = AppError;
const errorHandler = (err, req, res, next) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    console.log(err.message);
    return res.status(500).json({ message: "Internal server error" });
};
exports.errorHandler = errorHandler;
