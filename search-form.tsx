import { Search, SlidersHorizontal } from "lucide-react";
import { getCategories } from "@/lib/data";

export async function SearchForm({
  q,
  category,
  location,
  verifiedOnly,
  minPrice,
  maxPrice,
  compact = false
}: {
  q?: string;
  category?: string;
  location?: string;
  verifiedOnly?: boolean;
  minPrice?: string;
  maxPrice?: string;
  compact?: boolean;
}) {
  const categories = await getCategories();

  return (
    <form action="/search" className="rounded-2xl border border-slate-200 bg-white p-3 shadow-soft">
      <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr_auto]">
        <label className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            name="q"
            defaultValue={q}
            placeholder="Search products, stores, areas, or markets"
            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none ring-brand-100 focus:border-brand-500 focus:ring-4"
          />
        </label>
        <label className="relative">
          <input
            name="location"
            defaultValue={location}
            placeholder="City, state, street, or market"
            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none ring-brand-100 focus:border-brand-500 focus:ring-4"
          />
        </label>
        <button className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 font-semibold text-white hover:bg-brand-700">
          <Search className="h-4 w-4" />
          Find Stores
        </button>
      </div>

      {!compact && (
        <div className="mt-3 grid gap-3 border-t border-slate-100 pt-3 md:grid-cols-5">
          <label className="text-xs font-semibold text-slate-500">
            Category
            <select
              name="category"
              defaultValue={category}
              className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-normal text-slate-700"
            >
              <option value="">All categories</option>
              {categories.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <label className="text-xs font-semibold text-slate-500">
            Min price
            <input name="minPrice" defaultValue={minPrice} inputMode="numeric" className="mt-1 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-normal" />
          </label>
          <label className="text-xs font-semibold text-slate-500">
            Max price
            <input name="maxPrice" defaultValue={maxPrice} inputMode="numeric" className="mt-1 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-normal" />
          </label>
          <label className="flex h-16 items-center gap-2 rounded-xl border border-slate-200 px-3 text-sm font-semibold text-slate-700">
            <input name="verified" type="checkbox" defaultChecked={verifiedOnly} className="h-4 w-4 rounded border-slate-300 text-brand-600" />
            Verified only
          </label>
          <div className="flex h-16 items-center gap-2 rounded-xl bg-slate-50 px-3 text-sm font-medium text-slate-500">
            <SlidersHorizontal className="h-4 w-4" />
            Simple MVP filters
          </div>
        </div>
      )}
    </form>
  );
}
