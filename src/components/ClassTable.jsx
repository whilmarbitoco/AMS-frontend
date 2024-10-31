const ClassTable = ({ data }) => {
  return (
    <table className="w-full border-collapse mt-5 mb-5 border border-gray-200 rounded-lg">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-3 text-left border-b-2 border-gray-200">ID</th>
          <th className="p-3 text-left border-b-2 border-gray-200">Subject</th>
          <th className="p-3 text-left border-b-2 border-gray-200">Strand</th>
          <th className="p-3 text-left border-b-2 border-gray-200">Time In</th>
          <th className="p-3 text-left border-b-2 border-gray-200">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((data, index) => (
          <tr key={index} className="border-b border-gray-200">
            <td className="p-3">{data.id}</td>
            <td className="p-3">{data.subject}</td>
            <td className="p-3">{data.strand}</td>
            <td className="p-3">{data.timeIn}</td>
            <td className="p-3">Hello</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClassTable;
