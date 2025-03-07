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
  const handleExport = async () => {
    try {
      const response = await fetch(`${api}/attendance/export/${id}`, {
        method: "GET",
        mode: "cors",
        headers: {
          auth: token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to download file");
      }

      // Get filename from Content-Disposition header (if set)
      const contentDisposition = response.headers.get("Content-Disposition");
      let filename = `Attendance_Report_${id}.xlsx`;

      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+)"/);
        if (match) {
          filename = match[1];
        }
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = filename; // Use extracted filename or default
      document.body.appendChild(a);
      a.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error exporting attendance:", error);
    }
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
