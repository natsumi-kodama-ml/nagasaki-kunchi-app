"use client";

import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "kunchi-location";

type LocationContextValue = {
  venueId: string | null;
  setVenueId: (id: string) => void;
};

const LocationContext = createContext<LocationContextValue | null>(null);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [venueId, setVenueIdState] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setVenueIdState(raw);
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || !venueId) return;
    window.localStorage.setItem(STORAGE_KEY, venueId);
  }, [venueId, hydrated]);

  const setVenueId = (id: string) => setVenueIdState(id);

  return (
    <LocationContext.Provider value={{ venueId, setVenueId }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const ctx = useContext(LocationContext);
  if (!ctx) {
    throw new Error("useLocation must be used within LocationProvider");
  }
  return ctx;
}
