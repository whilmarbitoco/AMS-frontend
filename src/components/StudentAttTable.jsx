import { useEffect, useState } from "react";

const StudentAttTable = ({ data }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    setStudents(data);
  }, []);

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
            <th className="p-3 text-left border-b-2 border-gray-200">Date</th>
            <th className="p-3 text-left border-b-2 border-gray-200">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((student, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="p-3 ">{`${student.Student.lastname}, ${student.Student.firstname}`}</td>
              <td className="p-3 ">{student.Student.lrn}</td>
              <td className="p-3 ">{student.Student.strand}</td>
              <td className="p-3 ">{student.date}</td>
              <td className="p-3  w-32">
                {student.status === "Present" ? (
                  <span className="bg-green-500 p-1 px-2 text-white mr-2 rounded-lg">
                    Present
                  </span>
                ) : (
                  <span className="bg-red-500 p-1 px-2 text-white mr-2 rounded-lg">
                    absent
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentAttTable;
