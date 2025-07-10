import "./ChatMessageLoader.css";
function ChatMessageLoader() {
  return (
    <div className="loading-cont">
      <h1 className="loading-text">Loading</h1>
      <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
    </div>
  );
}

export default ChatMessageLoader;
