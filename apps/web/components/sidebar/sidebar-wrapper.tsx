"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "./sidebar";

export function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isEditor = pathname.startsWith("/editor");
  const isPublic = pathname.startsWith("/unsubscribe");
  const hideSidebar = isEditor || isPublic;

  return (
    <div className="flex min-h-screen">
      {!hideSidebar && <Sidebar />}
      <div className={`flex-1 ${!hideSidebar ? "pl-64" : ""}`}>
        {children}
      </div>
    </div>
  );
}


