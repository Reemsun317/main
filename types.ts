export type Role = "buyer" | "vendor" | "admin";
export type BusinessStatus = "pending" | "approved" | "rejected";
export type AvailabilityStatus = "available" | "out_of_stock" | "limited_stock";

export type Category = {
  id: string;
  name: string;
  slug: string;
  icon?: string | null;
};

export type Business = {
  id: string;
  owner_id?: string | null;
  name: string;
  slug: string;
  category_id?: string | null;
  category?: Category | null;
  description?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  whatsapp_number?: string | null;
  phone_number?: string | null;
  logo_url?: string | null;
  cover_image_url?: string | null;
  opening_hours?: string | null;
  is_verified: boolean;
  status: BusinessStatus;
  product_count?: number;
};

export type Product = {
  id: string;
  business_id: string;
  category_id?: string | null;
  title: string;
  slug: string;
  description?: string | null;
  price: number;
  image_url?: string | null;
  availability_status: AvailabilityStatus;
  business?: Business | null;
  category?: Category | null;
};

export type SearchResults = {
  businesses: Business[];
  products: Product[];
};
