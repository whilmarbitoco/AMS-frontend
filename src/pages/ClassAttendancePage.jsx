import { useLocation, useParams } from "react-router-dom";
import TeacherWrapper from "../components/TeacherWrapper";
import StudentAttTable from "../components/StudentAttTable";
import { useAuth } from "../provider/AuthProvider";
import Button from "../components/Button";
import { apiStore } from "../store/apiStore";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { exportToExcel } from "react-json-to-excel";

const ClassAttendancePage = () => {
  const [token, setToken] = useAuth();
  const [api, setApi] = useAtom(apiStore);
  const location = useLocation();
  const [classes, setClasses] = useState([]);
  const { id } = useParams();
  const [reset, setReset] = useState(false);

  const fetchData = async () => {
    const res = await fetch(`${api}/attendance/${id}`, {
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
    console.log(resData);

    setClasses(resData);
    setReset(false);
  };

  const handleFilter = (e) => {
    const date = e.target.value;

    setClasses(classes.filter((cls) => cls.formattedDate === date));
    setReset(true);
  };

  const handleExport = () => {
    const dataToExport = classes.map((c) => {
      return {
        name: `${c.Student.firstname} ${c.Student.lastname}`,
        lrn: c.Student.lrn,
        strand: c.Student.strand,
        status: c.status,
        date: c.date,
      };
    });

    exportToExcel(dataToExport, "Exports");
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <TeacherWrapper page={`Attendance ${location.state.d.subject}`}>
      <div className="m-5 p-5 bg-white rounded-lg">
        <div className="flex items-center justify-between">
          <div className="w-[5rem] flex">
            <input
              type="date"
              className="border-blue-600 border-2 text-blue-600 px-3 py-2 rounded-lg outline-none font-semibold transition-colors duration-200 shadow-md hover:shadow-lg"
              onChange={handleFilter}
            />
            {reset && (
              <button
                className="bg-green-600 text-white px-3 py-2 ml-2 rounded-lg outline-none font-semibold shadow-md transition duration-200 hover:bg-green-700 hover:shadow-lg"
                onClick={fetchData}
              >
                Reset
              </button>
            )}
          </div>
          <div className="w-[5rem]">
            <Button name="Export" onClick={handleExport} />
          </div>
        </div>

        <StudentAttTable data={classes} />
      </div>
    </TeacherWrapper>
  );
};

export default ClassAttendancePage;
