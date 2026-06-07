import type { LucideIcon } from "lucide-react";

export function MetricCard({ label, value, icon: Icon }: { label: string; value: string | number; icon: LucideIcon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-500">{label}</p>
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-700">
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-3 text-2xl font-extrabold text-slate-950">{value}</p>
    </div>
  );
}
