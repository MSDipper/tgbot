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
        const humidity = weatherData.main.humidity;

        const response = `Текущая погода в ${city}: ${weatherDescription}, температура: ${temperature}°C, уровень влажности: ${humidity}%`;
        bot.sendMessage(chatId, response);
      } catch {
        bot.sendMessage(
          chatId,
          `Город не найдет проверьте корректно ли вы ввели название города или есть ли опечатка в названии)`
        );
      }
    });
  });
};
