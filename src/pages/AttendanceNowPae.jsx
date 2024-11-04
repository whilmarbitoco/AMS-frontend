import { useLocation, useParams } from "react-router-dom";
import TeacherWrapper from "../components/TeacherWrapper";
import StudentAttTable from "../components/StudentAttTable";
import { useAuth } from "../provider/AuthProvider";
import Button from "../components/Button";
import { apiStore } from "../store/apiStore";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import QrPopup from "../components/QrPopup";

const AttendanceNowPage = () => {
  const [token, setToken] = useAuth();
  const [api, setApi] = useAtom(apiStore);
  const location = useLocation();
  const [classes, setClasses] = useState([]);
  const [showQr, setShowQr] = useState(false);

  const toggle = () => {
    setShowQr(!showQr);
  };

  const fetchData = async () => {
    const res = await fetch(`${api}/attendance/${location.state.id}/now`, {
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
    <TeacherWrapper page={`Attendance ${location.state.className}`}>
      <div className="m-5 p-5 bg-white rounded-lg">
        <div className="w-[8rem]">
          <Button name="QR Scanner" onClick={toggle} />
        </div>
        <StudentAttTable data={classes} />
        {showQr && <QrPopup toggle={toggle} />}
      </div>
    </TeacherWrapper>
  );
};

export default AttendanceNowPage;
