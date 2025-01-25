import { AlignJustify, Search } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";

export default function CardHistory() {
  return (
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
        <Button
          onClick={() => {
            console.log("Open dialog");
          }}
          className="bg-blue-500 text-white"
        >
          <AlignJustify size={24} />
        </Button>
      </CardHeader>
      <CardContent>
        <Label className="text-gray-600">City</Label>
        <Input
          type="text"
          placeholder="City name"
          value=""
          onChange={(e) => console.log(e.target.value)}
          className="w-full"
        />
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => {
            console.log("Search city");
          }}
          className="bg-blue-500 text-white"
        >
          <Search size={24} />
        </Button>
      </CardFooter>
    </Card>
  );
}
