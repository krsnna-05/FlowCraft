import { useCallback, useState } from "react";
import "./App.css";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  Controls,
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
import { DefaultNode } from "@/components/FlowChart/UI/DefaultNode";
import type { DefautlAppNode } from "./store/ReactFlowStore";

import useReactFlowStore from "./store/ReactFlowStore";
import { ConnectionLineComponent } from "./components/FlowChart/UI/ConnectionLine";
import { DefaultEdge } from "./components/FlowChart/UI/DefaultEdge";
import AppSidebar from "./components/FlowChart/Sidebar/AppSidebar";
import ContextMenu from "./components/FlowChart/UI/ContextMenu";
import TopBar from "./components/FlowChart/UI/TopBar";

const NodeTypes = {
  defaultAppNode: DefaultNode,
};

const EdgeTypes = {
  defaultAppEdge: DefaultEdge,
};

export default function App() {
  const { nodes, edges, setNodes, setEdges, mobileView } = useReactFlowStore();
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);

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

  const onPaneContextMenu = useCallback(
    (event: React.MouseEvent | MouseEvent) => {
      event.preventDefault();
      setContextMenu({
        x: event.clientX,
        y: event.clientY,
      });
    },
    [],
  );

  return (
    <div className="w-screen h-screen flex flex-col">
      <TopBar />
      <div className="flex flex-1 relative">
        {/* Sidebar - hidden on mobile unless mobileView is "sidebar" */}
        <div
          className={`${mobileView === "sidebar" ? "block" : "hidden"} md:block w-full md:w-96`}
        >
          <AppSidebar />
        </div>

        {/* Canvas - hidden on mobile unless mobileView is "canvas" */}
        <div
          className={`${mobileView === "canvas" ? "block" : "hidden"} md:block flex-1`}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onPaneContextMenu={onPaneContextMenu}
            nodeTypes={NodeTypes}
            edgeTypes={EdgeTypes}
            connectionLineComponent={ConnectionLineComponent}
            fitView
            className="w-full h-full flex"
          >
            <Controls
              showFitView={true}
              showInteractive={false}
              className="bottom-18! md:bottom-0"
            ></Controls>
            <Background />
          </ReactFlow>
          <ContextMenu
            contextMenu={contextMenu}
            setContextMenu={setContextMenu}
          />
        </div>
      </div>
    </div>
  );
}
