import Chatbot from "./Chatbot";

const AppSidebar = () => {
  return (
    <div className="mx-auto p-4 md:p-6 relative border-r border-border md:pt-16 flex h-full flex-col overflow-hidden">
      <Chatbot />
    </div>
  );
};

export default AppSidebar;
