import {
  useConnection,
  type ConnectionLineComponentProps,
} from "@xyflow/react";

export const ConnectionLineComponent = ({
  fromX,
  fromY,
  toX,
  toY,
}: ConnectionLineComponentProps) => {
  const { fromHandle } = useConnection();

  const strokeColor = fromHandle?.id || "gray";

  return (
    <g>
      <path
        fill="none"
        stroke={strokeColor}
        strokeWidth={1.5}
        className="animated"
        d={`M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`}
      />
      <circle
        cx={toX}
        cy={toY}
        fill="#fff"
        r={3}
        stroke={strokeColor}
        strokeWidth={1.5}
      />
    </g>
  );
};
