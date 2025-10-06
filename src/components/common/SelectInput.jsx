import { useField } from "formik";

export default function SelectInput({ label, options, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">{label}</label>
      <select
        {...field}
        {...props}
        className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
          meta.touched && meta.error ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
        }`}
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      {meta.touched && meta.error && (
        <p className="text-red-500 text-sm mt-1">{meta.error}</p>
      )}
    </div>
  );
}
