import { getSmoothStepPath, type EdgeProps } from "@xyflow/react";
import { useState } from "react";
import useReactFlowStore from "@/store/ReactFlowStore";
import EdgeContextMenu from "./EdgeContextMenu";

export function DefaultEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
}: EdgeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const { deleteEdge } = useReactFlowStore();

  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const strokeColor = isHovered || contextMenu ? "#d1d5db" : "#525252";

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleDelete = (edgeId: string) => {
    deleteEdge(edgeId);
  };

  return (
    <>
      <g
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onContextMenu={handleContextMenu}
        className="cursor-pointer"
      >
        {/* Invisible thicker stroke for easier hovering */}
        <path fill="none" stroke="transparent" strokeWidth={12} d={edgePath} />
        {/* Visible edge */}
        <path
          id={id}
          fill="none"
          stroke={strokeColor}
          strokeWidth={1.5}
          strokeDasharray="5,5"
          className="animated-edge"
          d={edgePath}
        />
      </g>

      {/* Context Menu Component */}
      <EdgeContextMenu
        contextMenu={contextMenu}
        setContextMenu={setContextMenu}
        edgeId={id}
        onDelete={handleDelete}
      />
    </>
  );
}
