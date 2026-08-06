import apiClient from "@/lib/api-client";
import { AuthResponse, LoginPayload, RegisterPayload } from "@/types/auth";

export const authService = {
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const response = await apiClient.post("/auth/register", payload);
    return response.data;
  },

  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const response = await apiClient.post("/auth/login", payload);
    return response.data;
  },

  getMe: async () => {
    const response = await apiClient.get("/auth/me");
    return response.data;
  },
};