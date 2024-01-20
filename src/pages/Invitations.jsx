import { useEffect, useState } from 'react';
import PageLoader from '../components/PageLoader';
import { useAuth } from '../hooks/useAuth';
import Invitation from '../components/Invitation';
import useToast from '../hooks/useToast';
const Invitations = () => {
  const { user, invitations } = useAuth();
  const ShowToast = useToast();
  const [Loading, setLoading] = useState(false);
  const [invitationsData, setInvitationsData] = useState([]);
  const fetchInvitationData = async () => {
    setLoading(true);
    let res = await fetch(
      `${import.meta.env.VITE_SERVERURL}/user/invitationsdetails`,
      {
        method: 'post',
        headers: {
          authorization: localStorage.getItem('token'),
          'content-type': 'application/json',
        },
        body: JSON.stringify({ invitations: invitations }),
      }
    );
    res = await res.json();
    setInvitationsData(res.invitationsDetails);
    setLoading(false);
  };
  useEffect(() => {
    fetchInvitationData();
  }, []);
  const onClickJoin = (groupId) => {
    fetch(`${import.meta.env.VITE_SERVERURL}/user/joingroup`, {
      method: 'post',
      headers: {
        authorization: localStorage.getItem('token'),
        'content-type': 'application/json',
      },
      body: JSON.stringify({ groupId: groupId, userName: user.userName }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.error) {
          console.log(res.err);
          ShowToast('Error!!! Could not join the group');
        } else {
          ShowToast('Joined the group successfully');
          const temp = invitationsData.filter(
            (invitation) => invitation._id !== groupId
          );
          setInvitationsData(temp);
        }
      });
  };
  if (Loading) return <PageLoader />;

  return (
    <div className="p-6 pt-2">
      <h1 className="text-3xl font-bold mb-4 text-blue-500 text-center mt-4">
        Invitations
      </h1>
      {invitationsData.length === 0 ? (
        <p className="text-center mt-20 text-gray-800 font-semibold text-2xl">
          No invitations. You are not that popular.
        </p>
      ) : (
        <div className="w-full max-w-md flex flex-wrap items-center gap-4">
          {invitationsData.map((invitation, index) => (
            <Invitation
              key={index}
              {...invitation}
              onClickJoin={onClickJoin}
              className="mb-4"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Invitations;
