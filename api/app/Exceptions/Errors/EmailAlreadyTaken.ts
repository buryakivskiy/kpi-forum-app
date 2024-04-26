import CustomError from "../CustomError";

export default class EmailAlreadyTaken extends CustomError {
    constructor() {
        super('This email already used', 400)
    }
}