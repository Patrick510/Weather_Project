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

export default function DialogCEP() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Insira o CEP</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-black">Insira o CEP</DialogTitle>
          <DialogDescription className="text-black">
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right text-black">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3 text-black"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right text-black">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3 text-black"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">
            <Search></Search>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
