import { useLocation, useParams } from "react-router-dom";
import TeacherWrapper from "../components/TeacherWrapper";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { apiStore } from "../store/apiStore";

const ClassPage = () => {
  const { id } = useParams();
  const [className, setClassName] = useState("");
  const [api, setApi] = useAtom(apiStore);
  const location = useLocation();

  const fetchData = async () => {
    const res = await fetch(`${api}/user/login`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const resData = await res.json();
      console.log("Error: " + resData);
      return;
    }
    const resData = await res.json();
    console.log(resData);
  };

  useEffect(() => {
    setClassName(location.state.d.subject);
    fetchData();
  }, []);

  return (
    <TeacherWrapper page={`Class ${className}`}>
      <h1>Hello {id}</h1>
    </TeacherWrapper>
  );
};

export default ClassPage;
