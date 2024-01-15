import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GroupChatInput from '../components/GroupChatInput';
import ChatMessage from '../components/ChatMessage';
import { socket } from '../socket';
import { useAuth } from '../hooks/useAuth';
const GroupChat = () => {
  const { groupData } = useAuth();
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(groupData);
    socket.connect('connect', () => {
      console.log('connected to server');
    });
    socket.on('message', (incomingMessage) => {
      console.log(incomingMessage);
      setMessages((prevMessages) => [...prevMessages, incomingMessage]);
      console.log(messages);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = (message) => {
    console.log('emitted');
    socket.emit('sendMessage', {
      token: localStorage.getItem('token'),
      message,
      groupId: groupData._id,
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4  text-blue-500 flex justify-between items-center">
        <button onClick={() => navigate('/')} className="">
          <i className="fas fa-arrow-left"></i>
        </button>
        <h1 className="text-3xl font-semibold ">{groupData.groupName}</h1>
        <div className=""></div>
      </div>
      <div className="flex-grow overflow-y-auto">
        {messages.map((item, index) => (
          <ChatMessage
            key={index}
            message={item.message}
            sender={item.senderName}
            timestamp={item.timestamp}
            isOwnMessage={true}
          />
        ))}
      </div>
      <GroupChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default GroupChat;
