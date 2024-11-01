import { useEffect, useState } from "react";
import AdminWrapper from "../../components/AdminWrapper";
import StudentTable from "../../components/StudentTable";
import { useAtom } from "jotai";
import { apiStore } from "../../store/apiStore";
import Button from "../../components/Button";
import CreateStudent from "../../components/admin/CreateStudent";

const AdminStudent = () => {
  const [students, setStudents] = useState([]);
  const [api, setApi] = useAtom(apiStore);
  const [showCreate, setShowCreate] = useState(false);

  const toggle = () => {
    setShowCreate(!showCreate);
  };

  const fetchData = async () => {
    const res = await fetch(`${api}/student`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.log("Error: " + JSON.stringify(res));
      return;
    }
    const resData = await res.json();
    console.log(resData);

    setStudents(resData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AdminWrapper page="Students">
      <div className="p-5 m-5 bg-white rounded-lg">
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-3">
            <Button name="Add Student" onClick={toggle} />
            <input
              type="text"
              placeholder="Search..."
              className="px-4 mt-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <StudentTable data={students} />
        {showCreate && <CreateStudent toggle={toggle} update={fetchData} />}
      </div>
    </AdminWrapper>
  );
};

export default AdminStudent;
