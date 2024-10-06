import TelegramBot, { Message } from "node-telegram-bot-api";
import { useProductsDatabase } from "../hook/useProductsDatabase";

export const getAllProductsCommand = async (bot: TelegramBot) => {
  bot.onText(/\/list/, async (msg: Message) => {
    try {
      const { getAllProducts } = useProductsDatabase();
      const products = await getAllProducts();
      let message = "Список всех продуктов:\n\n";
      products.forEach((product: { title: string; price: number }) => {
        message += `Название: ${product.title}, Цена: ${product.price} руб.\n`;
      });
      bot.sendMessage(msg.chat.id, message);
    } catch (err) {
      bot.sendMessage(
        msg.chat.id,
        "Произошла ошибка при получении списка продуктов."
      );
    }
  });
};
