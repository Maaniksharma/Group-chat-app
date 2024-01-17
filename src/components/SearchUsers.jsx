import { useState } from 'react';

const SearchUsers = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page
    // Handle the search logic here
    console.log(`Searching for: ${searchTerm}`);
    onSearch(searchTerm);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center justify-center mt-2 mx-2"
    >
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search users..."
        className="flex-grow w-full px-4 py-2 mr-4 text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:bg-white ring-offset-current ring-offset-2"
      />
      <button
        type="submit"
        className="px-6 py-2 text-white transition duration-500 ease-in-out transform bg-blue-500 rounded-lg hover:bg-blue-600 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2"
      >
        Search
      </button>
    </form>
  );
};

export default SearchUsers;
