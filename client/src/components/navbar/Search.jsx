const Search = () => {
  return (
    <div className="flex items-center max-w-sm ">
      <div className="flex flex-row w-300 border-none ">
        <input
          type="text"
          id="simple-search"
          className="bg-gray-50 border border-gray-300 px-10"
          placeholder="Tìm kiếm trên Viblo..."
          required
        />
        <button
          type="submit"
          className="p-2.5  text-sm font-medium text-white bg-blue-700  border-none hover:bg-blue-800 focus:ring-4 out-line-none
           focus:ring-blue-300 "
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </div>
    </div>
  );
};

export default Search;
