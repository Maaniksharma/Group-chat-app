import { useState } from 'react';
import BlueButton from './BlueButton';

const GroupChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    onSendMessage(message);
    setMessage('');
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-0 p-4 bg-gray-200 border-t border-gray-300">
      <div className="flex items-center">
        <input
          type="text"
          className="flex-grow mr-4 p-2 border border-gray-300 rounded"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <BlueButton text="Send" handler={handleSend} />
      </div>
    </div>
  );
};

export default GroupChatInput;
