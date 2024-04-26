import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import EmailAlreadyTaken from 'App/Exceptions/Errors/EmailAlreadyTaken';
import InvalidCredentials from 'App/Exceptions/Errors/InvalidCredentials';
import User from 'App/Models/User';

export default class AuthController {

    public async login({ request, response, auth }: HttpContextContract) {
        const loginSchema = schema.create({
            email: schema.string({}, [
                rules.email()
            ]),
            password: schema.string()
        });

        const payload = await request.validate({ schema: loginSchema });
        
        var token;
        try {
            token = await auth.use("api").attempt(
                payload.email, 
                payload.password, 
                { expiresIn: "10 days" }
            );
        } catch (err) {
            response.status(400);
            return new InvalidCredentials();
        }
        const user = (await User.findBy('email', payload.email))?.toJSON();
        
        return {
            ...user,
            token: token.toJSON().token,
        };
    }
        
    public async register({ request, response, auth }: HttpContextContract) {
        const registerSchema = schema.create({
            email: schema.string({}, [
                rules.email()
            ]),
            password: schema.string(),
            username: schema.string({ trim: true }),
            firstName: schema.string({ trim: true }),
            lastName: schema.string({ trim: true }),
            patronymic: schema.string({ trim: true }),
        });

        const payload = await request.validate({ schema: registerSchema });

        const existingUser = await User.findBy('email', payload.email);
        if (existingUser) {
            response.status(400);
            return new EmailAlreadyTaken();
        }

        const user = await User.create(payload);
            
        const token = await auth.use("api").login(user, {
            expiresIn: "10 days",
        });

        return token.toJSON();
    }
}
