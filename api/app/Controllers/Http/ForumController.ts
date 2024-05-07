import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema } from '@ioc:Adonis/Core/Validator'
import Forum from "App/Models/Forum";

export default class ForumController {
  

  public async index({}: HttpContextContract) {
    const forums = await Forum.query().preload("user");
    return forums;
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async store({ auth, request }: HttpContextContract) {
    const createForumSchema = schema.create({
      title: schema.string(),
      description: schema.string()
    });

    const payload = await request.validate({ schema: createForumSchema });

    const user = await auth.authenticate();
    const forum = new Forum();

    forum.title = payload.title;
    forum.description = payload.description;

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