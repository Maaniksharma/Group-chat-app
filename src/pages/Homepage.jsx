import { useState } from 'react';
import Groups from '../components/Groups';
import BlueButton from '../components/BlueButton';
const HomePage = () => {
  const [isModalopen, setIsModalOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="  text-blue-600 p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Your Groups</h1>
        <BlueButton text={'Create Group'} />
      </header>
      <main className="flex-grow">
        <Groups />
      </main>
    </div>
  );
};

export default HomePage;
