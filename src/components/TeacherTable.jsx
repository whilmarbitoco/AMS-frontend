const TeacherTable = ({ data }) => {
  return (
    <table className="w-full mt-5 mb-5 bg-white rounded-lg">
      <thead className="sticky top-0">
        <tr className="bg-blue-600 text-white rounded-t-lg">
          <th className="p-3 text-left border-b-2 border-gray-200">ID</th>
          <th className="p-3 text-left border-b-2 border-gray-200">Name</th>
          <th className="p-3 text-left border-b-2 border-gray-200">Email</th>
          <th className="p-3 text-left border-b-2 border-gray-200">Username</th>
        </tr>
      </thead>
      <tbody>
        {data.map((teacher) => (
          <tr className="border-b border-gray-200">
            <td className="p-3">{teacher.id}</td>
            <td className="p-3">
              {teacher.firstname + " " + teacher.lastname}
            </td>
            <td className="p-3">{teacher.User.email}</td>
            <td className="p-3">{teacher.User.username}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TeacherTable;
