export type UserRole = "customer" | "provider" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    user: User;
  };
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  photo?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}