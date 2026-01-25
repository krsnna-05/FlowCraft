import { Controls, ControlButton } from "@xyflow/react";
import { MenuIcon } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

export function FlowControls() {
  const { toggleSidebar } = useSidebar();

  const handleToggle = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSidebar();
  };

  return (
    <Controls
      className="bottom-20! left-2! right-auto! md:bottom-3! md:left-3! z-50"
      showFitView={false}
      showInteractive={false}
    >
      <ControlButton
        onClick={handleToggle}
        onTouchStart={handleToggle as React.TouchEventHandler}
        title="Toggle Sidebar"
      >
        <MenuIcon className="w-4 h-4" />
      </ControlButton>
    </Controls>
  );
}
