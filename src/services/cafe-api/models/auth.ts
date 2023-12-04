export interface AuthRequest {
 email: string;
 password: string;
}

export interface AuthResponse {
  token: string;
}

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
  cpf: string;
  phoneNumber: string;
}