import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Joi from "joi-browser";
import slugify from "react-slugify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/components/Layout";
import useForm from "../../helpers/form";
import { API_URL } from "@/config";

const AddEventPage = () => {
  const [values, setValues] = useState({
    name: "",
    performers: "",
    venue: "",
    address: "",
    date: "",
    time: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const router = useRouter();

  const rule = {
    schema: {
      name: Joi.string().required().label("Name"),
      performers: Joi.string().required().label("Performers"),
      venue: Joi.string().required().label("Venue"),
      address: Joi.string().required().label("Address"),
      date: Joi.string().required().label("Date"),
      time: Joi.string().required().label("Time"),
      description: Joi.label("Description"),
    },
    onSubmit: async () => {
      const slug = slugify(values.name);
      const request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: { slug: slug, ...values } }),
      };

      const res = await fetch(`${API_URL}/api/events`, request);

      if (!res.ok) {
        toast.error("Somthing Went Wrong");
      } else {
        const { data } = await res.json();
        const evt = data.attributes;

        router.push(`/events/${evt.slug}`);
      }
    },
    values,
    setValues,
    errors,
    setErrors,
  };

  const { renderInput, renderButton, handleSubmit } = useForm(rule);

  const keys = Object.keys(values);

  return (
    <Layout title="Add New Event">
      <Link href="/events"> {"<"} Go Back</Link>
      <h1>Add Event</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-5">
          {keys.map((key) => renderInput(key, `evnet ${key}`))}
        </div>
        {renderButton("Add Event")}
      </form>
    </Layout>
  );
};

export default AddEventPage;
