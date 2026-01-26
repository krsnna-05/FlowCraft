import { useCallback } from "react";
import "./App.css";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// type imports
import type {
  OnNodesChange,
  OnEdgesChange,
  Connection,
  OnConnect,
  EdgeChange,
  NodeChange,
} from "@xyflow/react";

//custom node imports
import { DefaultNode } from "@/components/FlowChart/DefaultNode";
import type { DefautlAppNode } from "./store/ReactFlowStore";

import useReactFlowStore from "./store/ReactFlowStore";
import { ConnectionLineComponent } from "./components/FlowChart/ConnectionLine";
import { DefaultEdge } from "./components/FlowChart/DefaultEdge";
import Layout from "./pages/Create/Layout";
import { FlowControls } from "./components/FlowChart/FlowControls";
import { DragGhost } from "./store/DragStore";

const NodeTypes = {
  defaultAppNode: DefaultNode,
};

const EdgeTypes = {
  defaultAppEdge: DefaultEdge,
};

export default function App() {
  const { nodes, edges, setNodes, setEdges } = useReactFlowStore();

  const onNodesChange: OnNodesChange<DefautlAppNode> = useCallback(
    (changes: NodeChange[]) =>
      setNodes(applyNodeChanges(changes, nodes) as DefautlAppNode[]),
    [nodes, setNodes],
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges(applyEdgeChanges(changes, edges)),
    [edges, setEdges],
  );

  const onConnect: OnConnect = useCallback(
    (params: Connection) =>
      setEdges(addEdge({ ...params, type: "defaultAppEdge" }, edges)),
    [edges, setEdges],
  );

  return (
    <div className="w-full h-full">
      {/* DragGhost rendered here so it survives sidebar unmount */}
      <DragGhost />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={NodeTypes}
        edgeTypes={EdgeTypes}
        connectionLineComponent={ConnectionLineComponent}
        fitView
        className="w-full h-full"
      >
        <Layout>
          <div className="relative w-full h-full">
            <FlowControls />
            <Background />
          </div>
        </Layout>
      </ReactFlow>
    </div>
  );
}
