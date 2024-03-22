import Joi from "joi";
import { ICreateProduct } from "../constants/interface";




class ProductValidation {


    public createProductValidation = (data: ICreateProduct) => {

        const schema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
            price: Joi.number().required(),
            quantity: Joi.number().required(),
            category: Joi.string().required(),
            imageUrl: Joi.array().items(Joi.string()).required(),
            videoUrl: Joi.array().items(Joi.string()).required()
        });

        return schema.validate(data);
    }

    public updateProductValidation = (data: ICreateProduct) => {
        const schema = Joi.object({
            name: Joi.string(),
            description: Joi.string(),
            price: Joi.number(),
            quantity: Joi.number(),
            category: Joi.string(),
            imageUrl: Joi.array().items(Joi.string()),
            videoUrl: Joi.array().items(Joi.string())
        });
        return schema.validate(data)
    }


}

export const productValidation = new ProductValidation();