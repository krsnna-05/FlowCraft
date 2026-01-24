import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="flex w-full h-full">
      <AppSidebar />
      <main className="flex flex-col flex-1 w-full h-full">
        <div className="p-2">
          <SidebarTrigger />
        </div>
        <div className="flex-1 w-full">{children}</div>
      </main>
    </SidebarProvider>
  );
}
