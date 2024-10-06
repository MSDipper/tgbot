import path from "path";
import dotenv from "dotenv";
import axios from "axios";

const rootDir = path.resolve(__dirname, "../../");
dotenv.config({ path: path.join(rootDir, ".env") });

let token: string;
if (process.env.WEATHERTOKEN) {
  token = process.env.WEATHERTOKEN;
} else {
  console.error("Отсутствует токен для получения погоды(");
  console.log(process.env.WEATHERTOKEN);
  process.exit(1);
}

export async function weatherReportApi(city: string) {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${token}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    if (err instanceof Error) {
      console.error(
        `Ошибка при отправка api запроса на сервер: ${err.message}`
      );
      throw err;
    }
  }
}
export default weatherReportApi;
