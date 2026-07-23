import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="safe-top bg-info px-4 pb-5 pt-5 text-info-foreground">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-white/60">{eyebrow}</p>
          <h1 className="font-heading text-xl font-semibold text-white">{title}</h1>
        </div>
        {action}
      </div>
      <div className="stripe-badge mt-4 h-1.5 w-full rounded-full" />
    </div>
  );
}
