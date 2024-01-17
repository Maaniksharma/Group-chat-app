const Shimmers = () => {
  return (
    <div className="flex flex-col items-start space-y-2">
      <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
      <div className="h-4 bg-gray-300 rounded w-2/4 animate-pulse"></div>
      <div className="h-4 bg-gray-300 rounded w-1/4 animate-pulse"></div>
    </div>
  );
};

export default Shimmers;
