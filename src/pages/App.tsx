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
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

import { getWeather } from "@/components/hooks/getWeather";
import CardWeather from "@/components/cardWeather";
import { NavLink } from "react-router";

type HistoryItem = {
  city: string;
  weather: string;
  country: string;
  id: number;
};

export default function App() {
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [showWeatherCard, setShowWeatherCard] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [id, setId] = useState(0);
  const [cepHistory, setCepHistory] = useState<string>("");

  useEffect(() => {
    setShowWeatherCard(false);
  }, []);

  const handleSearch = async (cidade?: string) => {
    setWeatherData(null);
    setShowWeatherCard(false);
    setCity("");
    try {
      console.log("CidadeCep antes da busca:", cidade);
      const searchCity = city || cidade;
      if (!searchCity) {
        throw new Error("City is required");
      }
      const data = await getWeather({ city: searchCity });
      setWeatherData(data);
      setId((prevId) => prevId + 1);
      setHistory((prevHistory: any) => [
        ...prevHistory,
        {
          city: data.name,
          weather: data.weather[0].description,
          country: data.sys.country,
          cep: cidade ? cidade : "",
          id: id,
        },
      ]);
      console.log("History:", history);
      setShowWeatherCard(true);
    } catch (error) {
      console.error("Erro ao obter previsão do tempo:", error);
      setWeatherData(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 p-8 flex gap-8 items-center justify-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="flex justify-between flex-row items-center">
          <div>
            <CardTitle className="text-2xl font-bold text-blue-600">
              Weather Forecast
            </CardTitle>
            <CardDescription className="text-gray-600">
              Search your city and check the weather
            </CardDescription>
          </div>
          <NavLink to="/history" state={{ history: history }}>
            <Button
              variant={"outline"}
              className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
            >
              {" "}
              History
            </Button>
          </NavLink>
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
          <DialogCEP
            onCEPSearch={handleSearch}
            open={dialogOpen}
            setOpen={setDialogOpen}
            setCepHistory={setCepHistory}
          />
          <Button
            className="bg-blue-500 hover:bg-blue-600"
            onClick={() => handleSearch(city)}
          >
            <Search className="mr-2 h-4 w-4" /> Search
          </Button>
        </CardFooter>
      </Card>

      {showWeatherCard && weatherData && (
        <CardWeather weatherData={weatherData} showCard={showWeatherCard} />
      )}
    </div>
  );
}
