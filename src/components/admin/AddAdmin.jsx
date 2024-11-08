import Input from "../../components/Input";
import Button from "../../components/Button";
import { useState } from "react";
import { toast } from "sonner";
import { useAtom } from "jotai";
import { apiStore } from "../../store/apiStore";

const AddAdmin = ({ toggle }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [api, _] = useAtom(apiStore);

  const handleSignin = async (e) => {
    e.preventDefault();
    if (!username || !password || !email) {
      toast.error("Invalid Form");
      return;
    }

    const data = {
      email,
      username,
      password,
    };

    const res = await fetch(`${api}/user/signup`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      toast.error("Something went wrong");
      return;
    }
    toast.success("Admin Created");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <form
        className="bg-white rounded-lg shadow-lg p-8 w-96 space-y-1"
        onSubmit={handleSignin}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add New Admin</h2>
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
          label="Username"
          value={username}
          onChange={setUsername}
        />
        <Input type="text" label="Email" value={email} onChange={setEmail} />
        <Input
          type="text"
          label="Password"
          value={password}
          onChange={setPassword}
        />

        <div className="flex justify-end mt-6">
          <Button name="Submit" />
        </div>
      </form>
    </div>
  );
};

export default AddAdmin;
