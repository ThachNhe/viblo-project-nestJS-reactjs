
import React from "react";
import { NavLink } from "react-router-dom";
const MainMenu = () => {
  return (
    <ul className="flex flex-row gap-10">
      <li>
        <NavLink
          className="font-semibold text-gray-400 hover:text-gray-950"
          to="/followings"
        >
          Bài viết
        </NavLink>
      </li>
      <li>
        <NavLink
          className="font-semibold text-gray-400 hover:text-gray-950"
          to="/questions"
        >
          Hỏi đáp
        </NavLink>
      </li>
      <li>
        <NavLink
          className="font-semibold text-gray-400 hover:text-gray-950"
          to="/discussion"
        >
          Thảo luận
        </NavLink>
      </li>
    </ul>
  );
};
export default React.memo(MainMenu);
