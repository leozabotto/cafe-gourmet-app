import { useUser } from "@/stores";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function PublicRoutes() {
  const { token, type } = useUser();
  const navigation = useNavigate();

  useEffect(() => {
    if (token && type) {
      isLogged();
    }
  }, []);

  function isLogged() {
    if (type === "user") {
      navigation("/user-area");

      return;
    }

    if (type === "admin") {
      navigation("/admin-area");

      return;
    }
  }

  return <Outlet />;
}
