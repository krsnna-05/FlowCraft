import { getSmoothStepPath, type EdgeProps } from "@xyflow/react";

export function DefaultEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
}: EdgeProps) {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const strokeColor = "gray";

  return (
    <g>
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
  );
}
