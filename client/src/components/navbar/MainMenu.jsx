
import React from "react";
const MainMenu = () => {
  return (
    <ul className="flex flex-row gap-10">
      <li>
        <a
          className="font-semibold text-gray-400 hover:text-gray-950"
          href="/followings"
        >
          Bài viết
        </a>
      </li>
      <li>
        <a
          className="font-semibold text-gray-400 hover:text-gray-950"
          href="#questions"
        >
          Hỏi đáp
        </a>
      </li>
      <li>
        <a
          className="font-semibold text-gray-400 hover:text-gray-950"
          href="#discussion"
        >
          Thảo luận
        </a>
      </li>
    </ul>
  );
};
export default React.memo(MainMenu);
