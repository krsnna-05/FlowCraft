import { Workflow } from "lucide-react";
import React from "react";

const AppSidebar = () => {
  return (
    <div className=" h-full w-full md:w-60 lg:w-96 border-r border-border">
      {/* Header */}
      <div className="flex items-center justify-center gap-2 border-b border-border p-3">
        <h1 className="text-2xl font-bold flex justify-center items-center gap-2 w-full">
          <Workflow className="w-6 h-6" />
          <span>FlowCraft</span>
        </h1>
      </div>
    </div>
  );
};

export default AppSidebar;
