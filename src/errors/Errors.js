const HttpCodes = require('http-status-codes');

class HttpError {
    constructor(code, message){
        this.code = code;
        this.message = message;
    }
}

class ValidationError{
    constructor(errors){
        this.code = HttpCodes.StatusCodes.BAD_REQUEST;
        this.errors = errors | [];
    }

    toJson(){
        return this.errors;
    }
}