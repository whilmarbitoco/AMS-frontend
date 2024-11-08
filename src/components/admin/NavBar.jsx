import NavLink from "../NavLink";

const NavBar = () => {
  return (
    <ul className="">
      <NavLink name="Dashboard" to="/admin/dashboard" />
      <NavLink name="Students" to="/admin/students" />
      <NavLink name="Teachers" to="/admin/teacher" />
    </ul>
  );
};

export default NavBar;
