import TeacherWrapper from "../components/TeacherWrapper";
import ClassTable from "../components/ClassTable";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { apiStore } from "../store/apiStore";
import { useAuth } from "../provider/AuthProvider";
import Button from "../components/Button";
import CreateClass from "../components/CreateClass";

const ClassPage = () => {
  const [clss, setClss] = useState([]);
  const [api, setApi] = useAtom(apiStore);
  const [token, setToken] = useAuth();
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    fetch(`${api}/class/current`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
    })
      .then((res) => res.json())
      .then((data) => setClss(data));
  }, []);

  return (
    <TeacherWrapper page="Classes">
      <div className="w-full p-4">
        <div className="w-[8rem]">
          <Button
            name="Create Class"
            onClick={() => setShowCreate(!showCreate)}
          />
        </div>
        <ClassTable data={clss} />
        {showCreate && (
          <CreateClass toggle={() => setShowCreate(!showCreate)} />
        )}
      </div>
    </TeacherWrapper>
  );
};

export default ClassPage;
