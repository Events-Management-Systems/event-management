import { useField } from "formik";

export default function FormInput({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">{label}</label>
      <input
        {...field}
        {...props}
        className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
          meta.touched && meta.error ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
        }`}
      />
      {meta.touched && meta.error && (
        <p className="text-red-500 text-sm mt-1">{meta.error}</p>
      )}
    </div>
  );
}
