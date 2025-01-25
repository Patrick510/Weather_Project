"use client";

import { Pen, Trash } from "lucide-react";
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
import { NavLink, useLocation } from "react-router";

export default function CardHistory() {
  const location = useLocation();
  const history = location.state?.history || [];

  const handleDelete = (id: string) => {};

  const handleEdit = (id: string) => {
    console.log("Edit item with id:", id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 p-8 flex items-center justify-center">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader className="flex justify-between flex-row items-center bg-blue-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold">History</CardTitle>
          <NavLink to="/" className="text-white hover:text-blue-200">
            <Button
              variant="outline"
              className="border-white bg-transparent text-white hover:bg-blue-700 hover:text-white transition-colors duration-200"
            >
              Back
            </Button>
          </NavLink>
        </CardHeader>

        <CardContent className="p-6">
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
                <TableHead className="font-bold text-blue-800">CEP</TableHead>
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
                  <TableCell>{item.cep}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(item.id)}
                      className="mr-2 hover:bg-blue-200 transition-colors duration-200"
                    >
                      <Pen className="h-4 w-4 text-blue-600" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(item.id)}
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
