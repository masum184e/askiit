const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center space-x-2 mt-2 ml-2">
        <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce"></div>
        <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce delay-150"></div>
        <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce delay-300"></div>
      </div>
    </div>
  );
};

export default Loading;
