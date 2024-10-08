function ChatBox({ isOpen, handlerCloseChatBox }) {
  return (
    <>
      {isOpen && (
        <div
          className={`fixed bottom-10 right-8 w-80 h-96 bg-white rounded-lg shadow-lg flex flex-col border 
                      transition-all duration-300 ease-in-out 
                      ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Header của cục chat */}
          <div className="flex items-center justify-between p-2 bg-primary text-white rounded-t-lg">
            <span>Đình Nhiệt</span>
            <button onClick={handlerCloseChatBox}>
              <svg
                fill="#000000"
                height={15}
                width={15}
                viewBox="0 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-current hover:text-neutral-200 duration-300"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <title>cancel</title>
                  <path d="M10.771 8.518c-1.144 0.215-2.83 2.171-2.086 2.915l4.573 4.571-4.573 4.571c-0.915 0.915 1.829 3.656 2.744 2.742l4.573-4.571 4.573 4.571c0.915 0.915 3.658-1.829 2.744-2.742l-4.573-4.571 4.573-4.571c0.915-0.915-1.829-3.656-2.744-2.742l-4.573 4.571-4.573-4.571c-0.173-0.171-0.394-0.223-0.657-0.173v0zM16 1c-8.285 0-15 6.716-15 15s6.715 15 15 15 15-6.716 15-15-6.715-15-15-15zM16 4.75c6.213 0 11.25 5.037 11.25 11.25s-5.037 11.25-11.25 11.25-11.25-5.037-11.25-11.25c0.001-6.213 5.037-11.25 11.25-11.25z"></path>
                </g>
              </svg>
            </button>
          </div>

          {/* Nội dung chat */}
          <div className="flex-1 p-2 overflow-y-auto">
            {/* Đoạn chat mẫu */}
            <div className="flex items-start mb-2">
              <img
                src="https://via.placeholder.com/32"
                alt="User"
                className="w-8 h-8 rounded-full mr-2"
              />
              <div className="bg-gray-200 p-2 rounded-lg">Hello chào cậu</div>
            </div>
            <div className="flex items-center justify-end mb-2">
              <div className="bg-blue-500 text-white p-2 rounded-lg">Hic</div>
            </div>
            {/* Thêm các đoạn chat khác tương tự */}
          </div>

          {/* Ô nhập chat */}
          <div className="p-2 border-t border-gray-200 flex">
            <input
              type="text"
              placeholder="Aa"
              className="w-full px-2 py-1 rounded-lg border border-gray-300"
            />
            <button className=" ml-1 px-2 bg-primary rounded-md text-gray-100">
              Gửi
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBox;
