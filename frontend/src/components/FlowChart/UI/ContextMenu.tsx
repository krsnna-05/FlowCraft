import React, { useEffect } from "react";
import { motion } from "motion/react";
import { createPortal } from "react-dom";
import { ArrowDownIcon, ArrowRightIcon } from "lucide-react";
import useReactFlowStore from "@/store/ReactFlowStore";

interface ContextMenuProps {
  contextMenu: { x: number; y: number } | null;
  setContextMenu: (menu: { x: number; y: number } | null) => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  contextMenu,
  setContextMenu,
}) => {
  const { addNode } = useReactFlowStore();

  useEffect(() => {
    const handleClickOutside = () => {
      setContextMenu(null);
    };

    if (contextMenu) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [contextMenu, setContextMenu]);

  const onAddHorizontalNode = () => {
    if (contextMenu) {
      addNode({
        id: `node-${Date.now()}`,
        type: "defaultAppNode",
        position: { x: contextMenu.x, y: contextMenu.y },
        data: {
          handleOrientation: "horizontal",
          label: "Horizontal Node",
        },
      });
      setContextMenu(null);
    }
  };

  const onAddVerticalNode = () => {
    if (contextMenu) {
      addNode({
        id: `node-${Date.now()}`,
        type: "defaultAppNode",
        position: { x: contextMenu.x, y: contextMenu.y },
        data: {
          handleOrientation: "vertical",
          label: "Vertical Node",
        },
      });
      setContextMenu(null);
    }
  };

  const MenuItem = ({
    icon: Icon,
    label,
    onClick,
    shortcut,
  }: {
    icon: React.ElementType;
    label: string;
    onClick?: () => void;
    shortcut?: string;
  }) => (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
        setContextMenu(null);
      }}
      className="w-full flex items-center justify-between px-3 py-2 text-left text-sm text-primary hover:bg-muted cursor-pointer transition-colors rounded-md group"
    >
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
        <span>{label}</span>
      </div>
      {shortcut && (
        <span className="text-xs text-muted-foreground ml-4">{shortcut}</span>
      )}
    </button>
  );

  return (
    <>
      {contextMenu &&
        createPortal(
          <motion.div
            className="fixed bg-white border border-gray-200 rounded-lg shadow-lg min-w-50 p-1.5"
            style={{
              left: `${contextMenu.x}px`,
              top: `${contextMenu.y}px`,
              zIndex: 50000,
            }}
            id="canvasContext"
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            onContextMenu={(e) => e.stopPropagation()}
          >
            {/* Add Node Section */}
            <div className="px-2 py-1.5">
              <span className="text-xs font-medium text-muted-foreground tracking-wider">
                Add Node
              </span>
            </div>

            <MenuItem
              icon={ArrowDownIcon}
              label="Vertical Node"
              onClick={onAddVerticalNode}
              shortcut="V"
            />
            <MenuItem
              icon={ArrowRightIcon}
              label="Horizontal Node"
              onClick={onAddHorizontalNode}
              shortcut="H"
            />
          </motion.div>,
          document.body,
        )}
    </>
  );
};

export default ContextMenu;
