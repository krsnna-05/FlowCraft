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
  const { deleteNode, editNodeLabel, updateNodeHandles } = useReactFlowStore();

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

  const handleUpdateHandles = (handles: {
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
  }) => {
    updateNodeHandles?.(id, handles);
  };

  return (
    <>
      <div onContextMenu={handleContextMenu}>
        <BaseNode
          className={`w-fit h-fit relative ${selected ? "border-primary" : ""}`}
        >
          <BaseNodeContent>
            {String(data.label)}

            {/* Top handles */}
            {data.handles?.top && (
              <>
                <Handle type="target" position={Position.Top} id="top-target" />
                <Handle type="source" position={Position.Top} id="top-source" />
              </>
            )}

            {/* Right handles */}
            {data.handles?.right && (
              <>
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
            )}

            {/* Bottom handles */}
            {data.handles?.bottom && (
              <>
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

            {/* Left handles */}
            {data.handles?.left && (
              <>
                <Handle
                  type="target"
                  position={Position.Left}
                  id="left-target"
                />
                <Handle
                  type="source"
                  position={Position.Left}
                  id="left-source"
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
        handles={
          data.handles || { top: true, right: true, bottom: true, left: true }
        }
        onUpdateHandles={handleUpdateHandles}
      />
    </>
  );
});

DefaultNode.displayName = "DefaultNode";
