import axios from "axios";

const APIKey = "6798be00aca7b5ad944f1bcb1bb4b30b";

interface CardGetWeatherProps {
  city: string;
}

export async function getWeather({ city }: CardGetWeatherProps) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
}
