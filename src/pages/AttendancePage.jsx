import TeacherWrapper from "../components/TeacherWrapper";
import ClassTable from "../components/ClassTable";
import { useAuth } from "../provider/AuthProvider";
import { apiStore } from "../store/apiStore";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const AttendancePage = () => {
  const [token, setToken] = useAuth();
  const [api, setApi] = useAtom(apiStore);
  const [classes, setClasses] = useState([]);

  const fetchData = async () => {
    const res = await fetch(`${api}/class/current`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
    });

    const resData = await res.json();
    if (!res.ok) {
      toast.error(resData.message);
      return;
    }

    setClasses(resData);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <TeacherWrapper page="Attendance">
      <div className="m-5 p-5 bg-white rounded-lg">
        <ClassTable data={classes} attendance={true} />
      </div>
    </TeacherWrapper>
  );
};

export default AttendancePage;
