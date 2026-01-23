import { memo } from "react";

import { Handle, Position } from "@xyflow/react";
import type { NodeProps } from "@xyflow/react";

import { BaseNode, BaseNodeContent } from "@/components/base-node";

export const DefaultNode = memo(({ data, selected }: NodeProps) => {
  return (
    <BaseNode
      className={`w-fit h-fit relative ${selected ? "border-primary" : ""}`}
    >
      <BaseNodeContent>
        {String(data.label)}

        {data.handleOrientation === "horizontal" ? (
          <>
            {/* Left side - both target and source */}
            <Handle type="target" position={Position.Left} id="left-target" />
            <Handle type="source" position={Position.Left} id="left-source" />

            {/* Right side - both target and source */}
            <Handle type="target" position={Position.Right} id="right-target" />
            <Handle type="source" position={Position.Right} id="right-source" />
          </>
        ) : (
          <>
            {/* Top - both target and source */}
            <Handle type="target" position={Position.Top} id="top-target" />
            <Handle type="source" position={Position.Top} id="top-source" />

            {/* Bottom - both target and source */}
            <Handle
              type="target"
              position={Position.Bottom}
              id="bottom-target"
            />
            <Handle
              type="source"
              position={Position.Bottom}
              id="bottom-source"
            />
          </>
        )}
      </BaseNodeContent>
    </BaseNode>
  );
});

DefaultNode.displayName = "DefaultNode";
