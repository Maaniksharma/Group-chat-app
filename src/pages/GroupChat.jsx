import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import GroupChatInput from '../components/GroupChatInput';
import ChatMessage from '../components/ChatMessage';
import PageLoader from '../components/PageLoader';
import { socket } from '../socket';
import { useAuth } from '../hooks/useAuth';
import fetchMessages from '../api/fetchMessages';
import Shimmers from '../components/Shimmers';
const GroupChat = () => {
  const { groupData } = useAuth();
  const localStorageMessages = JSON.parse(
    localStorage.getItem(`${groupData._id}`)
  );
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState(localStorageMessages || []);
  const messagesRef = useRef(localStorageMessages);
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [page, setPage] = useState(1);
  const [showShimmers, setShowShimmers] = useState(false);
  const observer = useRef();
  const topRef = useRef(null);
  const initMessages = async () => {
    setLoading(true);
    let response = await fetchMessages(groupData._id, 1);
    response = response.reverse();
    console.log(response);
    setMessages(response);
    messagesRef.current = response;
    localStorage.setItem(`${groupData._id}`, JSON.stringify(response));
    setLoading(false);
  };
  const AddMessages = async () => {
    console.log('add messages');
    const nextPage = page + 1;
    setPage(nextPage);
    const res = await fetchMessages(groupData._id, nextPage);
    setMessages((prev) => [...res, ...prev]);
    messagesRef.current = [...res, ...messagesRef.current];
    localStorage.setItem(
      `${groupData._id}`,
      JSON.stringify(messagesRef.current)
    );
  };
  useEffect(() => {
    if (!localStorageMessages) {
      initMessages();
    }
  }, []);
  useEffect(() => {
    const currentObserver = observer.current;
    if (currentObserver) currentObserver.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setShowShimmers(true);
        AddMessages();
      }
    });

    if (topRef.current) observer.current.observe(topRef.current);

    return () => observer.current.disconnect();
  }, [page]);

  useEffect(() => {
    socket.connect('connect', () => {
      console.log('connected to server');
    });
    socket.on('message', (incomingMessage) => {
      console.log(incomingMessage);
      const updatedMessages = [...messagesRef.current, incomingMessage];
      messagesRef.current = updatedMessages;
      setMessages(updatedMessages);
      localStorage.setItem(`${groupData._id}`, JSON.stringify(updatedMessages));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Add messages as a dependency
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleSendMessage = (message) => {
    console.log('emitted');
    socket.emit('sendMessage', {
      token: localStorage.getItem('token'),
      message,
      groupId: groupData._id,
    });
  };

  if (loading) return <PageLoader />;

  return (
    <div className="flex flex-col h-full">
      <div className="p-4  text-blue-500 flex justify-between items-center">
        <button onClick={() => navigate('/')} className="">
          <i className="fas fa-arrow-left"></i>
        </button>
        <h1 className="text-3xl font-semibold ">{groupData.groupName}</h1>
        <Link to="/sendinvitations">
          <div className="fas fa-user-plus cursor-pointer" />
        </Link>
      </div>
      <div className="flex-grow overflow-y-auto ">
        <div ref={topRef} />
        {/* {showShimmers && <Shimmers />} */}
        {messages.map((item, index) => (
          <ChatMessage
            key={index}
            message={item.message}
            sender={item.senderName}
            timestamp={item.at}
            isOwnMessage={true}
          />
        ))}
        <div ref={messagesEndRef} className="h-20" />
      </div>
      <GroupChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default GroupChat;
