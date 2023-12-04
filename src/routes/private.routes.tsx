import { useUser } from "@/stores";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function PrivateRoutes() {
  const { token } = useUser();
  const navigation = useNavigate();

  useEffect(() => {
    if (!token) {
      isLogged();
    }
  }, [token]);

  function isLogged() {
    navigation("/");

    return;
  }

  return <Outlet />;
}
