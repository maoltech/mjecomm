import { ICreateProduct } from "../constants/interface";
import { Product } from "../model/product.model";


class ProductService {

    public createProduct = async(data: ICreateProduct, userId: string) => {

        try{
            return  await Product.create({...data, ownerId: userId});
        }catch(err){
            throw err
        }
    
    }

    public getProduct = async(productId: string, userId: string) =>{
        try {
            return await Product.findOne({"_id": productId, ownerId: userId});
        } catch (error) {
            throw error
        }
    }

    public updateProduct = async(data: ICreateProduct, productId: string) => {
        try {
            return await Product.findByIdAndUpdate(productId, data)
        } catch (error) {
            throw error
        }
    }

    public getProductById = async(productId: string) => {
        try {
            return await Product.findById(productId);
        } catch (error) {
            throw error
        }
    }

    //no soft delete since it is for interview
    public deleteProduct = async (productId: string, userId: string) => {
        try {
            return await Product.findByIdAndDelete(productId, {userId});
        } catch (error) {
            throw error
        }
    }
    
    public getAllUserProducts = async(userId: string) => {
        try {
            return await Product.find({"ownerId": userId});
        } catch (error) {
            throw error
        }
    }
}

export const productService = new ProductService();