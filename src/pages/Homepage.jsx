import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Groups from '../components/Groups';
import BlueButton from '../components/BlueButton';
import CreateGroupModal from '../components/CreateGroupModal';
import { useAuth } from '../hooks/useAuth';
import useToast from '../hooks/useToast';

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addGroup, invitationsCount } = useAuth();
  const showToast = useToast();
  const handleCreateGroup = async (groupName) => {
    const message = await addGroup(groupName);
    if (message === 'Group already exists') {
      showToast('Sorry!!!  Group already exists');
    } else if (message === 'success') {
      showToast('Group Created successfully');
    }
    setIsModalOpen(false);
  };
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <header className="text-blue-600 p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Your Groups</h1>
          <div className="flex items-center gap-4">
            <BlueButton
              text={'Create Group'}
              handler={() => setIsModalOpen(true)}
            />
            <BlueButton
              text={`Invitations ${invitationsCount}`}
              handler={() => navigate('/invitations')}
            />
          </div>
        </header>
        <main className="flex-grow">
          <Groups />
        </main>
      </div>
      <CreateGroupModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onCreateGroup={handleCreateGroup}
      />
    </>
  );
};

export default HomePage;
