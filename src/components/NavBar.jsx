import NavLink from "../components/NavLink";

const NavBar = () => {
  return (
    <ul className="">
      <NavLink name="Dashboard" to="/dashboard" />
      <NavLink name="Classes" to="/dashboard/classes" />
      <NavLink name="Attendance" to="/dashboard/attendance" />
    </ul>
  );
};

export default NavBar;
