import type { LucideProps } from "lucide-react";
import type {
  ForwardRefExoticComponent,
  RefAttributes,
  Dispatch,
  SetStateAction,
} from "react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import useSidebarStore from "@/store/SidebarStore";

type MenuItem = {
  title: string;

  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  switchWord: "add" | "ai" | "menu";
};

type MenuComponentProps = {
  items: MenuItem[];
  setMenu?: Dispatch<SetStateAction<"add" | "ai" | "menu">>;
};

const MenuComponent = ({ items, setMenu }: MenuComponentProps) => {
  const { openSidebar } = useSidebarStore();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className=" flex justify-between">
        <span>Menu</span>
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <button
                  onClick={() => {
                    setMenu && setMenu(item.switchWord);
                    openSidebar && openSidebar();
                  }}
                >
                  {<item.icon />}
                  <span>{item.title}</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default MenuComponent;
