import NavLink from "../components/NavLink";

const NavBar = () => {
  return (
    <ul className="">
      <NavLink name="Dashboard" to="/" />
      <NavLink name="Students" to={null} />
      <NavLink name="Classes" to={null} />
      <NavLink name="Attendance" to={null} />
    </ul>
  );
};

export default NavBar;
