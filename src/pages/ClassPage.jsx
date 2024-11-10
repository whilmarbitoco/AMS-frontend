import { useLocation, useParams } from "react-router-dom";
import TeacherWrapper from "../components/TeacherWrapper";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { apiStore } from "../store/apiStore";
import Button from "../components/Button";
import StudentTable from "../components/StudentTable";
import { useAuth } from "../provider/AuthProvider";
import CreateStudent from "../components/CreateStudent";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import GenerateQr from "../components/GenerateQr";

const ClassPage = () => {
  const { id } = useParams();
  const [className, setClassName] = useState("");
  const [api, setApi] = useAtom(apiStore);
  const [token, setToken] = useAuth();
  const location = useLocation();
  const [students, setStudents] = useState([]);
  const [showStudent, setShowStudent] = useState(false);
  const navigate = useNavigate();
  const [showQr, setShowQr] = useState(false);
  const [qr, setQr] = useState("");

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

  const toggle = () => {
    setShowQr(!showQr);
  };
  const handleRemove = async (uid) => {
    const res = await fetch(`${api}/class/${id}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
      body: JSON.stringify({ studentID: uid.id }),
    });

    const resData = await res.json();

    if (!res.ok) {
      toast.error(resData.message);
      return;
    }
    toast.success(resData.message);
    fetchData();
  };
  const handleAttendance = async (cid, data) => {
    const res = await fetch(`${api}/attendance`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
      body: JSON.stringify({ classID: cid }),
    });

    const resData = await res.json();

    if (!res.ok && res.status != "403") {
      toast.error(resData.message);
      return;
    } else if (res.status == "403") {
      toast.success(resData.message);
      navigate("/dashboard/attendance/now", {
        state: { id, className },
      });
    }
    toast.success(resData.message);
    navigate("/dashboard/attendance/now", {
      state: { id, className },
    });
  };

  const handleGenerate = (student) => {
    setQr(student);
    toggle();
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

    setStudents(resData.map((i) => i.Student));
  };

  useEffect(() => {
    fetchData();
    setClassName(location.state.d.subject);
  }, []);

  return (
    <TeacherWrapper page={`Class ${className}`}>
      <div className="m-5 p-3 bg-white rounded-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
          {/* Left Section: Add Student Button and Search Input */}
          <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
            <Button
              name="Add Student"
              onClick={() => setShowStudent(!showStudent)}
              className="w-full md:w-auto"
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-full md:w-auto px-4 py-2 mt-3 md:mt-0 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleSearch}
            />
          </div>

          {/* Right Section: Attendance Button */}
          <div className="w-full md:w-auto flex justify-end md:justify-start">
            <Button name="Attendance" onClick={() => handleAttendance(id)} />
          </div>
        </div>

        {/* Student Table */}
        <StudentTable
          data={students}
          add={false}
          handleRemove={handleRemove}
          handleGenerate={handleGenerate}
        />

        {/* Create Student Form */}
        {showStudent && (
          <CreateStudent
            classId={id}
            toggle={() => setShowStudent(!showStudent)}
            update={fetchData}
          />
        )}
      </div>

      {showQr && <GenerateQr toggle={toggle} data={qr} />}
    </TeacherWrapper>
  );
};

export default ClassPage;
