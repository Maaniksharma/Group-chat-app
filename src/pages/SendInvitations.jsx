import SearchUsers from '../components/SearchUsers';
import SearchedUser from '../components/SearchedUser';
import { useState } from 'react';
import useToast from '../hooks/useToast';
import { useAuth } from '../hooks/useAuth';
const SendInvitations = () => {
  const ShowToast = useToast();
  const [searchedUsers, setSearchedUsers] = useState([]);
  const { groupData, user } = useAuth();
  const onSearch = async (searchTerm) => {
    const response = await fetch(
      `${
        import.meta.env.VITE_SERVERURL
      }/user/searchusers?searchTerm=${searchTerm}`,
      {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      }
    );
    const res = await response.json();
    if (res.error) {
      ShowToast("Couldn't search users");
      return;
    }
    setSearchedUsers(res);
  };
  const onSendInvite = async (id) => {
    if (user.id === id) {
      ShowToast('You cannot invite yourself');
      return;
    }
    console.log('Invite sent');
    const response = await fetch(
      `${import.meta.env.VITE_SERVERURL}/user/sendinvite`,
      {
        method: 'post',
        headers: {
          authorization: localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: id, groupId: groupData._id }),
      }
    );
    const res = await response.json();
    if (res.error) {
      if (res.error === 1) {
        ShowToast('Error!! User Already invited');
        return;
      }
      ShowToast('Error sending invite');
      return;
    }
    ShowToast('Invite sent Successfully');
  };
  return (
    <div className="">
      <SearchUsers onSearch={onSearch} />
      {searchedUsers &&
        searchedUsers.map((user) => (
          <SearchedUser key={user._id} {...user} onClickInvite={onSendInvite} />
        ))}
    </div>
  );
};
export default SendInvitations;
