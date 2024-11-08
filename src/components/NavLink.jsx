import { Link } from "react-router-dom";

const NavLink = ({ name, to, icons }) => {
  return (
    <li>
      <Link
        to={to}
        className="hover:bg-blue-400 p-3 rounded-lg cursor-pointer transition-all duration-200 flex items-center gap-3"
      >
        {name}
      </Link>
    </li>
  );
};

export default NavLink;
