import React from "react";

export default function Input({ name, value, onChange, type, textarea }) {
  return (
    <div className={textarea === "true" && "md:col-span-2"}>
      <label htmlFor={name} className="capitalize">
        Event {name}
      </label>
      {textarea === "true" ? (
        <textarea
          className="w-full h-24 p-1 border border-blue-500 col-span-2"
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          className="w-full h-10 p-1 border border-blue-500"
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
}
