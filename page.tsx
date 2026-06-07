import Link from "next/link";
import { Building2, ImagePlus, LockKeyhole, MapPin } from "lucide-react";
import { getCategories } from "@/lib/data";

export default async function VendorRegisterPage() {
  const categories = await getCategories();

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-slate-950">List your physical business</h1>
        <p className="mt-2 text-slate-600">Create a vendor account and business profile so buyers nearby can discover your products.</p>
      </div>

      <form className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft md:grid-cols-2">
        <div className="md:col-span-2">
          <h2 className="flex items-center gap-2 font-bold text-slate-950"><LockKeyhole className="h-5 w-5 text-brand-700" /> Account</h2>
        </div>
        <label className="text-sm font-semibold text-slate-700">Full name<input name="full_name" className="mt-1 h-12 w-full rounded-xl border border-slate-200 px-3 font-normal" /></label>
        <label className="text-sm font-semibold text-slate-700">Email<input name="email" type="email" className="mt-1 h-12 w-full rounded-xl border border-slate-200 px-3 font-normal" /></label>
        <label className="text-sm font-semibold text-slate-700 md:col-span-2">Password<input name="password" type="password" className="mt-1 h-12 w-full rounded-xl border border-slate-200 px-3 font-normal" /></label>

        <div className="border-t border-slate-100 pt-2 md:col-span-2">
          <h2 className="flex items-center gap-2 font-bold text-slate-950"><Building2 className="h-5 w-5 text-brand-700" /> Business profile</h2>
        </div>
        <label className="text-sm font-semibold text-slate-700">Business name<input name="business_name" className="mt-1 h-12 w-full rounded-xl border border-slate-200 px-3 font-normal" /></label>
        <label className="text-sm font-semibold text-slate-700">Business category<select name="category" className="mt-1 h-12 w-full rounded-xl border border-slate-200 px-3 font-normal"><option>Select category</option>{categories.map((item) => <option key={item.id}>{item.name}</option>)}</select></label>
        <label className="text-sm font-semibold text-slate-700 md:col-span-2">Business address<input name="address" className="mt-1 h-12 w-full rounded-xl border border-slate-200 px-3 font-normal" /></label>
        <label className="text-sm font-semibold text-slate-700">State<input name="state" className="mt-1 h-12 w-full rounded-xl border border-slate-200 px-3 font-normal" /></label>
        <label className="text-sm font-semibold text-slate-700">City/Area<input name="city" className="mt-1 h-12 w-full rounded-xl border border-slate-200 px-3 font-normal" /></label>
        <label className="text-sm font-semibold text-slate-700">WhatsApp number<input name="whatsapp_number" className="mt-1 h-12 w-full rounded-xl border border-slate-200 px-3 font-normal" /></label>
        <label className="text-sm font-semibold text-slate-700">Phone number<input name="phone_number" className="mt-1 h-12 w-full rounded-xl border border-slate-200 px-3 font-normal" /></label>
        <label className="text-sm font-semibold text-slate-700 md:col-span-2">Description<textarea name="description" rows={4} className="mt-1 w-full rounded-xl border border-slate-200 p-3 font-normal" /></label>

        <div className="border-t border-slate-100 pt-2 md:col-span-2">
          <h2 className="flex items-center gap-2 font-bold text-slate-950"><ImagePlus className="h-5 w-5 text-brand-700" /> Images and location</h2>
        </div>
        <label className="text-sm font-semibold text-slate-700">Business logo<input name="logo" type="file" accept="image/*" className="mt-1 block w-full rounded-xl border border-slate-200 p-3 text-sm font-normal" /></label>
        <label className="text-sm font-semibold text-slate-700">Cover image<input name="cover" type="file" accept="image/*" className="mt-1 block w-full rounded-xl border border-slate-200 p-3 text-sm font-normal" /></label>
        <label className="text-sm font-semibold text-slate-700">Latitude<input name="latitude" className="mt-1 h-12 w-full rounded-xl border border-slate-200 px-3 font-normal" /></label>
        <label className="text-sm font-semibold text-slate-700">Longitude<input name="longitude" className="mt-1 h-12 w-full rounded-xl border border-slate-200 px-3 font-normal" /></label>

        <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5 md:col-span-2">
          <Link href="/dashboard" className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white">Create profile</Link>
          <p className="text-sm text-slate-500">Supabase Auth integration is scaffolded; connect credentials to persist registration.</p>
        </div>
      </form>

      <div className="mt-5 rounded-2xl bg-brand-50 p-4 text-sm text-brand-900">
        <p className="flex items-center gap-2 font-semibold"><MapPin className="h-4 w-4" /> Location input is simple for MVP.</p>
        <p className="mt-1">Vendors can manually enter address and optionally add latitude/longitude for map pins.</p>
      </div>
    </main>
  );
}
