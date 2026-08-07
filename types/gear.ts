export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface GearItem {
  id: string;
  name: string;
  description: string;
  pricePerDay: number;
  category: Category;
  imageUrl: string;
  isAvailable: boolean;
  brand?: string;
}

export interface GearQueryParams {
  search?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
}