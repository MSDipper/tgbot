// server.ts
import mongoose from "mongoose";
import express from "express";
import http from "http";

const app = express();
const server = new http.Server(app);

mongoose.set("strictQuery", false);

async function start(PORT: number, UrlDB: string) {
  try {
    await mongoose.connect(UrlDB);
    server.listen(PORT);
    console.log(
      `Сервер запущен: внешний порт ${PORT} подключен к БД через хост ${UrlDB}`
    );
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error("Неизвестная ошибка;)");
    }
  }
}

export { start };
