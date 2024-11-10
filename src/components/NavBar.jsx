import NavLink from "../components/NavLink";
import { MdSpaceDashboard } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { FaAddressBook } from "react-icons/fa";

const NavBar = () => {
  return (
    <ul className="fixed lg:relative w-[50%] lg:w-full h-screen z-40 bg-blue-600 flex flex-col px-4">
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
