class OperationError extends Error{
    constructor(message, status = 400){
        super(message);
        this.statusCode = status;
    }
}

class LoginError extends Error{
    constructor(message, status = 400){
        super(message);
        this.statusCode = status;
    }
}

module.exports = { OperationError , LoginError}