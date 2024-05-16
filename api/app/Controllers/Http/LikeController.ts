import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema } from '@ioc:Adonis/Core/Validator'
import Forum from "App/Models/Forum";
import Like from "App/Models/Like";

export default class LikeController {

    public async index({}: HttpContextContract) {
        const likes = await Like.query();
        return likes;
    }

    public async indexByForum({ params }: HttpContextContract) {
        const likes = await Like.query().where('forum_id', params.forumId).preload('user');
    
        return likes;
      }

    public async store({ auth, request }: HttpContextContract) {
        const createLikeSchema = schema.create({
            forumId: schema.number(),
        });

        const payload = await request.validate({ schema: createLikeSchema });

        const forum = await Forum.findOrFail(payload.forumId);
        const user = await auth.authenticate();

        const existingLike = await Like.query()
            .where('forum_id', forum.id)
            .where('user_id', user.id);
        
        if (existingLike.length) {
            console.log(existingLike);
            return existingLike;
        }

        const like = new Like();

        like.userId = user.id;
        like.forumId = forum.id;

        await like.save();
        
        return like;
    }

    public async destroy({ auth, params }: HttpContextContract) {
        const user = await auth.authenticate();
    
        const like = await Like.query()
          .where('user_id', user.id)
          .where('id', params.id)
          .delete();
    
        return like;
      }
}