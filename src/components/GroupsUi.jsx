/* eslint-disable react/prop-types */
import Group from './Group';
const GroupsUi = ({ groups }) => {
  if (groups.length === 0)
    return (
      <div className="flex flex-col items-center gap-2 mt-20">
        <div className="text-2xl font-bold">No groups found</div>
        <div className="text-gray-500">Create a group to start chatting</div>
      </div>
    );
  return (
    <div className="flex flex-col items-center gap-2">
      {groups.map((group) => (
        <Group key={group._id} {...group} />
      ))}
    </div>
  );
};
export default GroupsUi;
