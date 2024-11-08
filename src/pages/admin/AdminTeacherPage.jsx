import { useAtom } from "jotai";
import AdminWrapper from "../../components/AdminWrapper";
import { apiStore } from "../../store/apiStore";
import { useAuth } from "../../provider/AuthProvider";
import { useEffect, useState } from "react";
import TeacherTable from "../../components/TeacherTable";

const AdminTeacherPage = () => {
  const [api, setApi] = useAtom(apiStore);
  const [token, setToken] = useAuth();
  const [teachers, setTeachers] = useState([]);

  const fetchData = async () => {
    const res = await fetch(`${api}/teacher`, {
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
    setTeachers(resData);
    console.log(resData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AdminWrapper page="Teachers">
      <div className="m-5 p-3 bg-white rounded-lg">
        <TeacherTable data={teachers} />
      </div>
    </AdminWrapper>
  );
};

export default AdminTeacherPage;
