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

import axios from "axios";
import { useState } from "react";

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
    <div className="p-4">
      <Card>
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
          <Button>Send</Button>
        </CardFooter>
      </Card>

      <Card className="hidden"></Card>
    </div>
  );
}
