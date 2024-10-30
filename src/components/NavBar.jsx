import NavLink from "../components/NavLink";

const NavBar = () => {
  return (
    <ul className="">
      <NavLink name="Dashboard" to="/dashboard" />
      <NavLink name="Students" to="/dashboard/student" />
      <NavLink name="Classes" to={null} />
      <NavLink name="Attendance" to={null} />
    </ul>
  );
};

export default NavBar;
