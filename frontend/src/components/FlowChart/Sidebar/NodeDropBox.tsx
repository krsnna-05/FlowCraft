import { SidebarGroup, SidebarGroupLabel } from "@/components/ui/sidebar";
import { BaseNode, BaseNodeContent } from "@/components/base-node";

const NodeDropBox = () => {
  return (
    <SidebarGroup className=" flex flex-col gap-4">
      <SidebarGroupLabel className=" flex justify-between">
        <span>Add Node (drag)</span>
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
