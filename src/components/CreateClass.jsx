import Input from "./Input";
import Button from "./Button";
import { useState } from "react";
import { useAtom } from "jotai";
import { apiStore } from "../store/apiStore";
import { useAuth } from "../provider/AuthProvider";
import Choices from "./Choices";
import { toast } from "sonner";

const CreateClass = ({ toggle, update }) => {
  const [subject, setSubject] = useState("");
  const [strand, setStrand] = useState("");
  const [timeIn, setTimeIn] = useState("");
  const [api, setApi] = useAtom(apiStore);
  const [token, setToken] = useAuth();
  const strands = [
    "Cookery 11",
    "GAS-B 11",
    "ABM 11",
    "GAS-A 11",
    "Agri-Crop 11",
    "HUMMS-A 11",
    "Cookery 12",
    "HUMSS-B 12",
    "ABM 12",
    "GAS 12",
    "HUMSS-A 12",
    "Agri-Crop 12",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subject || !strand || !timeIn) {
      toast.error("Please fill in all fields");
      return;
    }

    const data = { subject, strand, timeIn };

    const res = await fetch(`${api}/class`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const resData = await res.json();
      toast.error(resData.message);
      return;
    }

    const resData = await res.json();
    toast.success("Class created successfully");
    toggle();
    update();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <form className="bg-white rounded-lg shadow-lg p-8 w-96 space-y-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Create New Class</h2>
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
        <Input type="text" label="Subject" onChange={setSubject} />
        <Choices
          options={strands}
          type="text"
          label="Strand"
          onChange={setStrand}
        />
        <Input type="text" label="Time In" onChange={setTimeIn} />
        <div className="flex justify-end mt-6">
          <Button name="Create" onClick={handleSubmit} />
        </div>
      </form>
    </div>
  );
};

export default CreateClass;
