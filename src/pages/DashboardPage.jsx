import { useAuth } from "../provider/AuthProvider";

const DashboardPage = () => {
  const [token, setToken] = useAuth();

  return (
    <div>
      <h1>token is: {token}</h1>
    </div>
  );
};

export default DashboardPage;
