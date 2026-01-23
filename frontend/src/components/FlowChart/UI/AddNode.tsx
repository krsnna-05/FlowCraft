import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowRight } from "lucide-react";
import useReactFlowStore from "@/store/ReactFlowStore";

const AddNode = () => {
  const { addNode } = useReactFlowStore();

  const addVerticalNode = () => {
    const newNode = {
      id: `node-${Date.now()}`,
      position: { x: 0, y: 0 },
      data: {
        label: `Node`,
        handleOrientation: "vertical" as const,
      },
      type: "defaultAppNode",
    };
    addNode(newNode);
  };

  const addHorizontalNode = () => {
    const newNode = {
      id: `node-${Date.now()}`,
      position: { x: Math.random(), y: 0 },
      data: {
        label: `Node`,
        handleOrientation: "horizontal" as const,
      },
      type: "defaultAppNode",
    };
    addNode(newNode);
  };

  return (
    <div className="flex gap-2">
      <Button onClick={addVerticalNode} className="gap-2">
        <ArrowDown size={18} />
        Add Vertical Node
      </Button>
      <Button onClick={addHorizontalNode} className="gap-2">
        <ArrowRight size={18} />
        Add Horizontal Node
      </Button>
    </div>
  );
};

export default AddNode;
