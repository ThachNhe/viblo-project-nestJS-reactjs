import React from "react";
import { NavLink } from "react-router-dom";
const MainMenu = () => {
  return (
    <ul className="flex flex-row gap-10">
      <li className="font-semibold text-neutral-500 hover:text-gray-950">
        <NavLink
          to="/followings"
          className={({ isActive }) => (isActive ? "text-gray-700" : "")}
        >
          Bài viết
        </NavLink>
      </li>

      <li className="font-semibold text-neutral-500 hover:text-gray-950">
        <NavLink
          to="/questions"
          className={({ isActive }) => (isActive ? "text-gray-700" : "")}
        >
          Hỏi đáp
        </NavLink>
      </li>

      <li className="font-semibold text-neutral-500 hover:text-gray-950">
        <NavLink
          to="/discussion"
          className={({ isActive }) => (isActive ? "text-gray-700" : "")}
        >
          Thảo luận
        </NavLink>
      </li>
    </ul>
  );
};
export default React.memo(MainMenu);
