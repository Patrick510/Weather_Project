import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!username || !password) {
      alert("Preencha todos os campos!");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = existingUsers.some(
      (user: any) => user.username === username
    );

    if (userExists) {
      alert("Usuário já cadastrado!");
      return;
    }

    const newUser = { username, password };
    localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]));

    alert("Cadastro realizado com sucesso!");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="p-6 w-96 shadow-md">
        <CardHeader>
          <h2 className="text-2xl font-bold text-gray-700 text-center">
            Cadastro
          </h2>
        </CardHeader>
        <CardContent>
          <Label>Usuário</Label>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite seu usuário"
          />
          <Label className="mt-4">Senha</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
          />
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button
            onClick={handleRegister}
            className="w-full bg-gray-600 hover:bg-gray-700"
          >
            Cadastrar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
