import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const user = JSON.parse(localStorage.getItem("loggedUser") || "null");
  console.log(user);

  return user ? <Outlet /> : <Navigate to="/login" />;
}
