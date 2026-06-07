import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reemsun Commerce Map",
  description: "Discover verified physical stores around you in Nigeria."
};

const nav = [
  { href: "/search", label: "Search" },
  { href: "/map", label: "Map" },
  { href: "/vendor/register", label: "List Business" },
  { href: "/dashboard", label: "Dashboard" }
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-2 font-bold text-brand-700">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-600 text-white">R</span>
              <span>Reemsun</span>
            </Link>
            <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-brand-700">
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/vendor/register"
              className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-soft hover:bg-brand-700"
            >
              Get Listed
            </Link>
          </div>
        </header>
        {children}
        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 text-sm text-slate-600 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <p className="font-semibold text-slate-950">Reemsun Commerce Map</p>
              <p className="mt-2">Find stores, compare products, and buy directly through WhatsApp.</p>
            </div>
            <p>Built for verified Nigerian physical businesses.</p>
            <p className="md:text-right">No cart, no payment, no delivery in MVP.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
