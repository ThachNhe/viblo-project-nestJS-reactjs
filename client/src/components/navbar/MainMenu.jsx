
import { NavLink, Route } from 'react-router-dom'
const MainMenu = () => {
  return (
    <nav className="flex flex-row gap-10">
      <NavLink className="font-semibold text-gray-400 hover:text-gray-950" to="/newest">Bài viết</NavLink>
      <NavLink className="font-semibold text-gray-400 hover:text-gray-950" to="/questions">Hỏi đáp</NavLink>
      <NavLink className="font-semibold text-gray-400 hover:text-gray-950" to= "/discussion">Thảo luận</NavLink>
    </nav>
  );
};
export default MainMenu;
