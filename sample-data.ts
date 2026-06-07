import type { Business, Category, Product } from "@/lib/types";

export const categories: Category[] = [
  { id: "cat-phone", name: "Phone Accessories", slug: "phone-accessories", icon: "Headphones" },
  { id: "cat-fashion", name: "Fashion", slug: "fashion", icon: "Shirt" },
  { id: "cat-electronics", name: "Electronics", slug: "electronics", icon: "Tv" },
  { id: "cat-beauty", name: "Beauty & Cosmetics", slug: "beauty-cosmetics", icon: "Sparkles" },
  { id: "cat-food", name: "Foodstuff", slug: "foodstuff", icon: "ShoppingBasket" },
  { id: "cat-building", name: "Building Materials", slug: "building-materials", icon: "Hammer" },
  { id: "cat-auto", name: "Auto Parts", slug: "auto-parts", icon: "Car" },
  { id: "cat-pharmacy", name: "Pharmacy", slug: "pharmacy", icon: "Pill" },
  { id: "cat-supermarkets", name: "Supermarkets", slug: "supermarkets", icon: "Store" },
  { id: "cat-services", name: "Services", slug: "services", icon: "Briefcase" }
];

export const businesses: Business[] = [
  {
    id: "biz-enugu-accessories",
    name: "Coal City Mobile Accessories",
    slug: "coal-city-mobile-accessories",
    category_id: "cat-phone",
    category: categories[0],
    description: "Verified phone accessories shop for chargers, earbuds, screen guards, pouches, and power banks.",
    address: "Shop 14, Ogbete Main Market",
    city: "Enugu",
    state: "Enugu",
    latitude: 6.4597,
    longitude: 7.5104,
    whatsapp_number: "08012345678",
    phone_number: "08123456780",
    logo_url: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=500&auto=format&fit=crop",
    cover_image_url: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1400&auto=format&fit=crop",
    opening_hours: "Mon - Sat, 8:30am - 6:30pm",
    is_verified: true,
    status: "approved",
    product_count: 3
  },
  {
    id: "biz-aba-fashion",
    name: "Ariaria Urban Wears",
    slug: "ariaria-urban-wears",
    category_id: "cat-fashion",
    category: categories[1],
    description: "Aba-made ready-to-wear store selling quality shirts, kaftans, trousers, and casual pieces.",
    address: "Line 3, Ariaria International Market",
    city: "Aba",
    state: "Abia",
    latitude: 5.1219,
    longitude: 7.3667,
    whatsapp_number: "+2348034567890",
    phone_number: "08034567890",
    logo_url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=500&auto=format&fit=crop",
    cover_image_url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1400&auto=format&fit=crop",
    opening_hours: "Mon - Sat, 9:00am - 6:00pm",
    is_verified: true,
    status: "approved",
    product_count: 2
  },
  {
    id: "biz-lagos-electronics",
    name: "Ikeja Smart Electronics",
    slug: "ikeja-smart-electronics",
    category_id: "cat-electronics",
    category: categories[2],
    description: "Trusted Ikeja electronics store for TVs, sound systems, laptops, and home appliances.",
    address: "12 Otigba Street, Computer Village",
    city: "Ikeja",
    state: "Lagos",
    latitude: 6.5965,
    longitude: 3.3421,
    whatsapp_number: "07055551234",
    phone_number: "07055551234",
    logo_url: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=500&auto=format&fit=crop",
    cover_image_url: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1400&auto=format&fit=crop",
    opening_hours: "Mon - Sat, 8:00am - 7:00pm",
    is_verified: true,
    status: "approved",
    product_count: 3
  },
  {
    id: "biz-abuja-building",
    name: "Dei-Dei Builders Hub",
    slug: "dei-dei-builders-hub",
    category_id: "cat-building",
    category: categories[5],
    description: "Building materials supplier for cement, tiles, plumbing fittings, roofing sheets, and tools.",
    address: "Plot 22, Dei-Dei Building Materials Market",
    city: "Abuja",
    state: "FCT",
    latitude: 9.1137,
    longitude: 7.3451,
    whatsapp_number: "08111112222",
    phone_number: "08111112222",
    logo_url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=500&auto=format&fit=crop",
    cover_image_url: "https://images.unsplash.com/photo-1586266397479-7e4facca5d6d?q=80&w=1400&auto=format&fit=crop",
    opening_hours: "Mon - Sat, 7:30am - 5:30pm",
    is_verified: false,
    status: "pending",
    product_count: 2
  },
  {
    id: "biz-ph-beauty",
    name: "Mile One Beauty Mart",
    slug: "mile-one-beauty-mart",
    category_id: "cat-beauty",
    category: categories[3],
    description: "Beauty and cosmetics store with skincare, hair products, fragrances, and makeup kits.",
    address: "21 Ikwerre Road, Mile One Market",
    city: "Port Harcourt",
    state: "Rivers",
    latitude: 4.7975,
    longitude: 6.9996,
    whatsapp_number: "09022223333",
    phone_number: "09022223333",
    logo_url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=500&auto=format&fit=crop",
    cover_image_url: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1400&auto=format&fit=crop",
    opening_hours: "Mon - Sat, 9:00am - 6:30pm",
    is_verified: true,
    status: "approved",
    product_count: 3
  }
];

const productRows = [
  { id: "prod-fast-charger", business_id: "biz-enugu-accessories", category_id: "cat-phone", title: "Oraimo 20W Fast Charger", slug: "oraimo-20w-fast-charger", description: "Original fast charger with Type-C cable.", price: 12500, image_url: "https://images.unsplash.com/photo-1589089096584-87c5c2038d6b?q=80&w=700&auto=format&fit=crop", availability_status: "available" },
  { id: "prod-powerbank", business_id: "biz-enugu-accessories", category_id: "cat-phone", title: "20000mAh Power Bank", slug: "20000mah-power-bank", description: "Long-lasting dual-output power bank.", price: 24500, image_url: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=700&auto=format&fit=crop", availability_status: "limited_stock" },
  { id: "prod-kaftan", business_id: "biz-aba-fashion", category_id: "cat-fashion", title: "Men's Linen Kaftan", slug: "mens-linen-kaftan", description: "Aba-made kaftan in navy, black, and cream.", price: 28000, image_url: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=700&auto=format&fit=crop", availability_status: "available" },
  { id: "prod-smart-tv", business_id: "biz-lagos-electronics", category_id: "cat-electronics", title: "43-inch Smart TV", slug: "43-inch-smart-tv", description: "Android smart TV with warranty and installation support.", price: 235000, image_url: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=700&auto=format&fit=crop", availability_status: "available" },
  { id: "prod-cement", business_id: "biz-abuja-building", category_id: "cat-building", title: "Dangote Cement 50kg", slug: "dangote-cement-50kg", description: "Fresh stock, bulk purchase available.", price: 9500, image_url: "https://images.unsplash.com/photo-1623416014587-85c0f684ed23?q=80&w=700&auto=format&fit=crop", availability_status: "available" },
  { id: "prod-skincare", business_id: "biz-ph-beauty", category_id: "cat-beauty", title: "Vitamin C Serum", slug: "vitamin-c-serum", description: "Brightening serum for daily skincare routine.", price: 14500, image_url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=700&auto=format&fit=crop", availability_status: "limited_stock" }
] satisfies Array<Omit<Product, "business" | "category">>;

export const products: Product[] = productRows.map((product) => ({
  ...product,
  business: businesses.find((business) => business.id === product.business_id) ?? null,
  category: categories.find((category) => category.id === product.category_id) ?? null
}));
