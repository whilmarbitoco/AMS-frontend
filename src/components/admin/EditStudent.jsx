import Input from "../Input";
import Button from "../Button";
import { useState } from "react";
import { toast } from "sonner";
import { apiStore } from "../../store/apiStore";
import { useAtom } from "jotai";
import { useAuth } from "../../provider/AuthProvider";
import Choices from "../Choices";

const EditStudent = ({ toggle, update, student }) => {
  const [step, setStep] = useState(1);
  const [api, setApi] = useAtom(apiStore);
  const [token, setToken] = useAuth();

  const [firstname, setFirstname] = useState(student.firstname);
  const [lastname, setLastname] = useState(student.lastname);
  const [lrn, setLrn] = useState(student.lrn);
  const [strand, setStrand] = useState(student.strand);
  const [username, setUsername] = useState(student.User.username);
  const [email, setEmail] = useState(student.User.email);
  const [password, setPassword] = useState("N/A");
  const strands = [
    "Cookery 11",
    "GAS-B 11",
    "ABM 11",
    "GAS-A 11",
    "Agri-Crop 11",
    "Cookery 12",
    "GAS-B 12",
    "ABM 12",
    "GAS-A 12",
    "Agri-Crop 12",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      firstname.trim() === "" ||
      lastname.trim() === "" ||
      lrn.trim() === "" ||
      strand.trim() === "" ||
      username.trim() === "" ||
      email.trim() === "" ||
      password.trim() === ""
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    const data = {
 
      firstname,
      lastname,
      username,
     
      password,
    };
    console.log(data);
    const res = await fetch(`${api}/student/${student.id}`, {
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
      toast.error(resData.message);
      return;
    }

    toast.success(resData.message);
    toggle();
    update();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <form className="bg-white rounded-lg shadow-lg p-8 w-96 space-y-1">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Edit Student</h2>
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

        <Input
          type="text"
          label="First Name"
          value={firstname}
          onChange={setFirstname}
        />
        <Input
          type="text"
          label="Last Name"
          value={lastname}
          onChange={setLastname}
        />

        <Input
          type="text"
          label="Username"
          value={username}
          onChange={setUsername}
        />

        <Input
          type="text"
          label="Password"
          value={password}
          onChange={setPassword}
        />
        <div className="flex justify-between mt-6 gap-1">
          <Button name="Edit" onClick={handleSubmit} />
        </div>
      </form>
    </div>
  );
};
export default EditStudent;
