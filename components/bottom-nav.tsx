"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Info, ListBullets, Heart, MapPin } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/about", label: "概要", icon: Info },
  { href: "/venues", label: "会場", icon: MapPin },
  { href: "/", label: "ホーム", icon: House },
  { href: "/sessions", label: "演目", icon: ListBullets },
  { href: "/favorites", label: "お気に入り", icon: Heart },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex justify-center">
      <div className="glow-card safe-bottom w-full max-w-md bg-card/95 backdrop-blur-sm">
        <div className="stripe-badge h-1 w-full opacity-70" />
        <div className="flex items-stretch justify-between gap-1 px-2 py-2">
          {TABS.map((tab) => {
            const active =
              tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
            const Icon = tab.icon;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "flex flex-1 flex-col items-center gap-0.5 rounded-2xl py-1.5 transition-colors",
                  active && "bg-primary"
                )}
              >
                <Icon
                  size={22}
                  weight={active ? "fill" : "regular"}
                  className={active ? "text-primary-foreground" : "text-muted-foreground"}
                />
                <span
                  className={
                    active
                      ? "text-[11px] font-semibold text-primary-foreground"
                      : "text-[11px] text-muted-foreground"
                  }
                >
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
