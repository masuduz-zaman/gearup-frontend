import apiClient from "@/lib/api-client";
import { Category, GearItem, GearQueryParams } from "@/types/gear";

export const gearService = {
  getAllGear: async (params?: GearQueryParams): Promise<GearItem[]> => {
    const response = await apiClient.get("/gear", { params });
    return response.data.data;
  },

  getCategories: async (): Promise<Category[]> => {
    const response = await apiClient.get("/categories");
    return response.data.data;
  },
};