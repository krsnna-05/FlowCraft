import { Workflow, PanelLeft, GitBranch } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import useReactFlowStore from "@/store/ReactFlowStore";

const TopBar = () => {
  const { mobileView, setMobileView } = useReactFlowStore();

  return (
    <div className="w-full fixed z-500000 bg-background" id="top-bar">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 border-b border-border p-3">
        <h1 className="text-2xl font-bold flex justify-center items-center gap-2">
          <Workflow className="w-6 h-6" />
          <span>FlowCraft</span>
        </h1>

        {/* Mobile View Switcher - visible only on mobile */}
        <div className="md:hidden">
          <ToggleGroup
            type="single"
            value={mobileView}
            onValueChange={(value) => {
              if (value) setMobileView(value as "sidebar" | "canvas");
            }}
            variant="outline"
            spacing={0}
          >
            <ToggleGroupItem value="sidebar" className="gap-2">
              <PanelLeft className="w-4 h-4" />
              <span className="text-sm">Sidebar</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="canvas" className="gap-2">
              <GitBranch className="w-4 h-4" />
              <span className="text-sm">Canvas</span>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
