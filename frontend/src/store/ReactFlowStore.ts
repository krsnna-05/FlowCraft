import { create } from "zustand";

// types import for nodes and edges
import type { Node, Edge } from "@xyflow/react";

export type DefautlAppNode = Node<{
  handleOrientation: "horizontal" | "vertical";
  label: string;
}>;

type ReactFlowStore = {
  nodes: DefautlAppNode[];
  setNodes: (nodes: DefautlAppNode[]) => void;
  edges: Edge[];
  setEdges: (edges: Edge[]) => void;

  addNode: (node: DefautlAppNode) => void;
  deleteNode: (nodeId: string) => void;
  deleteEdge: (edgeId: string) => void;
};

const useReactFlowStore = create<ReactFlowStore>(
  (set): ReactFlowStore => ({
    nodes: [],
    setNodes: (nodes: DefautlAppNode[]) => set({ nodes }),
    edges: [],
    setEdges: (edges: Edge[]) => set({ edges }),
    addNode: (node: DefautlAppNode) =>
      set((state) => ({ nodes: [...state.nodes, node] })),
    deleteNode: (nodeId: string) =>
      set((state) => ({
        nodes: state.nodes.filter((node) => node.id !== nodeId),
      })),
    deleteEdge: (edgeId: string) =>
      set((state) => ({
        edges: state.edges.filter((edge) => edge.id !== edgeId),
      })),
  }),
);

export default useReactFlowStore;
