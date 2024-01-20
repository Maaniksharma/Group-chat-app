import { useState } from 'react';
import BlueButton from './BlueButton';
import useToast from '../hooks/useToast';
const GroupChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const ShowToast = useToast();
  const handleSend = (e) => {
    e.preventDefault();
    if (message === '') {
      ShowToast('Please type a message');
      return;
    }
    onSendMessage(message);
    setMessage('');
  };

  return (
    <div className="fixed inset-x-0 bottom-0 p-4 bg-gray-200 border-t border-gray-300">
      <form onSubmit={handleSend} className="flex items-center">
        <input
          type="text"
          className="flex-grow mr-4 p-2 border border-gray-300 rounded"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <BlueButton text="Send" handler={handleSend} />
      </form>
    </div>
  );
};

export default GroupChatInput;
