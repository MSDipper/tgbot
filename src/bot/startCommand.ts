import TelegramBot, { Message } from "node-telegram-bot-api";

export const startCommand = (bot: TelegramBot) => {
  bot.onText(/\/start/, async (msg: Message) => {
    try {
      await bot.sendMessage(msg.chat.id, "Бот запущен!)");
    } catch (err) {
      if (err instanceof Error) {
        console.error("Ошибка при запуске бота!");
      }
    }
  });
};
