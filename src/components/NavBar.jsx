import NavLink from "../components/NavLink";

const NavBar = () => {
  return (
    <ul className="">
      <NavLink name="Dashboard" to="/dashboard" />
      <NavLink name="Classes" to="/dashboard/class" />
      <NavLink name="Attendance" to={null} />
    </ul>
  );
};

export default NavBar;
