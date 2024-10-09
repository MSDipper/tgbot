import TelegramBot, { Message } from "node-telegram-bot-api";
import Product from "../models/Product";
import { IProduct } from "../models/Product.interface";
import { chatStates } from "../interface/chat.interface";

export const createCommand = (bot: TelegramBot) => {
  bot.onText(/\/create/, async (msg: Message) => {
    const chatId = msg.chat.id;
    chatStates[chatId] = { currentCommand: "/create" };

    bot.sendMessage(chatId, "Введите название продукта:");
    bot.once("message", async (msg: Message) => {
      if (chatStates[chatId]?.currentCommand !== "/create") return;

      const title = msg.text;
      chatStates[chatId].title = title;

      function askPrice() {
      bot.sendMessage(chatId, "Введите цену продукта:");
      bot.once("message", async (msg: Message) => {
        if (chatStates[chatId]?.currentCommand !== "/create") return;

        const priceText = msg.text || "0";
        try {
          const price = parseFloat(priceText);
          if (isNaN(price)) {
            bot.sendMessage(
              chatId,
              "Некорректное значение цены, введите только числовые значения."
            );
            askPrice();
            return;
          }

          const newProduct: IProduct = new Product({ title, price });
          await newProduct.save();
          bot.sendMessage(
            chatId,
            `Продукт "${title}" с ценой ${price} был создан.`
          );
        } catch (err) {
          if (err instanceof Error) {
            bot.sendMessage(chatId, `Произошла ошибка: ${err.message}`);
          }
        }
      })}
      askPrice();
    });
  });
};
