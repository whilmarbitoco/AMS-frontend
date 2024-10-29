import { userStore } from "../store/userStore";
import { useAtom } from "jotai";
import TeacherWrapper from "../components/TeacherWrapper";

const DashboardPage = () => {
  const [user, setUser] = useAtom(userStore);

  return <TeacherWrapper page="Dashboard">hello world</TeacherWrapper>;
};

export default DashboardPage;
