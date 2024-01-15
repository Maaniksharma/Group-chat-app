const ChatMessage = ({ message, sender, timestamp, isOwnMessage }) => {
  return (
    <div
      className={`max-w-fit mx-4 my-2 py-2 px-5 rounded-3xl ${
        isOwnMessage ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-300'
      }`}
    >
      {message}
      <div className="text-xs text-gray-300 mt-1">
        {sender} • {new Date(timestamp).toLocaleTimeString()}
      </div>
    </div>
  );
};

export default ChatMessage;
