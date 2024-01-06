import React from "react";

export default function Input({
  name,
  value,
  onChange,
  type,
  textarea,
  label,
  error,
  classes,
}) {
  classes = `w-full p-1 border border-blue-500 ${classes}`;
  label = label.replace("_", " ");
  return (
    <div className={textarea === "true" ? "md:col-span-2" : ""}>
      <label htmlFor={name} className="capitalize block mb-2.5">
        {label}
      </label>
      {textarea === "true" ? (
        <textarea
          className={`h-24 ${classes}`}
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          className={`h-10 ${classes}`}
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
        />
      )}
      {error && <div className="w-full h-10 p-1 bg-red-300">{error}</div>}
    </div>
  );
}
