"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { Business } from "@/lib/types";
import { generateBusinessWhatsAppLink, getDirectionsUrl } from "@/lib/utils";

export function MapView({ businesses }: { businesses: Business[] }) {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  useEffect(() => {
    if (!token || !containerRef.current || mapRef.current) return;
    mapboxgl.accessToken = token;
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [7.49, 9.07],
      zoom: 5.2
    });

    mapRef.current = map;
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    businesses.forEach((business) => {
      if (!business.longitude || !business.latitude) return;
      const popupHtml = `
        <div style="padding:14px;min-width:220px">
          <strong style="font-size:15px">${business.name}</strong>
          <p style="margin:6px 0;color:#475569">${business.category?.name ?? "Business"} · ${business.city ?? ""}</p>
          <p style="margin:0 0 10px;color:${business.is_verified ? "#1d4ed8" : "#64748b"};font-weight:700">${business.is_verified ? "Verified" : "Pending verification"}</p>
          <div style="display:grid;gap:7px">
            <a href="/business/${business.slug}" style="background:#2563eb;color:white;padding:8px 10px;border-radius:10px;text-decoration:none;text-align:center;font-weight:700">View Store</a>
            <a href="${generateBusinessWhatsAppLink(business)}" target="_blank" style="background:#1fa855;color:white;padding:8px 10px;border-radius:10px;text-decoration:none;text-align:center;font-weight:700">WhatsApp</a>
            <a href="${getDirectionsUrl(business)}" target="_blank" style="background:#f1f5f9;color:#0f172a;padding:8px 10px;border-radius:10px;text-decoration:none;text-align:center;font-weight:700">Directions</a>
          </div>
        </div>
      `;
      new mapboxgl.Marker({ color: business.is_verified ? "#2563eb" : "#64748b" })
        .setLngLat([business.longitude, business.latitude])
        .setPopup(new mapboxgl.Popup().setHTML(popupHtml))
        .addTo(map);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [businesses, token]);

  if (!token) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-950">Map API key missing</h2>
        <p className="mt-2 text-sm text-slate-600">
          Add <code>NEXT_PUBLIC_MAPBOX_TOKEN</code> to show the interactive map. Approved stores still appear below.
        </p>
        <div className="mt-4 grid gap-3">
          {businesses.map((business) => (
            <div key={business.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-50 p-3">
              <div>
                <p className="font-semibold text-slate-950">{business.name}</p>
                <p className="text-sm text-slate-500">{[business.address, business.city, business.state].filter(Boolean).join(", ")}</p>
              </div>
              <Link href={`/business/${business.slug}`} className="rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white">
                View Store
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <div ref={containerRef} className="h-[560px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-soft" />;
}
