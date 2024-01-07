import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Joi from "joi-browser";
import { FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/components/Layout";
import useForm from "@/components/common/form";
import AuthContext from "@/context/AuthContext";

export default function RegisterPage() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});

  const {
    register,
    error: resError,
    setError: setResError,
  } = useContext(AuthContext);

  useEffect(() => {
    resError && toast.error(resError);
    setResError(null);
  });

  const rule = {
    schema: {
      email: Joi.string().required().email().label("Email"),
      username: Joi.string().required().label("Username"),
      password: Joi.string().min(8).max(16).required().label("Password"),
      password_confirmation: Joi.any()
        .valid(Joi.ref("password"))
        .required()
        .label("Confirm Password")
        .options({ language: { any: { allowOnly: "doesn't match" } } }),
    },
    onSubmit: () => {
      register(values);
    },
    values,
    setValues,
    errors,
    setErrors,
  };

  const keys = Object.keys(values);

  const { renderInput, renderButton, handleSubmit } = useForm(rule);

  return (
    <Layout title="User Registration">
      <div className="max-w-[500px] m-auto p-8 shadow-lg shadow-[rgba(50,50,50,0.52)]">
        <h1 className="flex space-x-1">
          <FaUser /> <span>Register</span>
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-5">
            {keys.map((key) => renderInput(key, key, "block text-lg"))}
            {renderButton("Register")}
          </div>
        </form>
        <p>
          Already have an account? <Link href="/account/login">Login</Link>
        </p>
      </div>
    </Layout>
  );
}
