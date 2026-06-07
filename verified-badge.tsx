import { CheckCircle2 } from "lucide-react";

export function VerifiedBadge({ verified }: { verified?: boolean }) {
  if (!verified) {
    return <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">Pending</span>;
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-brand-700">
      <CheckCircle2 className="h-3.5 w-3.5" />
      Verified
    </span>
  );
}
