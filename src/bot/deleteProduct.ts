import TelegramBot, { Message } from "node-telegram-bot-api";
import Product from "../models/Product";
import { chatStates } from "../interface/chat.interface";

const deleteProductByTitle = async (
  bot: TelegramBot,
  title: string,
  chatId: number
) => {
  try {
    const deletedProduct = await Product.findOneAndDelete({ title });
    if (deletedProduct) {
      bot.sendMessage(
        chatId,
        `Продукт ${deletedProduct.title} успешно удален.`
      );
    } else {
      bot.sendMessage(chatId, `Не удалось удалить ${title} продукт.`);
    }
  } catch (err) {
    if (err instanceof Error) {
      bot.sendMessage(chatId, `Ошибка ${err.message}`);
    }
  }
};

export const deletedProductCommand = (bot: TelegramBot) => {
  bot.onText(/\/delete/, async (msg: Message) => {
    const chatId = msg.chat.id;
    chatStates[chatId] = { currentCommand: "/delete" };

    bot.sendMessage(
      chatId,
      "Введите название продукта который хотите удалить: "
    );
    bot.once("message", async (msg: Message) => {
      if (chatStates[chatId]?.currentCommand !== "/delete") return;

      const productTitle = msg.text;
      if(productTitle){
      await deleteProductByTitle(bot, productTitle, chatId);
      } else { 
        bot.sendMessage(chatId, 'Вы не введи название продукта.')
      }
    });
  });
};
