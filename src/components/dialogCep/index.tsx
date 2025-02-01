import { Search } from "lucide-react";
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
import { useState } from "react";
import { getCep } from "../hooks/getCep";

interface DialogCEPProps {
  onCEPSearch: (localidade: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function DialogCEP({
  onCEPSearch,
  open,
  setOpen,
}: DialogCEPProps) {
  const [cep, setCep] = useState<string>("");
  const [, setCepData] = useState<any>(null);
  const [, setError] = useState<string>("");

  const handleSearchCep = async () => {
    setError("");
    try {
      const data = await getCep({ cep });
      setCepData(data);
      onCEPSearch(data.localidade);
      setOpen(false);
    } catch (err) {
      setError("CEP não encontrado ou erro na busca");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-gray-300 text-gray-600 hover:bg-gray-50"
        >
          Use zip code
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-600">
            Enter the zip code
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Enter your ZIP code to automatically fill in your address
            information.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cep" className="text-right text-gray-700">
              CEP
            </Label>
            <Input
              id="cep"
              placeholder="00000-000"
              className="col-span-3 text-gray-800 border-gray-200 focus:border-gray-400"
              onChange={(e) => setCep(e.target.value)}
              value={cep}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="bg-gray-500 hover:bg-gray-600"
            onClick={handleSearchCep}
          >
            <Search className="mr-2 h-4 w-4" /> Search CEP
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
