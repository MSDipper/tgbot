import TelegramBot from "node-telegram-bot-api";

export const helpCommand = (bot: TelegramBot) => {
  const commands = [
    {
      command: "start",
      description: "Запуск",
    },
    {
      command: "create",
      description: "Создать запись",
    },
    {
      command: "list",
      description: "Список записей",
    },
    {
      command: "weather",
      description: "Погода",
    },
  ];
  bot.setMyCommands(commands);
};
