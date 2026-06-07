import Image from "next/image";
import Link from "next/link";
import { MessageCircle, MapPin } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatNaira, productWhatsAppUrl } from "@/lib/utils";
import { VerifiedBadge } from "@/components/verified-badge";

export function ProductCard({ product }: { product: Product }) {
  const business = product.business;

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="relative aspect-[4/3] bg-slate-100">
        {product.image_url ? <Image src={product.image_url} alt={product.title} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" /> : null}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-bold text-slate-950">{product.title}</h3>
            <p className="mt-1 text-lg font-extrabold text-brand-700">{formatNaira(product.price)}</p>
          </div>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold capitalize text-slate-600">
            {product.availability_status.replaceAll("_", " ")}
          </span>
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-slate-600">{product.description}</p>
        {business ? (
          <div className="mt-3 space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Link href={`/business/${business.slug}`} className="font-semibold text-slate-800 hover:text-brand-700">
                {business.name}
              </Link>
              <VerifiedBadge verified={business.is_verified} />
            </div>
            <p className="flex items-center gap-2 text-slate-500">
              <MapPin className="h-4 w-4" />
              {[business.city, business.state].filter(Boolean).join(", ")}
            </p>
          </div>
        ) : null}
        <a
          href={productWhatsAppUrl(product)}
          target="_blank"
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-whatsapp px-3 py-2 text-sm font-semibold text-white"
        >
          <MessageCircle className="h-4 w-4" />
          Buy on WhatsApp
        </a>
      </div>
    </article>
  );
}
