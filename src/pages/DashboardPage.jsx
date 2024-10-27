import { useUserContext } from "../context/userContext";

const DashboardPage = () => {
  const [user, setUser] = useUserContext();
  return (
    <div>
      <h1>Hello {user.name}</h1>
    </div>
  );
};

export default DashboardPage;
