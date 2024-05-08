import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import CustomError from 'App/Exceptions/CustomError';
import User from 'App/Models/User';

export default class UserController {

    public async update({ request, response, params, auth }: HttpContextContract) {
        const updateUserSchema = schema.create({
            username: schema.string.optional({ trim: true }),
            firstName: schema.string.optional({ trim: true }),
            lastName: schema.string.optional({ trim: true }),
            patronymic: schema.string.optional({ trim: true }),
        });

        const payload = await request.validate({ schema: updateUserSchema });
        const user = await auth.authenticate();

        if (user.id != params.id) {
            response.status(400);
            return new CustomError('Access denied', 400);
        }

        const updatedUser = await User.findOrFail(params.id);

        Object.keys(payload).forEach(key => {
            if (payload[key]) updatedUser[key] = payload[key];
        });

        await updatedUser.save()

        return updatedUser;
    }

    public async destroy({ response, auth, params }: HttpContextContract) {
        const user = await auth.authenticate();

        if (user.id != params.id) {
            response.status(400);
            return new CustomError('Access denied', 400);
        }
    
        await User.query()
          .where('id', user.id)
          .delete();
    
        return user;
      }
}