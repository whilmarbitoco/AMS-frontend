import { useLocation, useParams } from "react-router-dom";
import TeacherWrapper from "../components/TeacherWrapper";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { apiStore } from "../store/apiStore";
import Button from "../components/Button";
import StudentTable from "../components/StudentTable";
import { useAuth } from "../provider/AuthProvider";
import CreateStudent from "../components/CreateStudent";

const ClassPage = () => {
  const { id } = useParams();
  const [className, setClassName] = useState("");
  const [api, setApi] = useAtom(apiStore);
  const [token, setToken] = useAuth();
  const location = useLocation();
  const [students, setStudents] = useState([]);
  const [showStudent, setShowStudent] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.value.toLowerCase();
    if (!searchTerm) {
      fetchData();
      return;
    }
    const filteredStudents = students.filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm) ||
        student.lrn.includes(searchTerm) ||
        student.email.toLowerCase().includes(searchTerm)
    );
    setStudents(filteredStudents);
  };

  const handleRemove = async (uid) => {
    const res = await fetch(`${api}/class/${id}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
      body: JSON.stringify({ studentID: uid }),
    });

    const resData = await res.json();

    if (!res.ok) {
      console.log(resData);
      return;
    }
    console.log(resData);
    fetchData();
  };

  const fetchData = async () => {
    const res = await fetch(`${api}/class/${id}`, {
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
    console.log(resData);

    setStudents(resData.map((i) => i.Student));
  };

  useEffect(() => {
    fetchData();
    setClassName(location.state.d.subject);
  }, []);

  return (
    <TeacherWrapper page={`Class ${className}`}>
      <div className="m-5 p-3 bg-white rounded-lg">
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-3">
            <Button
              name="Add Student"
              onClick={() => setShowStudent(!showStudent)}
            />
            <input
              type="text"
              placeholder="Search..."
              className="px-4 mt-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleSearch}
            />
          </div>
          <div>
            <Button name="Attendance" />
          </div>
        </div>
        <StudentTable data={students} add={false} handleRemove={handleRemove} />
        {showStudent && (
          <CreateStudent
            classId={id}
            toggle={() => setShowStudent(!showStudent)}
            update={fetchData}
          />
        )}
      </div>
    </TeacherWrapper>
  );
};

export default ClassPage;
