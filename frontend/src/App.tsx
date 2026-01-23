import { useCallback, useEffect } from "react";
import "./App.css";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// type imports
import type {
  OnNodesChange,
  OnEdgesChange,
  Edge,
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
import AddNode from "./components/FlowChart/UI/AddNode";

const initialNodes: DefautlAppNode[] = [
  {
    id: "n1",
    position: { x: 0, y: 0 },
    data: { label: "Node 1", handleOrientation: "horizontal" },
    type: "defaultAppNode",
  },
  {
    id: "n2",
    position: { x: 0, y: 100 },
    data: { label: "Node 2", handleOrientation: "horizontal" },
    type: "defaultAppNode",
  },
  {
    id: "n3",
    position: { x: 200, y: 100 },
    data: { label: "Node 3", handleOrientation: "horizontal" },
    type: "defaultAppNode",
  },
];
const initialEdges: Edge[] = [];

const NodeTypes = {
  defaultAppNode: DefaultNode,
};

const EdgeTypes = {
  defaultAppEdge: DefaultEdge,
};

export default function App() {
  const { nodes, edges, setNodes, setEdges } = useReactFlowStore();

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, []);

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
    <div className="w-screen h-screen">
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
      >
        <Background />
        <Panel position="bottom-right">
          <AddNode />
        </Panel>
      </ReactFlow>
    </div>
  );
}
