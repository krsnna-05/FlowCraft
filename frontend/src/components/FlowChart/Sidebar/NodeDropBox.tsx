import { SidebarGroup, SidebarGroupLabel } from "@/components/ui/sidebar";
import { BaseNode, BaseNodeContent } from "@/components/base-node";
import { MoveLeft } from "lucide-react";
import useSidebarStore from "@/store/SidebarStore";
import { useDraggable } from "@neodrag/react";

// type imports
import { useReactFlow, type XYPosition } from "@xyflow/react";
import { useCallback, useRef, useState } from "react";

import useReactFlowStore from "@/store/ReactFlowStore";

let id = 0;
const getId = () => `node_${id++}`;

const NodeDropBox = () => {
  const { setCurrMenu } = useSidebarStore();
  const { screenToFlowPosition } = useReactFlow();
  const { addNode } = useReactFlowStore();
  const horizontalRef = useRef<HTMLDivElement>(null);
  const verticalRef = useRef<HTMLDivElement>(null);
  const [horizontalPos, setHorizontalPos] = useState<XYPosition>({
    x: 0,
    y: 0,
  });
  const [verticalPos, setVerticalPos] = useState<XYPosition>({ x: 0, y: 0 });

  const handleNodeDrop = useCallback(
    (
      nodeType: string,
      screenPosition: XYPosition,
      nodeOrientation: "horizontal" | "vertical",
    ) => {
      const flow = document.querySelector(".react-flow");
      const flowRect = flow?.getBoundingClientRect();
      const isInFlow =
        flowRect &&
        screenPosition.x >= flowRect.left &&
        screenPosition.x <= flowRect.right &&
        screenPosition.y >= flowRect.top &&
        screenPosition.y <= flowRect.bottom;

      // Create a new node and add it to the flow
      if (isInFlow) {
        const position = screenToFlowPosition(screenPosition);

        const newNode = {
          id: getId(),
          type: nodeType,
          position,
          data: {
            label: `${nodeType} node`,
            handleOrientation: nodeOrientation,
          },
        };

        addNode(newNode);
      }
    },
    [screenToFlowPosition, addNode],
  );

  // Setup draggable for Horizontal Node
  useDraggable(horizontalRef as React.RefObject<HTMLElement>, {
    position: horizontalPos,
    onDrag: ({ offsetX, offsetY }) => {
      setHorizontalPos({
        x: offsetX,
        y: offsetY,
      });
    },
    onDragEnd: ({ event }) => {
      setHorizontalPos({ x: 0, y: 0 });
      handleNodeDrop(
        "defaultAppNode",
        { x: event.clientX, y: event.clientY },
        "horizontal",
      );
    },
  });

  // Setup draggable for Vertical Node
  useDraggable(verticalRef as React.RefObject<HTMLElement>, {
    position: verticalPos,
    onDrag: ({ offsetX, offsetY }) => {
      setVerticalPos({
        x: offsetX,
        y: offsetY,
      });
    },
    onDragEnd: ({ event }) => {
      setVerticalPos({ x: 0, y: 0 });
      handleNodeDrop(
        "defaultAppNode",
        { x: event.clientX, y: event.clientY },
        "vertical",
      );
    },
  });

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
      <div className="relative w-full dndnode" ref={horizontalRef}>
        <BaseNode className="w-full">
          <BaseNodeContent>
            <div className="flex items-center justify-center gap-4 w-full">
              <span className="text-sm font-medium">Horizontal Node</span>
            </div>
          </BaseNodeContent>
        </BaseNode>
      </div>

      {/* Vertical Node Preview */}
      <div className="relative w-full dndnode" ref={verticalRef}>
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
