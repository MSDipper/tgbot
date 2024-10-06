import mongoose, { Document } from "mongoose";
import { IProduct } from "../models/Product.interface";

const ProductSchema = new mongoose.Schema<IProduct>({
  title: { type: String, required: true },
  price: { type: Number, required: true },
});

const Product = mongoose.model<IProduct & Document>("Products", ProductSchema);

export const useProductsDatabase = () => {
  const getAllProducts = async (): Promise<IProduct[]> => {
    try {
      const products = await Product.find({});
      return products;
    } catch (error) {
      console.error("Ошибка при получении продуктов:", error);
      throw error;
    }
  };

  return {
    getAllProducts,
  };
};
