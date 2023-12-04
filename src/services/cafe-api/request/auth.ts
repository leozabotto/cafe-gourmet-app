import { AuthRequest, AuthResponse, SignUpRequest } from "..";
import { apiCafe } from "../api";

export const AuthServices = {
  loginCustomer(values: AuthRequest) {
    return apiCafe.post<AuthResponse>("/customer/auth", {
      ...values,
    });
  },
  loginAdmin(values: AuthRequest) {
    return apiCafe.post<AuthResponse>("/admin/auth", {
      ...values,
    });
  },
  signUp(values: SignUpRequest) {
    return apiCafe.post("/customer", {
      ...values,
    });
  },
};
