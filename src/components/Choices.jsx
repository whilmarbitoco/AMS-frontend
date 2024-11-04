const Choices = ({ options, label, onChange, value = null }) => {
  return (
    <>
      <label
        htmlFor="select"
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <select
        id="select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 
        rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
        focus:border-transparent transition duration-200 ease-in-out
        placeholder-gray-400 hover:border-gray-400 shadow-sm text-sm"
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};

export default Choices;
