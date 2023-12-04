import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

interface UserDecrypted {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
}

type LoginTypeAllowed = "user" | "admin";

interface UseUserProps {
  user: UserDecrypted | null;
  token: string;
  type: LoginTypeAllowed | null;
  decodeToken(token: string, type: LoginTypeAllowed): void;
  logout(): void
}

export const useUser = create<UseUserProps>()(
  persist<UseUserProps>(
    (set) => ({
      user: null,
      token: "",
      type: null,
      status: "unlogged",
      decodeToken: (token, type) => {
        const decoded = jwtDecode<UserDecrypted>(token);

        set({
          user: {
            id: decoded.id,
            email: decoded.email,
            name: decoded.name,
            phoneNumber: decoded.phoneNumber,
          },
          token: token,
          type: type,
        });
      },
      logout: () => {
        set({
          user: null,
          token: "", 
          type: null
        })
      }
    }),
    {
      name: "useUser",
    }
  )
);
