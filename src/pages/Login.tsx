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

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password) {
      alert("Preencha todos os campos!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (user: any) => user.username === username && user.password === password
    );

    if (!user) {
      alert("Usuário ou senha incorretos!");
      return;
    }

    localStorage.setItem("loggedUser", JSON.stringify(user));
    alert("Login realizado com sucesso!");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="p-6 w-96 shadow-md">
        <CardHeader>
          <h2 className="text-2xl font-bold text-gray-700 text-center">
            Login
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
            onClick={handleLogin}
            className="w-full bg-gray-600 hover:bg-gray-700"
          >
            Entrar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
