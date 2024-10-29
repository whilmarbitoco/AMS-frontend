import { Link } from "react-router-dom";

const NavLink = ({ name, to }) => {
  return (
    <li className="hover:bg-blue-400 p-3 rounded-lg cursor-pointer transition-all duration-200 flex items-center gap-3">
      <Link to={to}>{name}</Link>
    </li>
  );
};

export default NavLink;
