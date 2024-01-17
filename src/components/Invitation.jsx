const Invitation = ({ _id, groupName, createdBy, createdAt, onClickJoin }) => {
  const date = new Date(createdAt).toLocaleString();

  return (
    <div className="flex  items-center justify-between p-4 bg-white shadow rounded-lg mb-4 w-full">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">{groupName}</h2>
        <p className="text-sm text-gray-500">Created by: {createdBy}</p>
        <p className="text-sm text-gray-500">Created at: {date}</p>
      </div>
      <button
        onClick={() => onClickJoin(_id)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Join Now
      </button>
    </div>
  );
};

export default Invitation;
