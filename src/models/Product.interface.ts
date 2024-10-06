import { Document } from "mongoose";

export interface IProduct extends Document {
  title: string;
  price: number;
  createdAt: Date;
  step: "initial" | "title" | "price";
}
