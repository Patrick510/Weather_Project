import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DialogEdit from "../dialogEdit";
import { useState } from "react";

interface HistoryItem {
  history: any;
  ondelete: (id: number) => void;
  onedit: (id: number, item: any) => void;
  setShowHistory: (show: boolean) => void;
}

export default function CardHistory({
  history,
  ondelete,
  onedit,
  setShowHistory,
}: HistoryItem) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-8 flex items-center justify-center">
      <Card className="w-full shadow-lg max-h-[510px] h-full">
        <CardHeader className="flex justify-between flex-row items-center bg-blue-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold">History</CardTitle>
          <Button
            variant="outline"
            className="border-white bg-transparent text-white hover:bg-blue-700 hover:text-white transition-colors duration-200"
            onClick={() => setShowHistory(false)}
          >
            Back
          </Button>
        </CardHeader>

        <CardContent className="p-6 overflow-auto max-h-[415px]">
          <Table>
            <TableCaption className="caption-bottom mt-4 text-blue-600 font-semibold">
              History of searches
            </TableCaption>
            <TableHeader>
              <TableRow className="bg-blue-50 border-b-2 border-blue-200">
                <TableHead className="font-bold text-blue-800">City</TableHead>
                <TableHead className="font-bold text-blue-800">
                  Weather
                </TableHead>
                <TableHead className="font-bold text-blue-800">
                  Country
                </TableHead>
                <TableHead className="text-right font-bold text-blue-800">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((item: any) => (
                <TableRow
                  key={item.id}
                  className="border-b border-blue-100 hover:bg-blue-50 transition-colors duration-200"
                >
                  <TableCell className="font-medium text-blue-700">
                    {item.city}
                  </TableCell>
                  <TableCell>{item.weather}</TableCell>
                  <TableCell>{item.country}</TableCell>
                  <TableCell className="text-right">
                    <DialogEdit
                      item={item}
                      open={dialogOpen}
                      setOpen={setDialogOpen}
                      onEdit={(id, updatedItem) => {
                        setDialogOpen(false);
                        onedit(id, updatedItem);
                      }}
                    />

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => ondelete(item.id)}
                      className="hover:bg-red-100 transition-colors duration-200"
                    >
                      <Trash className="h-4 w-4 text-red-600" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
