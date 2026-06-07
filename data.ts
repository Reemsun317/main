import { businesses as sampleBusinesses, categories as sampleCategories, products as sampleProducts } from "@/lib/sample-data";
import { createClient } from "@/lib/supabase/server";
import type { Business, Category, Product, SearchResults } from "@/lib/types";

function hasSupabaseEnv() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

async function getSupabaseCatalog() {
  if (!hasSupabaseEnv()) {
    return {
      categories: sampleCategories,
      businesses: sampleBusinesses,
      products: sampleProducts
    };
  }

  const supabase = await createClient();
  const [categoryResult, businessResult, productResult] = await Promise.all([
    supabase.from("categories").select("*").order("name"),
    supabase
      .from("businesses")
      .select("*, category:categories(*)")
      .order("created_at", { ascending: false }),
    supabase
      .from("products")
      .select("*, business:businesses(*, category:categories(*)), category:categories(*)")
      .order("created_at", { ascending: false })
  ]);

  return {
    categories: (categoryResult.data as Category[] | null) ?? sampleCategories,
    businesses: (businessResult.data as Business[] | null) ?? sampleBusinesses,
    products: (productResult.data as Product[] | null) ?? sampleProducts
  };
}

export async function getCategories() {
  return (await getSupabaseCatalog()).categories;
}

export async function getFeaturedBusinesses() {
  const { businesses } = await getSupabaseCatalog();
  return businesses.filter((business) => business.status === "approved").slice(0, 4);
}

export async function getMapBusinesses() {
  const { businesses } = await getSupabaseCatalog();
  return businesses.filter((business) => business.status === "approved" && business.latitude && business.longitude);
}

export async function getBusinessBySlug(slug: string) {
  const { businesses } = await getSupabaseCatalog();
  return businesses.find((business) => business.slug === slug) ?? null;
}

export async function getProductsByBusinessId(businessId: string) {
  const { products } = await getSupabaseCatalog();
  return products.filter((product) => product.business_id === businessId);
}

export async function searchCommerce({
  q = "",
  category = "",
  location = "",
  verifiedOnly = false,
  minPrice,
  maxPrice
}: {
  q?: string;
  category?: string;
  location?: string;
  verifiedOnly?: boolean;
  minPrice?: string;
  maxPrice?: string;
}): Promise<SearchResults> {
  const { businesses, products } = await getSupabaseCatalog();
  const query = q.toLowerCase();
  const locationQuery = location.toLowerCase();
  const min = minPrice ? Number(minPrice) : undefined;
  const max = maxPrice ? Number(maxPrice) : undefined;

  const businessMatches = (business: Business) => {
    const haystack = [
      business.name,
      business.description,
      business.category?.name,
      business.city,
      business.state,
      business.address
    ].join(" ").toLowerCase();
    const locationHaystack = [business.city, business.state, business.address].join(" ").toLowerCase();
    return (
      business.status === "approved" &&
      (!query || haystack.includes(query)) &&
      (!category || business.category?.slug === category) &&
      (!locationQuery || locationHaystack.includes(locationQuery)) &&
      (!verifiedOnly || business.is_verified)
    );
  };

  const productMatches = (product: Product) => {
    const business = product.business;
    const haystack = [
      product.title,
      product.description,
      product.category?.name,
      business?.name,
      business?.city,
      business?.state,
      business?.address
    ].join(" ").toLowerCase();
    const locationHaystack = [business?.city, business?.state, business?.address].join(" ").toLowerCase();
    return (
      business?.status === "approved" &&
      (!query || haystack.includes(query)) &&
      (!category || product.category?.slug === category || business?.category?.slug === category) &&
      (!locationQuery || locationHaystack.includes(locationQuery)) &&
      (!verifiedOnly || Boolean(business?.is_verified)) &&
      (min === undefined || product.price >= min) &&
      (max === undefined || product.price <= max)
    );
  };

  return {
    businesses: businesses.filter(businessMatches),
    products: products.filter(productMatches)
  };
}

export async function getAdminMetrics() {
  const { businesses, products } = await getSupabaseCatalog();
  return {
    totalBusinesses: businesses.length,
    verifiedBusinesses: businesses.filter((business) => business.is_verified).length,
    pendingBusinesses: businesses.filter((business) => business.status === "pending").length,
    totalProducts: products.length
  };
}

export async function getVendorMetrics() {
  const { businesses, products } = await getSupabaseCatalog();
  return {
    totalProducts: products.filter((product) => product.business_id === businesses[0].id).length,
    profileViews: 248,
    whatsappClicks: 51,
    verificationStatus: businesses[0].is_verified ? "Verified" : "Pending"
  };
}
