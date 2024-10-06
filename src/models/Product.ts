import mongoose, { Schema } from "mongoose";
import { IProduct } from "./Product.interface";

const ProductScheme: Schema<IProduct> = new Schema({
  title: { type: String, required: true, unique: true },
  price: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

export const Product = mongoose.model<IProduct>("Product", ProductScheme);

export default Product;
