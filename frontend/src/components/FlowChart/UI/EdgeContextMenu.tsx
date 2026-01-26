import React, { useEffect } from "react";
import { motion } from "motion/react";
import { createPortal } from "react-dom";
import { TrashIcon } from "lucide-react";

interface EdgeContextMenuProps {
  contextMenu: { x: number; y: number } | null;
  setContextMenu: (menu: { x: number; y: number } | null) => void;
  edgeId: string;
  onDelete: (edgeId: string) => void;
}

const EdgeContextMenu: React.FC<EdgeContextMenuProps> = ({
  contextMenu,
  setContextMenu,
  edgeId,
  onDelete,
}) => {
  const handleDelete = () => {
    console.log("Deleting edge:", edgeId);
    onDelete(edgeId);
    setContextMenu(null);
  };

  useEffect(() => {
    console.log("Context menu state:", contextMenu);

    const handleClickOutside = () => {
      console.log("Closing context menu");
      setContextMenu(null);
    };

    if (contextMenu) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
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
            id="edgeContext"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <span className=" text-sm text-muted-foreground">Edge</span>
            <button
              onClick={handleDelete}
              className="w-full block px-3 py-2 text-left text-sm text-red-500 hover:bg-red-100 cursor-pointer transition-colors rounded-md"
            >
              <TrashIcon className="inline mr-2" size={16} />
              <span>Delete Edge</span>
            </button>
          </motion.div>,
          document.body,
        )}
    </>
  );
};

export default EdgeContextMenu;
