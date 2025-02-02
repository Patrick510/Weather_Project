import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CloudSun, Search, Clock, Map } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";

export default function Home() {
  const [login, setLogin] = useState(false);
  return (
    <div className="min-h-screen bg-gray-200 p-8 flex items-center justify-center">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <CloudSun className="h-12 w-12 text-gray-500 mr-4" />
            <CardTitle className="text-4xl font-bold text-gray-600">
              Weather Forecast App
            </CardTitle>
          </div>
          <CardDescription className="text-center text-lg text-gray-600">
            Your go-to solution for accurate and up-to-date weather information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-gray-700">
            Welcome to our Weather Forecast Application! Stay informed about
            weather conditions in any city around the world.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Search className="h-8 w-8 text-gray-500" />}
              title="City Search"
              description="Look up weather for any city globally"
            />
            <FeatureCard
              icon={<Clock className="h-8 w-8 text-gray-500" />}
              title="Real-time Data"
              description="Get up-to-date weather information"
            />
            <FeatureCard
              icon={<Map className="h-8 w-8 text-gray-500" />}
              title="Location History"
              description="Keep track of your searched locations"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <NavLink to="/login">
            <Button className="bg-gray-500 hover:bg-gray-600 text-lg px-6 py-3">
              {login
                ? "Start Exploring Weather"
                : "Login to start exploring weather"}
            </Button>
          </NavLink>
        </CardFooter>
      </Card>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="bg-white/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-center">{icon}</div>
        <CardTitle className="text-center text-lg font-semibold text-gray-700">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
}
