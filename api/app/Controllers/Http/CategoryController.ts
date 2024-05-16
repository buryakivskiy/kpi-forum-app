import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Category from "App/Models/Category";

export default class CategoryController {

    public async index({}: HttpContextContract) {
        const categories = await Category.query();
        return categories;
    }
}