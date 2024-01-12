import { useState } from 'react';
import Modal from 'react-modal';

const CreateGroupModal = ({ isOpen, onRequestClose, onCreateGroup }) => {
  const [groupName, setGroupName] = useState('');

  const handleCreateGroup = () => {
    onCreateGroup(groupName);
    setGroupName('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="m-auto p-4 w-1/2 bg-white rounded shadow"
    >
      <h2 className="text-2xl mb-4">Create Group</h2>
      <input
        type="text"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        className="border p-2 w-full mb-4"
        placeholder="Group Name"
      />
      <button
        onClick={handleCreateGroup}
        className="bg-blue-500 text-white p-2 rounded w-full"
      >
        Create
      </button>
    </Modal>
  );
};

export default CreateGroupModal;
