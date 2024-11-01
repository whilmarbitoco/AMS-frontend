import { useNavigate } from "react-router-dom";
import Button from "./Button";

const ClassTable = ({ data }) => {
  const navigate = useNavigate();

  const handleClick = (d) => {
    navigate(`/dashboard/class/${d.id}`, {
      state: { d },
    });
  };

  return (
    <div className="overflow-scroll max-h-[75vh]">
      <table className="w-full mt-5 mb-5 bg-white rounded-lg">
        <thead className="sticky top-0">
          <tr className="bg-blue-600 text-white rounded-t-lg">
            <th className="p-3 text-left border-b-2 border-gray-200">ID</th>
            <th className="p-3 text-left border-b-2 border-gray-200">
              Subject
            </th>
            <th className="p-3 text-left border-b-2 border-gray-200">Strand</th>
            <th className="p-3 text-left border-b-2 border-gray-200">
              Time In
            </th>
            <th className="p-3 text-left border-b-2 border-gray-200">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="p-3">{d.id}</td>
              <td className="p-3">{d.subject}</td>
              <td className="p-3">{d.strand}</td>
              <td className="p-3">{d.timeIn}</td>
              <td className="p-3 w-32">
                <button
                  className="text-green-500 hover:text-blue-700 mr-2"
                  onClick={() => handleClick(d)}
                >
                  Manage
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassTable;
