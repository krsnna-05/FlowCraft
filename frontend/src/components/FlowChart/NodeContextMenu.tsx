import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { createPortal } from "react-dom";
import { PencilIcon, TrashIcon } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface NodeContextMenuProps {
  contextMenu: { x: number; y: number } | null;
  setContextMenu: (menu: { x: number; y: number } | null) => void;
  nodeId: string;
  onDelete: (nodeId: string) => void;
  onEdit?: (nodeId: string, newLabel: string) => void;
}

const NodeContextMenu: React.FC<NodeContextMenuProps> = ({
  contextMenu,
  setContextMenu,
  nodeId,
  onDelete,
  onEdit,
}) => {
  const handleDelete = () => {
    console.log("Deleting node:", nodeId);
    onDelete(nodeId);
    setContextMenu(null);
  };

  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editLabel, setEditLabel] = useState("");

  const handleEdit = () => {
    setShowEditDialog(true);
  };

  const handleSave = () => {
    setShowEditDialog(false);
    setContextMenu(null);
    if (onEdit) {
      onEdit(nodeId, editLabel);
    }
  };

  useEffect(() => {
    console.log("Context menu state:", contextMenu);

    const handleClickOutside = (e: React.MouseEvent | MouseEvent) => {
      const target = e.target as HTMLElement;
      // Don't close if clicking on dialog or dialog trigger
      if (
        target?.closest('[role="dialog"]') ||
        target?.closest('[data-slot="dialog-trigger"]')
      ) {
        return;
      }
      console.log("Closing context menu");
      setContextMenu(null);
      setShowEditDialog(false);
    };

    if (contextMenu) {
      document.addEventListener("click", handleClickOutside as any);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside as any);
    };
  }, [contextMenu, setContextMenu]);

  return (
    <>
      {contextMenu &&
        createPortal(
          <motion.div
            className="fixed bg-white border border-gray-200 rounded-md shadow-lg min-w-30 p-2"
            style={{
              left: `${contextMenu.x}px`,
              top: `${contextMenu.y}px`,
              zIndex: 50000,
            }}
            id="nodeContext"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.1 }}
            onClick={(e) => e.stopPropagation()}
            onContextMenu={(e) => e.stopPropagation()}
          >
            <span className=" text-sm text-muted-foreground">Node</span>
            <div className=" text-primary" id="editbtn">
              <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
                <DialogTrigger asChild>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit();
                    }}
                    className="w-full block px-3 py-2 text-left text-sm text-primary hover:bg-muted cursor-pointer transition-colors rounded-md"
                  >
                    <PencilIcon className="inline mr-2" size={16} />
                    <span className=" text-sm">Edit</span>
                  </button>
                </DialogTrigger>
                <DialogContent
                  style={{
                    zIndex: 50001,
                  }}
                >
                  <DialogHeader>
                    <DialogTitle>Edit Node</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <Input
                      placeholder="Enter node label"
                      value={editLabel}
                      onChange={(e) => setEditLabel(e.target.value)}
                    />
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setShowEditDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleSave}>Save</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <button
              onClick={handleDelete}
              className="w-full block px-3 py-2 text-left text-sm text-red-500 hover:bg-red-100 cursor-pointer transition-colors rounded-md"
            >
              <TrashIcon className="inline mr-2" size={16} />
              <span>Delete Node</span>
            </button>
          </motion.div>,
          document.body,
        )}
    </>
  );
};

export default NodeContextMenu;
