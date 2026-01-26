import { Workflow, PanelLeft, GitBranch, BotIcon } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import useReactFlowStore from "@/store/ReactFlowStore";

const TopBar = () => {
  const { mobileView, setMobileView } = useReactFlowStore();

  return (
    <div className="w-full z-500000 bg-background" id="top-bar">
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
            <ToggleGroupItem value="sidebar" className="gap-1">
              <BotIcon className="w-3 h-3" />
              <span className="text-xs">AI Builder</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="canvas" className="gap-1">
              <GitBranch className="w-3 h-3" />
              <span className="text-xs">Canvas</span>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
