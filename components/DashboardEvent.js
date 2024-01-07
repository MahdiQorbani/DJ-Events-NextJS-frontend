import React from "react";
import Link from "next/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";

export default function DashboardEvent({ evt, handleDelete }) {
  const data = evt.attributes;
  return (
    <div className="flex items-center justify-between my-2.5 p-2.5 border border-[#ddd] border-solid rounded-lg bg-[#f4f4f4]">
      <h4 className="mb-2.5">
        <Link href={`/events/${data.slug}`}>{data.name}</Link>
      </h4>
      <div className="flex space-x-3 space-y-0">
        <Link href={`/events/edit/${evt.id}`} className="flex space-x-1">
          <FaPencilAlt />
          <span>Edit event</span>
        </Link>
        <a
          href="#"
          className="flex space-x-1 m-2.5 text-red-500"
          onClick={() => handleDelete(evt.id)}
        >
          <FaTimes /> <span>Delete</span>
        </a>
      </div>
    </div>
  );
}
