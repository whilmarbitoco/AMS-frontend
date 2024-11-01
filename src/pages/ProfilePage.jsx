import TeacherWrapper from "../components/TeacherWrapper";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAtom } from "jotai";

import { useEffect, useState } from "react";
import { apiStore } from "../store/apiStore";
import { useAuth } from "../provider/AuthProvider";
import { userStore } from "../store/userStore";

const ProfilePage = () => {
  const [user, setUser] = useAtom(userStore);
  const [api, setApi] = useAtom(apiStore);
  const [token, setToken] = useAuth();

  const [firstname, setFirstname] = useState("N/A");
  const [lastname, setLastname] = useState("N/A");
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = {
      email,
      username,
      firstname,
      lastname,
    };

    const res = await fetch(`${api}/teacher/`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
      body: JSON.stringify(data),
    });

    const resData = await res.json();
    if (!res.ok) {
      console.log(resData);
    }
    console.log(resData);
  };

  useEffect(() => {
    fetch(`${api}/teacher/current`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
    })
      .then((data) => data.json())
      .then((data) => {
        setEmail(data.User.email);
        setUsername(data.User.username);
        setFirstname(data.firstname);
        setLastname(data.lastname);
      })
      .catch((error) => {
        console.error("Error fetching teacher data:");
      });
  }, [api, token, setUser]);

  return (
    <TeacherWrapper page="Profile">
      <div className="m-5 min-h-screen">
        <form
          className="w-full max-w-lg p-8 space-y-4 bg-white rounded-lg shadow-md"
          onSubmit={submitHandler}
        >
          <Input
            label="Username"
            type="text"
            value={username}
            onChange={setUsername}
          />
          <Input label="Email" type="email" value={email} onChange={setEmail} />
          <Input
            label="Firstname"
            type="text"
            value={firstname}
            onChange={setFirstname}
          />
          <Input
            label="Lastname"
            type="text"
            value={lastname}
            onChange={setLastname}
          />

          <div className="flex justify-end space-x-4 mt-6">
            <Button name="Update" />
          </div>
        </form>
      </div>
    </TeacherWrapper>
  );
};

export default ProfilePage;
