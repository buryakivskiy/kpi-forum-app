import CustomError from "../CustomError";

export default class InvalidCredentials extends CustomError {
    constructor() {
        super('Invalid credentials', 400)
    }
}