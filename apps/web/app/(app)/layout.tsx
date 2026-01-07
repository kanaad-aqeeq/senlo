import { SidebarWrapper } from "apps/web/components/sidebar/sidebar-wrapper";
import { QueryProvider } from "apps/web/providers";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <SidebarWrapper>{children}</SidebarWrapper>
    </QueryProvider>
  );
}
