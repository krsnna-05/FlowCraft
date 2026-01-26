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

            {/* Top handles - always rendered, connectivity controlled */}
            <Handle
              type="target"
              position={Position.Top}
              id="top-target"
              isConnectable={data.handles?.top ?? true}
              style={{ visibility: data.handles?.top ? "visible" : "hidden" }}
            />
            <Handle
              type="source"
              position={Position.Top}
              id="top-source"
              isConnectable={data.handles?.top ?? true}
              style={{ visibility: data.handles?.top ? "visible" : "hidden" }}
            />

            {/* Right handles - always rendered, connectivity controlled */}
            <Handle
              type="target"
              position={Position.Right}
              id="right-target"
              isConnectable={data.handles?.right ?? true}
              style={{ visibility: data.handles?.right ? "visible" : "hidden" }}
            />
            <Handle
              type="source"
              position={Position.Right}
              id="right-source"
              isConnectable={data.handles?.right ?? true}
              style={{ visibility: data.handles?.right ? "visible" : "hidden" }}
            />

            {/* Bottom handles - always rendered, connectivity controlled */}
            <Handle
              type="target"
              position={Position.Bottom}
              id="bottom-target"
              isConnectable={data.handles?.bottom ?? true}
              style={{
                visibility: data.handles?.bottom ? "visible" : "hidden",
              }}
            />
            <Handle
              type="source"
              position={Position.Bottom}
              id="bottom-source"
              isConnectable={data.handles?.bottom ?? true}
              style={{
                visibility: data.handles?.bottom ? "visible" : "hidden",
              }}
            />

            {/* Left handles - always rendered, connectivity controlled */}
            <Handle
              type="target"
              position={Position.Left}
              id="left-target"
              isConnectable={data.handles?.left ?? true}
              style={{ visibility: data.handles?.left ? "visible" : "hidden" }}
            />
            <Handle
              type="source"
              position={Position.Left}
              id="left-source"
              isConnectable={data.handles?.left ?? true}
              style={{ visibility: data.handles?.left ? "visible" : "hidden" }}
            />
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
          data.handles?.top !== undefined ||
          data.handles?.right !== undefined ||
          data.handles?.bottom !== undefined ||
          data.handles?.left !== undefined
            ? (data.handles as {
                top: boolean;
                right: boolean;
                bottom: boolean;
                left: boolean;
              })
            : { top: true, right: true, bottom: true, left: true }
        }
        onUpdateHandles={handleUpdateHandles}
      />
    </>
  );
});

DefaultNode.displayName = "DefaultNode";
