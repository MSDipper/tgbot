import TelegramBot, { Message } from "node-telegram-bot-api";
import { weatherReportApi } from "../api/api";

export const weatherReport = (bot: TelegramBot) => {
  bot.onText(/\/weather/, async (msg: Message) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "В каком городе вы хотите узнать погоду?");
    bot.once("message", async (message: Message) => {
      if (message.chat.id !== chatId || !message.text) return;
      const city = message.text.trim() || "Москва";
      try {
        const weatherData = await weatherReportApi(city);
        const weatherDescription = weatherData.weather[0].description;
        const temperature = weatherData.main.temp;

        const response = `Текущая погода в ${city}: ${weatherDescription}, температура: ${temperature}°C`;
        bot.sendMessage(chatId, response);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Неизвестная ошибка";
        bot.sendMessage(chatId, `Ошибка: ${errorMessage}`);
      }
    });
  });
};
