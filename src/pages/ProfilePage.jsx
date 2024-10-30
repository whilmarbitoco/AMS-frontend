import TeacherWrapper from "../components/TeacherWrapper";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAtom } from "jotai";
import { userStore } from "../store/userStore";
import { useState } from "react";

const ProfilePage = () => {
  const [user, setUser] = useAtom(userStore);

  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  return (
    <TeacherWrapper page="Profile">
      <div className="m-5 min-h-screen">
        <form className="w-full max-w-lg p-8 space-y-4 bg-white rounded-lg shadow-md">
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
            value={user.firstname}
            onChange={setFirstname}
          />
          <Input
            label="Lastname"
            type="text"
            value={lastname}
            onChange={setLastname}
          />

          <div className="flex justify-end space-x-4 mt-6">
            <Button name="Cancel" type="second" />
            <Button name="Update" />
          </div>
        </form>
      </div>
    </TeacherWrapper>
  );
};

export default ProfilePage;
