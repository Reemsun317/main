import { SearchX } from "lucide-react";

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
      <SearchX className="mx-auto h-10 w-10 text-slate-400" />
      <h3 className="mt-3 font-bold text-slate-950">{title}</h3>
      <p className="mt-1 text-sm text-slate-500">{body}</p>
    </div>
  );
}
