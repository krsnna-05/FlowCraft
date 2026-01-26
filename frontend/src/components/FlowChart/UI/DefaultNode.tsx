import { memo, useState } from "react";

import { Handle, Position } from "@xyflow/react";
import type { NodeProps } from "@xyflow/react";

import { BaseNode, BaseNodeContent } from "@/components/base-node";
import NodeContextMenu from "./NodeContextMenu";
import useReactFlowStore from "@/store/ReactFlowStore";

export const DefaultNode = memo(({ data, id, selected }: NodeProps) => {
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const { deleteNode, editNodeLabel } = useReactFlowStore();

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleDelete = (nodeId: string) => {
    deleteNode(nodeId);
  };

  const handleEdit = (nodeId: string, newLabel: string) => {
    editNodeLabel?.(nodeId, newLabel);
  };

  return (
    <>
      <div onContextMenu={handleContextMenu}>
        <BaseNode
          className={`w-fit h-fit relative ${selected ? "border-primary" : ""}`}
        >
          <BaseNodeContent>
            {String(data.label)}

            {data.handleOrientation === "horizontal" ? (
              <>
                {/* Left side - both target and source */}
                <Handle
                  type="target"
                  position={Position.Left}
                  id="left-target"
                  className=" w-0 h-0"
                />
                <Handle
                  type="source"
                  position={Position.Left}
                  id="left-source"
                />

                {/* Right side - both target and source */}
                <Handle
                  type="target"
                  position={Position.Right}
                  id="right-target"
                />
                <Handle
                  type="source"
                  position={Position.Right}
                  id="right-source"
                />
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
      </div>

      {/* Node Context Menu */}
      <NodeContextMenu
        contextMenu={contextMenu}
        setContextMenu={setContextMenu}
        nodeId={id}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </>
  );
});

DefaultNode.displayName = "DefaultNode";
