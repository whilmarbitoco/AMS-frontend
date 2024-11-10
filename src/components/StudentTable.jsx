import Button from "./Button";

const StudentTable = ({
  data,
  handleAdd,
  handleGenerate,
  handleRemove,
  handleEdit,
  add = false,
  admin = false,
}) => {
  return (
    <div className="overflow-scroll max-h-[75vh]">
      <table className="w-full mt-5 mb-5 bg-white rounded-lg">
        <thead className="sticky top-0">
          <tr className="bg-blue-600 text-white rounded-t-lg">
            <th className="p-3 text-left border-b-2 border-gray-200">
              Student Name
            </th>
            <th className="p-3 text-left border-b-2 border-gray-200">
              Student LRN
            </th>
            <th className="p-3 text-left border-b-2 border-gray-200">
              Student Strand
            </th>
            <th className="p-3 text-left border-b-2 border-gray-200">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((student, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="p-3 border">{`${student.lastname}, ${student.firstname} `}</td>
              <td className="p-3 border">{student.lrn}</td>
              <td className="p-3 border">{student.strand}</td>
              <td className="p-3 border w-32">
                {admin ? (
                  <div className="flex justify-between items-center gap-2">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleRemove(student)}
                    >
                      Remove
                    </button>

                    <button
                      className="text-green-500 hover:text-green-700"
                      onClick={() => handleEdit(student)}
                    >
                      Edit
                    </button>
                  </div>
                ) : add ? (
                  <Button name="Add" onClick={() => handleAdd(student.id)} />
                ) : (
                  <div className="flex justify-between items-center gap-2">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleRemove(student)}
                    >
                      Remove
                    </button>

                    <button
                      className="text-green-500 hover:text-green-700"
                      onClick={() => handleGenerate(student)}
                    >
                      Generate
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
