import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema } from '@ioc:Adonis/Core/Validator'
import CustomError from "App/Exceptions/CustomError";
import Category from "App/Models/Category";
import Forum from "App/Models/Forum";

export default class ForumController {
  

  public async index({ request }: HttpContextContract) {
    const searchTerm = request.input('search', '').toLowerCase();
    
    const forums = await Forum.query().preload('user');
    
    if (searchTerm) {
      return forums.filter(forum => forum.title.toLowerCase().includes(searchTerm) )
    }

    return forums
  }

  public async indexByCategory({ params }: HttpContextContract) {
    const category =  await Category.findOrFail(params.categoryId);

    const forums = await Forum.query().where('category_id', category.id).preload('user');

    return forums;
  }

  public async indexByUser({ params, auth, response }: HttpContextContract) {
    const user = await auth.authenticate();
    
    if (params.userId != user.id) {
      response.status(400);
      return new CustomError('Access denied', 400);
    }

    const forums = await Forum.query().where('user_id', params.userId).preload('user');

    return forums;
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const forum =  await Forum.find(params.id);

      if (forum) {
        await forum.preload('user');
        return forum;
      }

    } catch (error) {
      response.status(400);
      return new CustomError(error.message, 400);
    }
  }

  public async update({ auth, request, response, params }: HttpContextContract) {
    const updateForumSchema = schema.create({
      title: schema.string.optional(),
      description: schema.string.optional()
    });

    const payload = await request.validate({ schema: updateForumSchema });
    const user = await auth.authenticate();
    const forum = await Forum.findOrFail(params.id);

    if (forum.userId != user.id) {
      response.status(400);
      return new CustomError('Access denied', 400);
    }

    if (payload.title) {
      forum.title = payload.title;
    }

    if (payload.description) {
      forum.description = payload.description;
    }

    await forum.save();

    return forum;
  }

  public async store({ auth, request }: HttpContextContract) {
    const createForumSchema = schema.create({
      title: schema.string(),
      description: schema.string(),
      categoryId: schema.number()
    });

    const payload = await request.validate({ schema: createForumSchema });

    const user = await auth.authenticate();
    const category = await Category.findOrFail(payload.categoryId);
    const forum = new Forum();

    forum.title = payload.title;
    forum.description = payload.description;
    forum.categoryId = category.id;

    await user.related('forums').save(forum);
    
    return forum;
  }

  public async destroy({ auth, params }: HttpContextContract) {
    const user = await auth.authenticate();

    const forum = await Forum.query()
      .where('user_id', user.id)
      .where('id', params.id)
      .delete();

    return forum;
  }
}