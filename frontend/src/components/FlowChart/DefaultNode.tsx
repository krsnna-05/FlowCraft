import { memo } from "react";

import { Handle, Position } from "@xyflow/react";
import type { NodeProps } from "@xyflow/react";

import { BaseNode, BaseNodeContent } from "@/components/base-node";

export const DefaultNode = memo(({ data, selected }: NodeProps) => {
  return (
    <BaseNode className={`w-fit h-fit ${selected ? "border-primary" : ""}`}>
      <BaseNodeContent>
        {String(data.label)}

        {data.handleOrientation === "horizontal" ? (
          <>
            <Handle type="target" position={Position.Left} />
            <Handle type="source" position={Position.Right} />
          </>
        ) : (
          <>
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
          </>
        )}
      </BaseNodeContent>
    </BaseNode>
  );
});

DefaultNode.displayName = "DefaultNode";
