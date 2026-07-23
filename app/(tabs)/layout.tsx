import { BottomNav } from "@/components/bottom-nav";

export default function TabsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto w-full max-w-md flex-1 pb-24">{children}</div>
      <BottomNav />
    </div>
  );
}
