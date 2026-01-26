import {
  SidebarGroup,
  SidebarGroupLabel,
  useSidebar,
} from "@/components/ui/sidebar";
import { BaseNode, BaseNodeContent } from "@/components/base-node";
import { MoveLeft } from "lucide-react";
import useSidebarStore from "@/store/SidebarStore";

// type imports
import { useReactFlow, type XYPosition } from "@xyflow/react";
import { useCallback, useEffect } from "react";

import useReactFlowStore from "@/store/ReactFlowStore";
import { useDragStore } from "@/store/DragStore";

let id = 0;
const getId = () => `node_${id++}`;

const NodeDropBox = () => {
  const { setCurrMenu } = useSidebarStore();
  const { screenToFlowPosition } = useReactFlow();
  const { addNode } = useReactFlowStore();
  const { isMobile, setOpenMobile } = useSidebar();
  const { draggingNode, setDraggingNode, setGhostPos, reset } = useDragStore();

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

  // Handle pointer move and up events globally
  useEffect(() => {
    if (!draggingNode) return;

    const handlePointerMove = (e: PointerEvent) => {
      setGhostPos({ x: e.clientX, y: e.clientY });
    };

    const handlePointerUp = (e: PointerEvent) => {
      const nodeOrientation = draggingNode;
      reset();
      handleNodeDrop(
        "defaultAppNode",
        { x: e.clientX, y: e.clientY },
        nodeOrientation,
      );
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [draggingNode, setGhostPos, reset, handleNodeDrop]);

  const handlePointerDown = (
    e: React.PointerEvent,
    nodeType: "horizontal" | "vertical",
  ) => {
    e.preventDefault();
    setDraggingNode(nodeType);
    setGhostPos({ x: e.clientX, y: e.clientY });

    // Hide mobile sidebar overlay when dragging starts
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <>
      {/* Static Previews in Sidebar */}
      <SidebarGroup className=" flex flex-col gap-4">
        <SidebarGroupLabel className=" flex justify-between">
          <span>Add Node (drag)</span>

          <MoveLeft
            onClick={() => setCurrMenu("menu")}
            className=" hover:scale-105"
          />
        </SidebarGroupLabel>

        {/* Horizontal Node Preview - Static */}
        <div
          className="dndnode cursor-grab active:cursor-grabbing touch-none"
          onPointerDown={(e) => handlePointerDown(e, "horizontal")}
        >
          <BaseNode className="w-full">
            <BaseNodeContent>
              <div className="flex items-center justify-center gap-4 w-full">
                <span className="text-sm font-medium">Horizontal Node</span>
              </div>
            </BaseNodeContent>
          </BaseNode>
        </div>

        {/* Vertical Node Preview - Static */}
        <div
          className="dndnode cursor-grab active:cursor-grabbing touch-none"
          onPointerDown={(e) => handlePointerDown(e, "vertical")}
        >
          <BaseNode className="w-full">
            <BaseNodeContent>
              <div className="flex flex-col items-center justify-center gap-2 w-full">
                <span className="text-sm font-medium">Vertical Node</span>
              </div>
            </BaseNodeContent>
          </BaseNode>
        </div>
      </SidebarGroup>
    </>
  );
};

export default NodeDropBox;
