import { Router } from "express";
import { authMiddleWare } from "../middleware/auth.middleware";
import { productController } from "../controller/product.controller";


class ProductRoutes {

    public router = Router();

    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes = () => {

        this.router.use(authMiddleWare.AuthenticateOnboardedUsers)
        this.router.post('/', productController.createProduct)
        this.router.get('/all', productController.getAllProducts)
        this.router.get('/:productId', productController.getProduct)
        this.router.get('/others/:productId', productController.getProductById)
        this.router.put('/:productId', productController.updateProduct)
        
        //no soft delete since it is an interview
        this.router.delete('/:productId', productController.deleteProduct)
        
    }

}

export const productRoutes = new ProductRoutes();