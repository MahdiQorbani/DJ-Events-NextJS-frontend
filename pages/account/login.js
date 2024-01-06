import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Joi from "joi-browser";
import { FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/components/Layout";
import useForm from "@/components/common/form";

export default function LoginPage() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const rule = {
    schema: {
      email: Joi.string().required().email().label("Email"),
      password: Joi.string().required().min(8).label("Password"),
    },
    onSubmit: async () => {
      console.log("submitted");
    },
    values,
    setValues,
    errors,
    setErrors,
  };

  const keys = Object.keys(values);

  const { renderInput, renderButton, handleSubmit } = useForm(rule);

  return (
    <Layout title="User Login">
      <div className="max-w-[500px] m-auto p-8 shadow-lg shadow-[rgba(50,50,50,0.52)]">
        <h1 className="flex space-x-1">
          <FaUser /> <span>Login</span>
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-5">
            {keys.map((key) => renderInput(key, key, "block text-lg"))}
            {renderButton("Login")}
          </div>
        </form>
        <p>
          Don't have an account? <Link href="/account/register">Register</Link>
        </p>
      </div>
    </Layout>
  );
}
