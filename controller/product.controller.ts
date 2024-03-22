import { Response } from "express";
import { productValidation } from "../validation/product.validation";
import { BadRequestResponse, ServerResponse, SuccessResponse } from "../constants/response";
import { productService } from "../service/product.service";



class ProductController {

    public createProduct = (req: any, res: Response) =>{

        const {userId, body} = req
        const {error} = productValidation.createProductValidation(body)
        if(error) {
            return BadRequestResponse(res, { message: error.details[0].message }); 
        }

        try{
            const data = productService.createProduct(body, userId)
            return SuccessResponse(res, data)
        }catch(err: any){
            return ServerResponse(res, {message: err.message})
        }
        
    };

    public getProduct = (req: any, res: Response) =>{
        const{userId, params} = req
        try{
            const data = productService.getProduct(params.productId, userId)
            return SuccessResponse(res, data)
        }catch(error: any){
            return ServerResponse(res, {message: error.message})
        }
    };

    public updateProduct = (req: any, res: Response) => {
        const {params, body} = req
        const {error} = productValidation.updateProductValidation(body)
        if(error){
            return BadRequestResponse(res, { message: error.details[0].message }); 
        }

        try{
            const data = productService.updateProduct(body, params.productId)
            return SuccessResponse(res, data)
        }catch(error: any){
            return ServerResponse(res, {message: error.message})
        }

    };

    public deleteProduct = (req: any, res: Response) => {
        const {userId, params} = req
        try{
            const data = productService.deleteProduct(params.productId, userId)
            return SuccessResponse(res, data)
        }catch(error: any){
            return ServerResponse(res, {message: error.message})
        }
    };


    public getAllProducts = (req: any, res: Response) => {
        try{
            const data = productService.getAllUserProducts(req.userId)
            return SuccessResponse(res, data)
        }catch(error: any){
            return ServerResponse(res, {message: error.message})
        }
    };


    public getProductById = (req: any, res: Response) => {
        try{
            const data = productService.getProductById(req.params.productId);
            return SuccessResponse(res, data)
        }catch(error: any){
            return ServerResponse(res, {message: error.message})
        }

    };

}

export const productController = new ProductController();