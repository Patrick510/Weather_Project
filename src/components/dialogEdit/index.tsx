import { Pen, Search } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";

interface DialogEditProps {
  open: boolean;
  item: any;
  setOpen: (open: boolean) => void;
  onEdit: (id: number, item: any) => void;
}

export default function DialogEdit({
  item,
  open,
  setOpen,
  onEdit,
}: DialogEditProps) {
  const [idCity, setIdCity] = useState<number>(0);
  const [city, setCity] = useState<string>("");
  const [weatherclouds, setWeatherClouds] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  useEffect(() => {
    if (item) {
      setIdCity(item.id);
      setCity(item.city);
      setWeatherClouds(item.weather);
      setCountry(item.country);
    }
  }, [item]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 hover:bg-blue-200 transition-colors duration-200"
        >
          <Pen className="h-4 w-4 text-blue-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-600">
            Edit your data
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Edit your data and save it
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cep" className="text-right text-gray-700">
              City
            </Label>
            <Input
              id="city"
              value={city}
              placeholder="Your city"
              className="col-span-3 text-gray-800 border-blue-200 focus:border-blue-400"
              onChange={(e) => setCity(e.target.value)}
            />
            <Label htmlFor="cep" className="text-right text-gray-700">
              Weather Clouds
            </Label>
            <Input
              id="weatherclouds"
              value={weatherclouds}
              placeholder="overcast..."
              className="col-span-3 text-gray-800 border-blue-200 focus:border-blue-400"
              onChange={(e) => setWeatherClouds(e.target.value)}
            />
            <Label htmlFor="cep" className="text-right text-gray-700">
              Country
            </Label>
            <Input
              id="country"
              value={country}
              placeholder="Brazil"
              className="col-span-3 text-gray-800 border-blue-200 focus:border-blue-400"
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              setOpen(false);
              onEdit(item.id, {
                id: item.id,
                city,
                weather: weatherclouds,
                country,
              });
            }}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
