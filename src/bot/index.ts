import TelegramBot from "node-telegram-bot-api";
import { createCommand } from "./createCommand";
import { getAllProductsCommand } from "./listCommand";
import path from "path";
import dotenv from "dotenv";
import "./createCommand";
import { helpCommand } from "./help";
import { startCommand } from "./startCommand";
import { clearStateClearOnNewCommand } from "../middleware";
import { weatherReport } from "./weather";
import { deletedProductCommand } from "./deleteProduct";

const rootDir = path.resolve(__dirname, "../../");
dotenv.config({ path: path.join(rootDir, ".env") });

let token: string;
if (process.env.TOKEN) {
  token = process.env.TOKEN;
} else {
  console.error("Отсутствует токен бота в переемных средах");
  console.log(process.env.TOKEN);
  process.exit(1);
}
const bot = new TelegramBot(token, { polling: true });

clearStateClearOnNewCommand(bot);
startCommand(bot);
createCommand(bot);
getAllProductsCommand(bot);
weatherReport(bot);
deletedProductCommand(bot);
helpCommand(bot);