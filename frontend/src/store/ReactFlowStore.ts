import { create } from "zustand";

// types import for nodes and edges
import type { Node, Edge } from "@xyflow/react";

export type DefautlAppNode = Node<{
  handleOrientation: "horizontal" | "vertical";
  label: string;
  handles?: {
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
  };
}>;

type ReactFlowStore = {
  nodes: DefautlAppNode[];
  setNodes: (nodes: DefautlAppNode[]) => void;
  edges: Edge[];
  setEdges: (edges: Edge[]) => void;

  addNode: (node: DefautlAppNode) => void;
  addEdge: (edge: Edge) => void;
  deleteNode: (nodeId: string) => void;
  deleteEdge: (edgeId: string) => void;

  editNodeLabel?: (nodeId: string, newLabel: string) => void;
  updateNodeHandles?: (
    nodeId: string,
    handles: { top: boolean; right: boolean; bottom: boolean; left: boolean },
  ) => void;

  showContextMenu: boolean;
  setShowContextMenu: (show: boolean) => void;

  mobileView: "sidebar" | "canvas";
  setMobileView: (view: "sidebar" | "canvas") => void;
};

const useReactFlowStore = create<ReactFlowStore>(
  (set): ReactFlowStore => ({
    nodes: [],
    setNodes: (nodes: DefautlAppNode[]) => set({ nodes }),
    edges: [],
    setEdges: (edges: Edge[]) => set({ edges }),
    addNode: (node: DefautlAppNode) =>
      set((state) => ({ nodes: [...state.nodes, node] })),
    addEdge: (edge: Edge) =>
      set((state) => ({ edges: [...state.edges, edge] })),
    deleteNode: (nodeId: string) =>
      set((state) => ({
        nodes: state.nodes.filter((node) => node.id !== nodeId),
      })),
    deleteEdge: (edgeId: string) =>
      set((state) => ({
        edges: state.edges.filter((edge) => edge.id !== edgeId),
      })),
    editNodeLabel: (nodeId: string, newLabel: string) =>
      set((state) => ({
        nodes: state.nodes.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, label: newLabel } }
            : node,
        ),
      })),
    updateNodeHandles: (
      nodeId: string,
      handles: { top: boolean; right: boolean; bottom: boolean; left: boolean },
    ) =>
      set((state) => ({
        nodes: state.nodes.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, handles } }
            : node,
        ),
      })),

    showContextMenu: false,
    setShowContextMenu: (show: boolean) => set({ showContextMenu: show }),

    mobileView: "canvas",
    setMobileView: (view: "sidebar" | "canvas") => set({ mobileView: view }),
  }),
);

export default useReactFlowStore;
