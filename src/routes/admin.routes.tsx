import { useUser } from "@/stores";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function AdminRoutes() {
  const { type } = useUser();

  const navigation = useNavigate();

  useEffect(() => {
    if (type) {
      verifyRole()
    }
  }, [type]);

  function verifyRole() {
    if (type !== "admin") {
      navigation("/user-area");

      return;
    }
  }


  return <Outlet />;
}
