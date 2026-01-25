import { SidebarGroup, SidebarGroupLabel } from "@/components/ui/sidebar";
import { BaseNode, BaseNodeContent } from "@/components/base-node";
import { MoveLeft } from "lucide-react";
import useSidebarStore from "@/store/SidebarStore";

const NodeDropBox = () => {
  const { setCurrMenu } = useSidebarStore();

  return (
    <SidebarGroup className=" flex flex-col gap-4">
      <SidebarGroupLabel className=" flex justify-between">
        <span>Add Node (drag)</span>

        <MoveLeft
          onClick={() => setCurrMenu("menu")}
          className=" hover:scale-105"
        />
      </SidebarGroupLabel>

      {/* Horizontal Node Preview */}
      <div className="relative w-full">
        <BaseNode className="w-full">
          <BaseNodeContent>
            <div className="flex items-center justify-center gap-4 w-full">
              <span className="text-sm font-medium">Horizontal Node</span>
            </div>
          </BaseNodeContent>
        </BaseNode>
      </div>

      {/* Vertical Node Preview */}
      <div className="relative w-full">
        <BaseNode className="w-full">
          <BaseNodeContent>
            <div className="flex flex-col items-center justify-center gap-2 w-full">
              <span className="text-sm font-medium">Vertical Node</span>
            </div>
          </BaseNodeContent>
        </BaseNode>
      </div>
    </SidebarGroup>
  );
};

export default NodeDropBox;
