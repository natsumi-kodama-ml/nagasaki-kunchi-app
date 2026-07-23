"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export function useNow(): Date | null {
  const searchParams = useSearchParams();
  const demoNow = searchParams.get("demoNow");
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(demoNow ? new Date(demoNow) : new Date());
    if (demoNow) return;
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, [demoNow]);

  return now;
}
