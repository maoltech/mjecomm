import { Response } from "express";
import { productValidation } from "../validation/product.validation";
import { BadRequestResponse, ServerResponse, SuccessResponse } from "../constants/response";
import { productService } from "../service/product.service";



class ProductController {

    public createProduct = async(req: any, res: Response) =>{

        const {userId, body} = req
        const {error} = productValidation.createProductValidation(body)
        if(error) {
            return BadRequestResponse(res, { message: error.details[0].message }); 
        }

        try{
            const data = await productService.createProduct(body, userId)
            return SuccessResponse(res, data)
        }catch(err: any){
            return ServerResponse(res, {message: err.message})
        }
        
    };

    public getProduct = async(req: any, res: Response) =>{
        const{userId, params} = req
        try{
            console.log(params.productId);
            const data = await productService.getProduct(params.productId, userId)
            return SuccessResponse(res, data)
        }catch(error: any){
            return ServerResponse(res, {message: error.message})
        }
    };

    public updateProduct = async(req: any, res: Response) => {
        const {params, body} = req
        const {error} = productValidation.updateProductValidation(body)
        if(error){
            return BadRequestResponse(res, { message: error.details[0].message }); 
        }

        try{
            const data = await productService.updateProduct(body, params.productId)
            return SuccessResponse(res, data)
        }catch(error: any){
            return ServerResponse(res, {message: error.message})
        }

    };

    public deleteProduct = async(req: any, res: Response) => {
        const {userId, params} = req
        try{
            const data = await productService.deleteProduct(params.productId, userId)
            return SuccessResponse(res, data)
        }catch(error: any){
            return ServerResponse(res, {message: error.message})
        }
    };


    public getAllProducts = async (req: any, res: Response) => {
        try{
            
            const data = await productService.getAllUserProducts(req.userId)
            return SuccessResponse(res, data)
        }catch(error: any){
            return ServerResponse(res, {message: error.message})
        }
    };


    public getProductById = async(req: any, res: Response) => {
        try{
            const data = await productService.getProductById(req.params.productId);
            return SuccessResponse(res, data)
        }catch(error: any){
            return ServerResponse(res, {message: error.message})
        }

    };

}

export const productController = new ProductController();