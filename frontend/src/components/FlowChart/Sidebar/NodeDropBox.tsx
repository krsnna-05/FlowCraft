import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import useSidebarStore from "@/store/SidebarStore";
import React from "react";

const NodeDropBox = () => {
  const { closeSidebar } = useSidebarStore();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className=" flex justify-between">
        <span>Add Node</span>
        <SidebarTrigger
          size="lg"
          onClick={() => {
            closeSidebar();
          }}
        />
      </SidebarGroupLabel>
    </SidebarGroup>
  );
};

export default NodeDropBox;
