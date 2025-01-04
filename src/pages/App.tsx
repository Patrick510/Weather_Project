import DialogCEP from "@/components/dialogcep";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import notFound from "@/assets/404.png";

import cloud from "@/assets/cloud.png";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { MapPin, Search, Sun, Thermometer, Waves, Wind } from "lucide-react";

const url = "https://viacep.com.br/ws/79630762/json/";

export default function App() {
  const [cep, setCep] = useState<any>(null);
  const [city, setCity] = useState<string>("Três Lagoas");

  const [showWeatherCard, setShowWeatherCard] = useState(false);
  const [animationCounter, setAnimationCounter] = useState(0);
  const weatherCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShowWeatherCard(false);
  }, []);

  useEffect(() => {
    if (showWeatherCard && weatherCardRef.current) {
      const timer = setTimeout(() => {
        weatherCardRef.current?.classList.remove("hidden");
        setAnimationCounter(1);
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [showWeatherCard]);

  useEffect(() => {
    if (animationCounter === 1 && weatherCardRef.current) {
      const timer = setTimeout(() => {
        weatherCardRef.current!.style.height = "510px";
        setAnimationCounter(2);
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [animationCounter]);

  async function getCEP() {
    await axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        console.log("success");
        setCep(response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => console.log("finalizou o request"));
  }

  const handleSearch = () => {
    setShowWeatherCard(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 p-8 flex gap-8 items-center justify-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-600">
            Weather Forecast
          </CardTitle>
          <CardDescription className="text-gray-600">
            Search your city and check the weather
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="text-gray-700">
                  City
                </Label>
                <Input
                  id="name"
                  placeholder="Name of your city"
                  className="border-blue-200 focus:border-blue-400"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <DialogCEP />
          <Button
            className="bg-blue-500 hover:bg-blue-600"
            onClick={handleSearch}
          >
            <Search className="mr-2 h-4 w-4" /> Search
          </Button>
        </CardFooter>
      </Card>

      <Card
        ref={weatherCardRef}
        className={`transition-all duration-500 hidden ease-in-out w-full max-w-md shadow-lg overflow-hidden ${
          showWeatherCard ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ height: "0px" }}
      >
        <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
          <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2">
            <MapPin className="h-8 w-8" /> {city}
          </CardTitle>
          <p className="text-center text-blue-100 mt-2">Current Weather</p>
        </CardHeader>

        <CardContent className="p-6">
          <div className="hidden" id="not-found">
            <img src={notFound} alt="404" className="mx-auto" />
            <p className="text-center text-red-500 font-semibold mt-4">
              Ooops! Invalid Location
            </p>
          </div>

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
                  23°
                </p>
                <p id="description" className="text-xl text-gray-600">
                  Scattered clouds
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full mt-6">
              <div className="bg-blue-50 rounded-lg p-4 flex items-center">
                <Thermometer className="h-8 w-8 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Feels like</p>
                  <p className="text-lg font-semibold text-gray-800">25°</p>
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 flex items-center">
                <Sun className="h-8 w-8 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">UV Index</p>
                  <p className="text-lg font-semibold text-gray-800">
                    3 (Moderate)
                  </p>
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 flex items-center">
                <Waves className="h-8 w-8 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Humidity</p>
                  <p className="text-xl font-semibold text-gray-800">90%</p>
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 flex items-center">
                <Wind className="h-8 w-8 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Wind Speed</p>
                  <p className="text-xl font-semibold text-gray-800">2.5 m/s</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
