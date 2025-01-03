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

import axios from "axios";
import { useState } from "react";
import { Search } from "lucide-react";

const url = "https://viacep.com.br/ws/79630762/json/";

export default function App() {
  const [cep, setCep] = useState<any>(null);
  const [city, setCity] = useState<string>("");

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

  return (
    <div className="p-4 flex flex-col gap-4 items-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Weather</CardTitle>
          <CardDescription>
            Search your city and check the weather
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">City</Label>
                <Input id="name" placeholder="Name of your city" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <DialogCEP></DialogCEP>
          <Button>
            <Search></Search>
          </Button>
        </CardFooter>
      </Card>

      <Card className="hidden">
        <CardHeader>
          <CardTitle></CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>

        <CardContent>
          <div className="hidden" id="not-found">
            <img src={notFound} alt="404" />
            <p>Ooops! Invalid Location</p>
          </div>

          <div id="weather-box">
            <img src="" alt="preview" id="imagem" />
            <p id="temperature">°</p>
            <p id="description">aaaa</p>
          </div>

          <div id="weather-details">
            <div id="humidity"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
