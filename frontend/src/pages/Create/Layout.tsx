import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import useSidebarStore from "@/store/SidebarStore";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebarStore();

  return (
    <SidebarProvider className="flex w-full h-full" open={isOpen}>
      <AppSidebar />
      <main className="flex flex-col flex-1 w-full h-full">
        <div className="flex-1 w-full">{children}</div>
      </main>
    </SidebarProvider>
  );
}
