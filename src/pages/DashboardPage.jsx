import { userStore } from "../store/userStore";
import { useAtom } from "jotai";

const DashboardPage = () => {
  const [user, setUser] = useAtom(userStore);

  return (
    <div>
      <h1>Hello {user.name}</h1>
    </div>
  );
};

export default DashboardPage;
