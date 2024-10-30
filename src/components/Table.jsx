const Table = () => {
  return (
    <table className="w-full border-collapse mt-5 mb-5 border border-gray-200 rounded-lg">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-3 text-left border-b-2 border-gray-200">ID</th>
          <th className="p-3 text-left border-b-2 border-gray-200">Name</th>
          <th className="p-3 text-left border-b-2 border-gray-200">Email</th>
          <th className="p-3 text-left border-b-2 border-gray-200">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-gray-200">
          <td className="p-3">1</td>
          <td className="p-3">John Doe</td>
          <td className="p-3">john@example.com</td>
          <td className="p-3">Active</td>
        </tr>
        <tr className="border-b border-gray-200">
          <td className="p-3">2</td>
          <td className="p-3">Jane Smith</td>
          <td className="p-3">jane@example.com</td>
          <td className="p-3">Active</td>
        </tr>
        <tr className="border-b border-gray-200">
          <td className="p-3">3</td>
          <td className="p-3">Mike Johnson</td>
          <td className="p-3">mike@example.com</td>
          <td className="p-3">Inactive</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
