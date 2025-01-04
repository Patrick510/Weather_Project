import DialogCEP from "@/components/dialogCep";
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
import { useEffect, useState } from "react";
import { MapPin, Search } from "lucide-react";

import { getWeather } from "@/components/hooks/getWeather";
import CardWeather from "@/components/cardWeather";

const url = "https://viacep.com.br/ws/79630762/json/";

export default function App() {
  const [cep, setCep] = useState<any>(null);
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [showWeatherCard, setShowWeatherCard] = useState(false);

  useEffect(() => {
    setShowWeatherCard(false);
  }, []);

  async function getCEP() {
    await axios
      .get(url)
      .then((response) => {
        setCep(response.data);
      })
      .catch((error) => console.log(error));
  }

  const handleSearch = async () => {
    setShowWeatherCard(false);
    try {
      const data = await getWeather({ city });
      setWeatherData(data);
      setShowWeatherCard(true);
      console.log(data);
    } catch (error) {
      console.error("Erro ao obter previsão do tempo:", error);
    }
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
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
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

      {showWeatherCard && weatherData && (
        <CardWeather
          city={city}
          weatherData={weatherData}
          showCard={showWeatherCard}
        />
      )}
    </div>
  );
}
