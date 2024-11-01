import TeacherWrapper from "../components/TeacherWrapper";
import ClassTable from "../components/ClassTable";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { apiStore } from "../store/apiStore";
import { useAuth } from "../provider/AuthProvider";
import Button from "../components/Button";
import CreateClass from "../components/CreateClass";

const ClassesPage = () => {
  const [clss, setClss] = useState([]);
  const [api, setApi] = useAtom(apiStore);
  const [token, setToken] = useAuth();
  const [showCreate, setShowCreate] = useState(false);

  const fetchData = async () => {
    const res = await fetch(`${api}/class/current`, {
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
    setClss(resData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <TeacherWrapper page="Classes">
      <div className="m-5 p-3 bg-white rounded-lg">
        <div className="w-[8rem]">
          <Button
            name="Create Class"
            onClick={() => setShowCreate(!showCreate)}
          />
        </div>
        <ClassTable data={clss} />
        {showCreate && (
          <CreateClass
            toggle={() => setShowCreate(!showCreate)}
            update={fetchData}
          />
        )}
      </div>
    </TeacherWrapper>
  );
};

export default ClassesPage;
