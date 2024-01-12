const Group = ({ name, lastMessage, at }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full mb-4">
      <div className="flex justify-between items-center">
        <div className="text-gray-500 text-sm">
          {new Date(at).toLocaleTimeString()}
        </div>
        <div className="text-xl font-bold">{name}</div>
      </div>
      <div className="text-gray-400 text-sm mt-2">{lastMessage}</div>
    </div>
  );
};

export default Group;
