import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import formatDate from '../api/DateFormatter';
const Group = ({ groupName, messages, _id }) => {
  const message0 = messages[0];
  const { setGroupData } = useAuth();
  const navigate = useNavigate();
  return (
    <div
      className="bg-white hover:bg-gray-200 shadow-md rounded-lg p-4 w-full mb-4 cursor-pointer"
      onClick={() => {
        setGroupData({ groupName, _id });
        navigate('/groupchat');
      }}
    >
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">{groupName}</div>
        <div className="text-gray-500 text-sm">
          {formatDate(new Date(message0.at))}
        </div>
      </div>
      <div className="text-gray-400 text-sm mt-2">{message0.message}</div>
    </div>
  );
};

export default Group;
