import TelegramBot, { Message } from "node-telegram-bot-api";
import { chatStates } from "../interface/chat.interface";

export const clearStateClearOnNewCommand = (bot: TelegramBot) => {
  const clearStateOnNewCommand = (chatId: number) => {
    delete chatStates[chatId];
  };
  bot.on("message", (msg: Message) => {
    const chatId = msg.chat.id;

    if (msg.text && /^\/.+/.test(msg.text)) {
      clearStateOnNewCommand(chatId);
    }
  });
};
