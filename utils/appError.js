class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.status = statusCode;
        this.statusbar = `${statusCode}`.startsWith('4')?'error': 'success';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;