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
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };

  const handleRegister = () => {
    if (!username || !password) {
      alert("Preencha todos os campos!");
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError(
        "A senha deve ter pelo menos 8 caracteres, uma letra maiúscula e um caractere especial."
      );
      return;
    } else {
      setPasswordError("");
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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (passwordError) {
      setPasswordError("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="p-6 w-96 shadow-md">
        <CardHeader>
          <h2 className="text-2xl font-bold text-gray-700 text-center">
            Register
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
            onChange={handlePasswordChange}
            autoComplete="new-password"
            placeholder="Type your password"
          />
          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button
            onClick={handleRegister}
            className="w-full bg-gray-600 hover:bg-gray-700"
          >
            Sign in
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
