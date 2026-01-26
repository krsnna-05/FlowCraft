import { create } from "zustand";
import { createPortal } from "react-dom";
import { BaseNode, BaseNodeContent } from "@/components/base-node";
import type { XYPosition } from "@xyflow/react";

// Global drag state store - persists even when sidebar unmounts
interface DragState {
  draggingNode: "horizontal" | "vertical" | null;
  ghostPos: XYPosition;
  setDraggingNode: (node: "horizontal" | "vertical" | null) => void;
  setGhostPos: (pos: XYPosition) => void;
  reset: () => void;
}

export const useDragStore = create<DragState>((set) => ({
  draggingNode: null,
  ghostPos: { x: 0, y: 0 },
  setDraggingNode: (node) => set({ draggingNode: node }),
  setGhostPos: (pos) => set({ ghostPos: pos }),
  reset: () => set({ draggingNode: null, ghostPos: { x: 0, y: 0 } }),
}));

// Ghost component rendered via portal - must be rendered in a component that never unmounts
export const DragGhost = () => {
  const { draggingNode, ghostPos } = useDragStore();

  if (!draggingNode) return null;

  return createPortal(
    <div
      className="dndnode pointer-events-none"
      style={{
        position: "fixed",
        left: `${ghostPos.x - 100}px`,
        top: `${ghostPos.y - 20}px`,
        zIndex: 50000,
        width: "200px",
        opacity: 0.8,
      }}
    >
      <BaseNode className="w-full">
        <BaseNodeContent>
          <div
            className={`flex ${draggingNode === "vertical" ? "flex-col" : ""} items-center justify-center ${draggingNode === "vertical" ? "gap-2" : "gap-4"} w-full`}
          >
            <span className="text-sm font-medium">
              {draggingNode === "horizontal" ? "Horizontal" : "Vertical"} Node
            </span>
          </div>
        </BaseNodeContent>
      </BaseNode>
    </div>,
    document.body,
  );
};
