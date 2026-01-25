import { useCallback } from "react";
import "./App.css";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  Controls,
  ControlButton,
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
import useSidebarStore from "./store/SidebarStore";
import { ConnectionLineComponent } from "./components/FlowChart/ConnectionLine";
import { DefaultEdge } from "./components/FlowChart/DefaultEdge";
import Layout from "./pages/Create/Layout";
import { MenuIcon } from "lucide-react";

const NodeTypes = {
  defaultAppNode: DefaultNode,
};

const EdgeTypes = {
  defaultAppEdge: DefaultEdge,
};

export default function App() {
  const { nodes, edges, setNodes, setEdges } = useReactFlowStore();
  const { toggleSidebar } = useSidebarStore();

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

  const handleToggleSidebar = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      toggleSidebar();
    },
    [toggleSidebar],
  );

  return (
    <div className="w-screen h-dvh">
      <Layout>
        <div className="relative w-full h-full">
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
            <Controls
              className="bottom-20! left-2! right-auto! md:bottom-3! md:left-3! [&>button]:pointer-events-auto z-50"
              showFitView={false}
              showInteractive={false}
            >
              <ControlButton
                onClick={handleToggleSidebar}
                onTouchStart={handleToggleSidebar as any}
                title="Toggle Sidebar"
                style={{ pointerEvents: "auto" }}
              >
                <MenuIcon className="w-4 h-4" />
              </ControlButton>
            </Controls>
            <Background />
          </ReactFlow>
        </div>
      </Layout>
    </div>
  );
}
