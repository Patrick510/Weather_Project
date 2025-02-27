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
import { House, LogOut, Search } from "lucide-react";

import { getWeather } from "@/components/hooks/getWeather";
import CardWeather from "@/components/cardWeather";
import { NavLink, useNavigate } from "react-router";
import CardHistory from "@/components/cardHistory";

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
  const [showHistory, setShowHistory] = useState(false);

  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedUser") || "null");
    setLogin(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    setLogin(false);
    navigate("/login");
  };

  useEffect(() => {
    setShowWeatherCard(false);
  }, []);

  const handleSearch = async (cidade?: string) => {
    setWeatherData(null);
    setShowWeatherCard(false);
    setCity("");
    try {
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
          id: id,
        },
      ]);
      setShowWeatherCard(true);
    } catch (error) {
      console.error("Erro ao obter previsão do tempo:", error);
      setWeatherData(error);
    }
  };

  const handleDeleteHistory = (id: number) => {
    setHistory((prevHistory) => prevHistory.filter((item) => item.id !== id));
  };

  const handleEditHistory = (id: number, updatedItem: HistoryItem) => {
    setHistory((prevHistory) =>
      prevHistory.map((item) =>
        item.id === id ? { ...item, ...updatedItem } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-200 p-8 flex gap-8 items-center justify-center">
      <div className="absolute top-4 left-4 flex gap-2">
        <NavLink to="/">
          <Button className="bg-gray-500 hover:bg-gray-600 rounded-full">
            <House className="h-4 w-4" />
          </Button>
        </NavLink>
        {login && (
          <Button
            className="bg-red-500 hover:bg-red-600 rounded-full"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        )}
      </div>
      {showHistory ? (
        <CardHistory
          history={history}
          ondelete={handleDeleteHistory}
          onedit={handleEditHistory}
          setShowHistory={setShowHistory}
        />
      ) : (
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="flex justify-between flex-row items-center">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-600">
                Weather Forecast
              </CardTitle>
              <CardDescription className="text-gray-600">
                Search your city and check the weather
              </CardDescription>
            </div>
            <Button
              variant={"outline"}
              className="text-gray-600 hover:text-gray-800 hover:bg-gray-100"
              onClick={() => {
                setShowHistory(true);
              }}
            >
              {" "}
              History
            </Button>
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
                    className="border-gray-200 focus:border-gray-400"
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
            />
            <Button
              className="bg-gray-500 hover:bg-gray-600"
              onClick={() => handleSearch(city)}
            >
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </CardFooter>
        </Card>
      )}

      {showWeatherCard && weatherData && (
        <CardWeather weatherData={weatherData} showCard={showWeatherCard} />
      )}
    </div>
  );
}
