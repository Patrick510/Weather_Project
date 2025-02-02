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
    const MAX_ATTEMPTS = 5;
    let attempts = parseInt(localStorage.getItem("loginAttempts") || "0");

    if (attempts >= MAX_ATTEMPTS) {
      alert(
        "Você excedeu o número máximo de tentativas. Tente novamente em 30 segundos."
      );
      return;
    }

    if (!username || !password) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    const usernamePattern = /^[a-zA-Z0-9_]+$/;
    if (!usernamePattern.test(username)) {
      alert(
        "O nome de usuário não pode conter espaços ou caracteres especiais."
      );
      return;
    }

    if (password.length < 6) {
      alert("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const user = users.find(
      (user: any) => user.username === username && user.password === password
    );

    if (!user) {
      attempts += 1;
      localStorage.setItem("loginAttempts", attempts.toString());
      alert("Credenciais inválidas! Tente novamente.");
      return;
    }

    localStorage.setItem("loginAttempts", "0");

    localStorage.setItem("loggedUser", JSON.stringify(user));
    alert("Login realizado com sucesso!");

    navigate("/home");
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
          <Label>Username</Label>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Type your username"
          />
          <Label className="mt-4">Password</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            placeholder="Type your password"
          />
        </CardContent>
        <CardFooter className="flex flex-row items-center justify-between gap-3">
          <Button
            onClick={handleLogin}
            className="w-full bg-gray-600 hover:bg-gray-700"
          >
            Login
          </Button>
          ou
          <Button
            onClick={() => navigate("/register")}
            className="w-full bg-gray-400 hover:bg-gray-500"
          >
            Sign in
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
