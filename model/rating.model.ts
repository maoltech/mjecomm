import { Schema, Document, model } from 'mongoose'

export interface IRating extends Document {
    user: string,
    product: string,
    rating: number,
    comment: string
}

const ratingSchema = new Schema<IRating>({
    user: {
      type: String,
      ref: 'User'
    },
    product: {
      type: String,
      ref: 'Product'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: {
        type: String,
    }
  });

export const Rating = model("Rating", ratingSchema)