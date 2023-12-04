import { useUser } from "@/stores";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function UserRoutes() {
  const { type } = useUser();

  const navigation = useNavigate();

  useEffect(() => {
    if (type) {
      verifyRole()
    }
  }, [type]);

  function verifyRole() {
    if (type !== "user") {
      navigation("/admin-area");

      return;
    }
  }


  return <Outlet />;
}
