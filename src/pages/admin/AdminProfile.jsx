import { useState } from "react";
import AdminWrapper from "../../components/AdminWrapper";
import Button from "../../components/Button";
import AddAdmin from "../../components/admin/AddAdmin";

const AdminProfile = () => {
  const [show, setShow] = useState(true);

  const toggle = () => {
    setShow(!show);
  };

  return (
    <AdminWrapper page="Profile">
      <div className="m-5 flex items-start justify-between">
        <div className="w-full max-w-lg p-8 space-y-4 bg-white rounded-lg shadow-md">
          <div className="flex flex-col gap-2 m-2">
            <label
              htmlFor="input"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="input"
              type="email"
              value="test@gmailcom"
              className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 
        rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
        focus:border-transparent transition duration-200 ease-in-out
        placeholder-gray-400 hover:border-gray-400 shadow-sm text-sm"
              disabled
            />
          </div>
          <div className="flex flex-col gap-2 m-2">
            <label
              htmlFor="input"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="input"
              type="email"
              value="tamad"
              className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 
        rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
        focus:border-transparent transition duration-200 ease-in-out
        placeholder-gray-400 hover:border-gray-400 shadow-sm text-sm"
              disabled
            />
          </div>
        </div>
        <div className="w-[9rem]">
          {" "}
          <Button onClick={toggle} name="Add Admin" />
        </div>
        {show && <AddAdmin toggle={toggle} />}
      </div>
    </AdminWrapper>
  );
};

export default AdminProfile;
