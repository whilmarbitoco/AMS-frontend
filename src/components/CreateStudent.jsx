import StudentTable from "./StudentTable";
import { useAtom } from "jotai";
import { apiStore } from "../store/apiStore";
import { useEffect, useState } from "react";
import { useAuth } from "../provider/AuthProvider";
import { toast } from "sonner";

const CreateStudent = ({ toggle, update, classId }) => {
  const [api, setApi] = useAtom(apiStore);
  const [students, setStudents] = useState([]);
  const [token, setToken] = useAuth();

  const fetchData = async () => {
    const res = await fetch(`${api}/student`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resData = await res.json();
    if (!res.ok) {
      toast.error(resData.message);
      return;
    }
    setStudents(resData);
  };

  const handleAdd = async (id) => {
    const res = await fetch(`${api}/class/${classId}/add`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
      body: JSON.stringify({ studentID: id }),
    });

    const resData = await res.json();
    if (!res.ok) {
      toast.error(resData.message);
      return;
    }

    toast.success(resData.message);
    update();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/2 h-[90vh]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add New Student</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            type="button"
            onClick={toggle}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <StudentTable data={students} add={true} handleAdd={handleAdd} />
      </div>
    </div>
  );
};

export default CreateStudent;
