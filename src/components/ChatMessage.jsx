import { useAuth } from '../hooks/useAuth';

const ChatMessage = ({ message, sender, timestamp, isOwnMessage }) => {
  const { user } = useAuth();
  const userName = user.userName;
  const isOwn = sender === userName;
  return (
    <div
      className={`max-w-fit mx-4 my-2 py-2 px-5 rounded-3xl ${
        isOwn ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-300'
      }`}
    >
      {message}
      <div
        className={`text-xs  mt-1 ${isOwn ? 'text-gray-300' : 'text-gray-600'}`}
      >
        {sender} • {new Date(timestamp).toLocaleTimeString()}
      </div>
    </div>
  );
};

export default ChatMessage;
