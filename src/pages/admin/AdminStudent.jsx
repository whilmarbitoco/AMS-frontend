import { useEffect, useState } from "react";
import AdminWrapper from "../../components/AdminWrapper";
import StudentTable from "../../components/StudentTable";
import { useAtom } from "jotai";
import { apiStore } from "../../store/apiStore";
import Button from "../../components/Button";
import CreateStudent from "../../components/admin/CreateStudent";
import { useAuth } from "../../provider/AuthProvider";
import { toast } from "sonner";
import EditStudent from "../../components/admin/EditStudent";

const AdminStudent = () => {
  const [students, setStudents] = useState([]);
  const [api, setApi] = useAtom(apiStore);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [token, setToken] = useAuth();
  const [edit, setEdit] = useState({});

  const toggle = () => {
    setShowCreate(!showCreate);
  };

  const toggleEdit = () => {
    setShowEdit(!showEdit);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.value.toLowerCase();
    if (!searchTerm) {
      fetchData();
      return;
    }
    const filteredStudents = students.filter(
      (student) =>
        student.firstname.toLowerCase().includes(searchTerm) ||
        student.lastname.toLowerCase().includes(searchTerm) ||
        student.lrn.includes(searchTerm)
    );
    setStudents(filteredStudents);
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
    // console.log(resData);

    setStudents(resData);
  };

  const handleEdit = (stdnt) => {
    console.log(stdnt);

    setEdit(stdnt);
    toggleEdit();
  };

  const handleRemove = async (student) => {
    const res = await fetch(`${api}/student/${student.id}`, {
      method: "DELETE",
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
    toast.success(resData.message);
    fetchData();
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
              onChange={handleSearch}
            />
          </div>
        </div>
        <StudentTable
          data={students}
          admin={true}
          handleEdit={handleEdit}
          handleRemove={handleRemove}
        />
        {showEdit && (
          <EditStudent student={edit} toggle={toggleEdit} update={fetchData} />
        )}
        {showCreate && <CreateStudent toggle={toggle} update={fetchData} />}
      </div>
    </AdminWrapper>
  );
};

export default AdminStudent;
