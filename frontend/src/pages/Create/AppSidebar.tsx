import {
  BotIcon,
  Calendar,
  Home,
  Inbox,
  PlusCircle,
  Search,
  Settings,
  Menu,
  type LucideProps,
} from "lucide-react";

import { Sidebar, SidebarContent, SidebarGroup } from "@/components/ui/sidebar";
import {
  useState,
  type ForwardRefExoticComponent,
  type RefAttributes,
} from "react";
import MenuComponent from "@/components/FlowChart/Sidebar/MenuComponent";
import NodeDropBox from "@/components/FlowChart/Sidebar/NodeDropBox";
import useSidebarStore from "@/store/SidebarStore";
import {
  SidebarMenuButton,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

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
  const { isOpen, toggleSidebar } = useSidebarStore();

  return (
    <Sidebar className="" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          {/* Menu Toggle Button */}
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => {
                  toggleSidebar();
                  setCurrMenu("menu");
                }}
              >
                <Menu />
                <span>Menu</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          {currMenu === "menu" && (
            <MenuComponent items={items} setMenu={setCurrMenu} />
          )}
          {currMenu === "add" && <NodeDropBox />}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
