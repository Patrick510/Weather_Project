import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorName, setErrorName] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [errorAttempts, setErrorAttempts] = useState("");
  const navigate = useNavigate();

  const encodeBase64 = useCallback((text: string) => btoa(text), []);
  const decodeBase64 = useCallback(
    (encodedText: string) => atob(encodedText),
    []
  );

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (!users.some((user: any) => user.username === "admin")) {
      users.push({ username: "admin", password: encodeBase64("admin") });
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [encodeBase64]);

  const handleLogin = useCallback(() => {
    const MAX_ATTEMPTS = 5;
    let attempts = Number.parseInt(
      localStorage.getItem("loginAttempts") || "0"
    );

    if (attempts >= MAX_ATTEMPTS) {
      setErrorAttempts(
        "Você excedeu o número máximo de tentativas. Tente novamente em 30 segundos."
      );
      return;
    }

    if (!username || !password) {
      setErrorName("Por favor, preencha todos os campos!");
      return;
    }

    const usernamePattern = /^[a-zA-Z0-9_]+$/;
    if (!usernamePattern.test(username)) {
      setErrorName(
        "O nome de usuário não pode conter espaços ou caracteres especiais."
      );
      return;
    }

    if (password.length < 6) {
      setPasswordError("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const user = users.find((user: any) => {
      return (
        user.username === username && decodeBase64(user.password) === password
      );
    });

    if (!user) {
      attempts += 1;
      localStorage.setItem("loginAttempts", attempts.toString());
      setLoginError("Credenciais inválidas! Tente novamente.");
      return;
    }

    localStorage.setItem("loginAttempts", "0");
    localStorage.setItem(
      "loggedUser",
      JSON.stringify({ username: user.username })
    );
    setLoginMessage("Login realizado com sucesso!");

    setTimeout(() => {
      navigate("/home");
    }, 1000);
  }, [username, password, navigate, decodeBase64]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleLogin();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleLogin]);

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
          {errorName && <p style={{ color: "red" }}>{errorName}</p>}
          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
          {loginError && <p style={{ color: "red" }}>{loginError}</p>}
          {loginMessage && <p style={{ color: "green" }}>{loginMessage}</p>}
          {errorAttempts && <p style={{ color: "red" }}>{errorAttempts}</p>}
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
