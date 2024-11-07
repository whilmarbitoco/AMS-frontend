import NavLink from "../components/NavLink";
import { MdSpaceDashboard } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { FaAddressBook } from "react-icons/fa";

const NavBar = () => {
  return (
    <ul className="">
      <NavLink
        name="Dashboard"
        icons={<MdSpaceDashboard className="text-2xl" />}
        to="/dashboard"
      />

      <NavLink
        name="Classes"
        icons={<SiGoogleclassroom className="text-2xl" />}
        to="/dashboard/classes"
      />
      <NavLink
        name="Attendance"
        icons={<FaAddressBook className="text-2xl" />}
        to="/dashboard/attendance"
      />
    </ul>
  );
};

export default NavBar;
