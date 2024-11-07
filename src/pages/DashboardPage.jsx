import { userStore } from "../store/userStore";
import { useAtom } from "jotai";
import TeacherWrapper from "../components/TeacherWrapper";
import ClassTable from "../components/ClassTable";
import { useEffect, useState } from "react";
import { apiStore } from "../store/apiStore";
import { useAuth } from "../provider/AuthProvider";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";

const DashboardPage = () => {
  const [user, setUser] = useAtom(userStore);
  const [classes, setClasses] = useState([]);
  const [api, setApi] = useAtom(apiStore);
  const [token, setToken] = useAuth();
  const [size, setSize] = useState(0);

  const fetchClass = async () => {
    const res = await fetch(`${api}/class/current`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
    });

    if (!res.ok) {
      console.log("Error: " + JSON.stringify(res));
      return;
    }
    const resData = await res.json();
    setClasses(resData.slice(0, 3));
    setSize(resData.length);
  };

  useEffect(() => {
    fetchClass();
  }, []);

  return (
    <TeacherWrapper page="Dashboard">
      <div>
        <div className="m-5 w-96 pl-2 h-20 bg-blue-400 rounded-lg shadow-md">
          <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
            <div className="my-auto">
              <p className="font-bold text-lg">Classes</p>
              <p className="text-lg">{size}</p>
            </div>
            <FaChalkboardTeacher className="text-4xl text-blue-400 my-auto" />
          </div>
        </div>
        <div className="m-5 p-3 flex flex-col gap-2 bg-white rounded-lg">
          <div className="w-full">
            <h2 className="m-3 text-xl font-bold">Recent Classes</h2>
            <ClassTable data={classes} />
          </div>
        </div>
      </div>
    </TeacherWrapper>
  );
};

export default DashboardPage;
