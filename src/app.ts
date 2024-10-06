import express from "express";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "./models/Product";
import "./bot";

const parentDir = path.resolve(__dirname, "..");
dotenv.config({path: path.join(parentDir, '.env')});

const app = express();
app.use(express.json());

app.post("/products", async (req, res) => {
  try {
    const { title, price } = req.body;
    const newProduct = new Product({ title, price });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
  }
});

app.post("/posts", async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const newPost = new Product({ title, content, author });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
  }
});

const UrlDB = process.env.UrlDB || "mongodb://127.0.0.1:27017/trbot";
const PORT = Number(process.env.PORT) || 3000;

const start = async () => {
  try {
    await mongoose.connect(UrlDB);
    app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Ошибка при подключении к БД: ${err}`);
    }
  }
};

start();
// start(PORT, UrlDB).catch((error) => {
//   console.error("Ошибка при запуске сервера:", error);
// });
