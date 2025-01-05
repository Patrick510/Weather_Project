import {
  MapPin,
  Sun,
  Thermometer,
  TriangleAlert,
  Waves,
  Wind,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useEffect, useRef, useState } from "react";
import notFound from "@/assets/404.png";
import cloud from "@/assets/cloud.png";

interface CardWeatherProps {
  weatherData: any;
  showCard: boolean;
}

export default function CardWeather({
  weatherData,
  showCard,
}: CardWeatherProps) {
  const weatherCardRef = useRef<HTMLDivElement>(null);
  const [animationCounter, setAnimationCounter] = useState(0);

  useEffect(() => {
    if (showCard && weatherCardRef.current) {
      const timer = setTimeout(() => {
        weatherCardRef.current?.classList.remove("hidden");
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [showCard]);

  useEffect(() => {
    if (showCard && weatherCardRef.current) {
      const timer = setTimeout(() => {
        weatherCardRef.current?.classList.remove("hidden");
        setAnimationCounter(1);
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [showCard]);

  useEffect(() => {
    if (animationCounter === 1 && weatherCardRef.current) {
      const timer = setTimeout(() => {
        weatherCardRef.current!.style.height = "510px";
        setAnimationCounter(2);
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [animationCounter]);

  return (
    <Card
      ref={weatherCardRef}
      className={`transition-all duration-500 hidden ease-in-out w-full max-w-md shadow-lg overflow-hidden ${
        showCard ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ height: "0px" }}
    >
      <CardHeader
        className={`bg-gradient-to-r ${
          weatherData === null
            ? "from-blue-500 to-blue-600"
            : "from-red-500 to-red-600"
        }  text-white p-6`}
      >
        <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2 capitalize">
          {weatherData === null ? (
            <MapPin className="h-8 w-8" />
          ) : (
            <TriangleAlert className="h-8 w-8" />
          )}
          {weatherData === null
            ? weatherData?.name
            : weatherData?.response.data.message}
        </CardTitle>
        <p className="text-center text-blue-100 mt-2">
          {weatherData === null ? "Current Weather" : "Error"}{" "}
        </p>
      </CardHeader>

      <CardContent className="p-6">
        {weatherData !== null && (
          <div id="not-found">
            <img src={notFound} alt="404" className="mx-auto w-50" />
            <p className="text-center text-blue-600 font-semibold mt-4">
              Ooops! Invalid Location
            </p>
          </div>
        )}

        {weatherData?.cod === 200 && (
          <div id="weather-box" className="flex flex-col items-center gap-6">
            <div className="flex items-center justify-center w-full">
              <img
                src={cloud}
                alt="preview"
                id="imagem"
                className="w-32 h-32"
              />
              <div className="ml-6">
                <p
                  id="temperature"
                  className="text-6xl font-bold text-gray-800"
                >
                  {Math.round(weatherData?.main.temp)}°
                </p>
                <p
                  id="description"
                  className="text-xl capitalize text-gray-600"
                >
                  {weatherData?.weather[0].description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full mt-6">
              <div className="bg-blue-50 rounded-lg p-4 flex items-center">
                <Thermometer className="h-8 w-8 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Feels like</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {Math.round(weatherData?.main.feels_like)}°
                  </p>
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 flex items-center">
                <Sun className="h-8 w-8 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Visibility</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {weatherData?.visibility / 1000} km
                  </p>
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 flex items-center">
                <Waves className="h-8 w-8 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Humidity</p>
                  <p className="text-xl font-semibold text-gray-800">
                    {weatherData?.main.humidity}%
                  </p>
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 flex items-center">
                <Wind className="h-8 w-8 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Wind Speed</p>
                  <p className="text-xl font-semibold text-gray-800">
                    {weatherData?.wind.speed} m/s
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
