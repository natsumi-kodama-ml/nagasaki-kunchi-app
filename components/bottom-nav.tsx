"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, ListBullets, Heart, MapPin } from "@phosphor-icons/react";

const TABS = [
  { href: "/", label: "ホーム", icon: House },
  { href: "/sessions", label: "一覧", icon: ListBullets },
  { href: "/favorites", label: "お気に入り", icon: Heart },
  { href: "/venues", label: "会場", icon: MapPin },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex justify-center">
      <div className="glow-card safe-bottom w-full max-w-md bg-card/95 backdrop-blur-sm">
        <div className="flex items-stretch justify-between px-2 pt-2">
          {TABS.map((tab) => {
            const active =
              tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
            const Icon = tab.icon;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="flex flex-1 flex-col items-center gap-1 rounded-xl py-2 transition-colors"
              >
                <Icon
                  size={24}
                  weight={active ? "fill" : "regular"}
                  className={active ? "text-primary" : "text-muted-foreground"}
                />
                <span
                  className={
                    active
                      ? "text-[11px] font-medium text-primary"
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
