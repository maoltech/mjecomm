import mongoose from "mongoose";

export interface IProduct extends mongoose.Document{
    ownerId: string,
    name: string,
    description: string,
    price: number,
    quantity: number,
    category: string,
    imageUrl: string[],
    videoUrl: string[]
}

const productSchema = new mongoose.Schema<IProduct>({

    ownerId: {
        type: String,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    imageUrl: {
        type: [String]
    },
    videoUrl: {
        type: [String]
    }
    
    
});

export const Product = mongoose.model('Product', productSchema);