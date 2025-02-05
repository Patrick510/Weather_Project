import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorName, setErrorName] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [remainingTime, setRemainingTime] = useState(0);
  const navigate = useNavigate();

  const decodeBase64 = useCallback(
    (encodedText: string) => atob(encodedText),
    []
  );

  const MAX_ATTEMPTS = 2;
  const BLOCK_TIME = 30 * 1000;

  useEffect(() => {
    const interval = setInterval(() => {
      const lastAttemptTime = Number.parseInt(
        localStorage.getItem("lastAttemptTime") || "0"
      );
      if (lastAttemptTime) {
        const elapsedTime = Date.now() - lastAttemptTime;
        const timeLeft = Math.max((BLOCK_TIME - elapsedTime) / 1000, 0);
        setRemainingTime(timeLeft);

        if (timeLeft === 0) {
          localStorage.removeItem("lastAttemptTime");
          setLoginError("");
          localStorage.setItem("loginAttempts", "0");
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLogin = useCallback(() => {
    const currentTime = Date.now();

    let attempts = Number.parseInt(
      localStorage.getItem("loginAttempts") || "0"
    );

    if (attempts >= MAX_ATTEMPTS) {
      localStorage.setItem("lastAttemptTime", currentTime.toString());
      return;
    }

    if (!username || !password) {
      setErrorName("Por favor, preencha todos os campos!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (user: any) =>
        user.username === username && decodeBase64(user.password) === password
    );

    if (!user) {
      attempts += 1;
      localStorage.setItem("loginAttempts", attempts.toString());
      setLoginError("Credenciais inválidas! Tente novamente.");
      return;
    }

    localStorage.setItem("loginAttempts", "0");
    localStorage.setItem("lastAttemptTime", "0");
    localStorage.setItem(
      "loggedUser",
      JSON.stringify({ username: user.username })
    );
    setLoginMessage("Login realizado com sucesso!");

    setTimeout(() => {
      navigate("/home");
    }, 1000);
  }, [username, password, navigate, decodeBase64, remainingTime]);

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
          {loginError && <p style={{ color: "red" }}>{loginError}</p>}
          {loginMessage && <p style={{ color: "green" }}>{loginMessage}</p>}

          {/* Exibir tempo restante em tempo real */}
          {remainingTime > 0 && (
            <p style={{ color: "red" }}>
              Você excedeu o número máximo de tentativas. Tente novamente em{" "}
              {remainingTime.toFixed(0)} segundos.
            </p>
          )}
        </CardContent>
        <CardFooter className="flex flex-row items-center justify-between gap-3">
          <Button
            onClick={handleLogin}
            className="w-full bg-gray-600 hover:bg-gray-700"
            disabled={remainingTime > 0}
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
