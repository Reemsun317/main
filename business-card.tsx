import Image from "next/image";
import Link from "next/link";
import { MapPin, MessageCircle, Store } from "lucide-react";
import type { Business } from "@/lib/types";
import { generateBusinessWhatsAppLink } from "@/lib/utils";
import { VerifiedBadge } from "@/components/verified-badge";

export function BusinessCard({ business }: { business: Business }) {
  const location = [business.city, business.state].filter(Boolean).join(", ");

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="relative h-36 bg-slate-100">
        {business.cover_image_url ? (
          <Image src={business.cover_image_url} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
        ) : null}
      </div>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="relative grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl bg-brand-50 text-brand-700">
            {business.logo_url ? <Image src={business.logo_url} alt="" fill className="object-cover" sizes="48px" /> : <Store className="h-6 w-6" />}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate font-bold text-slate-950">{business.name}</h3>
              <VerifiedBadge verified={business.is_verified} />
            </div>
            <p className="mt-1 text-sm font-medium text-brand-700">{business.category?.name}</p>
          </div>
        </div>
        <p className="mt-3 line-clamp-2 text-sm text-slate-600">{business.description}</p>
        <p className="mt-3 flex items-center gap-2 text-sm text-slate-500">
          <MapPin className="h-4 w-4" />
          {business.address ? `${business.address}, ${location}` : location}
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <a
            href={generateBusinessWhatsAppLink(business)}
            target="_blank"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp px-3 py-2 text-sm font-semibold text-white"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <Link href={`/business/${business.slug}`} className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:border-brand-500 hover:text-brand-700">
            View Store
          </Link>
        </div>
      </div>
    </article>
  );
}
