import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import useSidebarStore from "@/store/SidebarStore";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isOpen, setIsOpen } = useSidebarStore();

  return (
    <SidebarProvider
      className="flex w-full h-screen"
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <AppSidebar />
      <main className="flex flex-col flex-1 w-full h-full overflow-hidden">
        {children}
      </main>
    </SidebarProvider>
  );
}
