const Loader = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="bg-[#272727] h-[200px] rounded-2xl"></div>

          <div className="flex gap-3 mt-3">
            <div className="w-10 h-10 rounded-full bg-[#272727]"></div>

            <div className="flex-1">
              <div className="h-4 bg-[#272727] rounded w-[90%] mb-2"></div>
              <div className="h-3 bg-[#272727] rounded w-[60%]"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loader;