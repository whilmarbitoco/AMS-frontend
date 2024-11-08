import { useEffect, useState } from "react";
import AdminWrapper from "../../components/AdminWrapper";
import { useAtom } from "jotai";
import { apiStore } from "../../store/apiStore";
import TeacherTable from "../../components/TeacherTable";

const AdminDashboardPage = () => {
  const [api, _] = useAtom(apiStore);

  const [tCount, setTcount] = useState(0);
  const [sCount, setScount] = useState(0);
  const [teachers, setTeach] = useState([]);

  const fetchTeach = async () => {
    const res = await fetch(`${api}/teacher`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resData = await res.json();

    if (!res.ok) {
      console.log(resData.message);
      return;
    }

    setTcount(resData.length);
    setTeach(resData.slice(0, 3));
  };

  const fetchStuds = async () => {
    const res = await fetch(`${api}/student`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resData = await res.json();

    if (!res.ok) {
      console.log(resData.message);
      return;
    }

    setScount(resData.length);
  };

  useEffect(() => {
    fetchStuds();
    fetchTeach();
  }, []);

  return (
    <AdminWrapper page="Dashboard">
      <div className="m-5 p-3 flex gap-4">
        <div className="pl-2 w-72 bg-blue-600 rounded-lg shadow-md ">
          <div className="w-full h-full p-5 py-auto bg-white rounded-lg">
            <h1 className="font-bold text-3xl text-gray-700">Teachers</h1>
            <p className="text-xl">{tCount}</p>
          </div>
        </div>
        <div className="pl-2 w-72 bg-green-600 rounded-lg shadow-md ">
          <div className="w-full h-full p-5 py-auto bg-white rounded-lg">
            <h1 className="font-bold text-3xl text-gray-700">Students</h1>
            <p className="text-xl">{sCount}</p>
          </div>
        </div>
      </div>

      <div className="m-5 p-3 bg-white rounded-lg">
        <h1 className="text-xl font-bold">Recent Teachers</h1>
        <TeacherTable data={teachers} />
      </div>
    </AdminWrapper>
  );
};

export default AdminDashboardPage;
