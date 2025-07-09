import "./ChatMessageLoader.css";
function ChatMessageLoader() {
  return (
    <div className="flex items-center">
      <h1 className="text-sm font-semibold text-[#0D4A84]">Loading</h1>
      <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
    </div>
  );
}

export default ChatMessageLoader;
