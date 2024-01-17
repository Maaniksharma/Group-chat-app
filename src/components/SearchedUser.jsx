const SearchedUser = ({ _id, userName, onClickInvite }) => {
  return (
    <div className="flex items-center justify-between p-4 px-8 bg-white shadow-lg rounded-lg">
      <div className="flex items-center gap-3">
        <div className="fas fa-user text-gray-600"></div>
        <span className="text-lg font-semibold">{userName}</span>
      </div>
      <button
        onClick={() => onClickInvite(_id)}
        className="flex items-center gap-2"
      >
        <span className="text-sm font-semibold text-blue-500">Invite</span>
        <div className="fas fa-plus text-blue-500" />
      </button>
    </div>
  );
};
export default SearchedUser;
