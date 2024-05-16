import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema } from '@ioc:Adonis/Core/Validator'
import CustomError from "App/Exceptions/CustomError";
import Comment from "App/Models/Comment";
import Forum from "App/Models/Forum";

export default class ForumController {

    public async index({}: HttpContextContract) {
        const comments = await Comment.query().preload('user').preload('forum');
        return comments;
    }

    public async indexByForum({ params }: HttpContextContract) {
        const comments = await Comment.query().where('forum_id', params.forumId).preload('user');
    
        return comments;
      }

    public async store({ auth, request }: HttpContextContract) {
        const createCommentSchema = schema.create({
        body: schema.string(),
        forumId: schema.number(),
        });

        const payload = await request.validate({ schema: createCommentSchema });

        const forum = await Forum.findOrFail(payload.forumId);
        const user = await auth.authenticate();
        const comment = new Comment();

        comment.body = payload.body;
        comment.userId = user.id;
        comment.forumId = forum.id;

        await comment.save();
        
        return comment;
    }

    public async update({ auth, request, response, params }: HttpContextContract) {
        const updateCommentSchema = schema.create({
          body: schema.string.optional()
        });
    
        const payload = await request.validate({ schema: updateCommentSchema });
        const user = await auth.authenticate();
        const comment = await Comment.findOrFail(params.id);
    
        if (comment.userId != user.id) {
          response.status(400);
          return new CustomError('Access denied', 400);
        }
    
        if (payload.body) {
          comment.body = payload.body;
        }
    
        await comment.save();
    
        return comment;
      }

    public async destroy({ auth, params }: HttpContextContract) {
        const user = await auth.authenticate();
    
        const comment = await Comment.query()
          .where('user_id', user.id)
          .where('id', params.id)
          .delete();
    
        return comment;
      }
}