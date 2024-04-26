export default class CustomError {
    error: boolean;
    message: string;
    status: number;

    constructor(message: string, status: number, error: boolean = true) {
        this.message = message;
        this.status = status;
        this.error = error;
    }
}