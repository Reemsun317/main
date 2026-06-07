import type { Business, Product } from "@/lib/types";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatNaira(value: number | string | null | undefined) {
  const amount = Number(value ?? 0);
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0
  }).format(amount);
}

export function cleanWhatsAppNumber(rawNumber: string) {
  const digits = rawNumber.replace(/\D/g, "");
  if (digits.startsWith("234")) return digits;
  if (digits.startsWith("0")) return `234${digits.slice(1)}`;
  return digits;
}

export function generateWhatsAppProductLink({
  whatsappNumber,
  productTitle,
  productPrice,
  businessName,
  businessLocation
}: {
  whatsappNumber: string;
  productTitle: string;
  productPrice: number | string;
  businessName: string;
  businessLocation: string;
}) {
  const number = cleanWhatsAppNumber(whatsappNumber);
  const message = `Hello, I found this product on Reemsun.\n\nProduct: ${productTitle}\nPrice: ${formatNaira(productPrice)}\nStore: ${businessName}\nLocation: ${businessLocation}\n\nIs it still available?`;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function generateBusinessWhatsAppLink(business: Business) {
  const location = [business.address, business.city, business.state].filter(Boolean).join(", ");
  const message = `Hello, I found ${business.name} on Reemsun.\n\nLocation: ${location}\n\nI would like to ask about your products.`;
  return `https://wa.me/${cleanWhatsAppNumber(business.whatsapp_number ?? "")}?text=${encodeURIComponent(message)}`;
}

export function getDirectionsUrl(business: Pick<Business, "latitude" | "longitude" | "address" | "city" | "state">) {
  if (business.latitude && business.longitude) {
    return `https://www.google.com/maps/dir/?api=1&destination=${business.latitude},${business.longitude}`;
  }
  const query = [business.address, business.city, business.state].filter(Boolean).join(", ");
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
}

export function productWhatsAppUrl(product: Product) {
  const business = product.business;
  if (!business?.whatsapp_number) return "#";
  return generateWhatsAppProductLink({
    whatsappNumber: business.whatsapp_number,
    productTitle: product.title,
    productPrice: product.price,
    businessName: business.name,
    businessLocation: [business.address, business.city, business.state].filter(Boolean).join(", ")
  });
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
