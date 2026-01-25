import {
  BotIcon,
  Calendar,
  Home,
  Inbox,
  PlusCircle,
  Search,
  Settings,
  type LucideProps,
} from "lucide-react";

import { Sidebar, SidebarContent, SidebarGroup } from "@/components/ui/sidebar";
import {
  useState,
  type ForwardRefExoticComponent,
  type RefAttributes,
} from "react";
import MenuComponent from "@/components/FlowChart/Sidebar/MenuComponent";

type MenuItem = {
  title: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  switchWord: "add" | "ai" | "menu";
};

// Menu items.
const items: MenuItem[] = [
  {
    title: "Add",
    icon: PlusCircle,
    switchWord: "add",
  },
  {
    title: "AI Assistant",
    icon: BotIcon,
    switchWord: "ai",
  },
];

export function AppSidebar() {
  const [currMenu, setCurrMenu] = useState<"menu" | "add" | "ai">("menu");

  return (
    <Sidebar className="" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          {currMenu === "menu" && (
            <MenuComponent items={items} setMenu={setCurrMenu} />
          )}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
