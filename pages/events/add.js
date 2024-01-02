import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/Layout";
import Input from "@/components/common/Input";
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

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const keys = Object.keys(values);

  return (
    <Layout title="Add New Event">
      <Link href="/events"> {"<"} Go Back</Link>
      <h1>Add Event</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-5">
          {keys.map((key) => (
            <Input
              key={key}
              textarea={key === "description" ? "true" : "false"}
              type={key === "date" ? "date" : "text"}
              name={key}
              value={values.key}
              onChange={handleInputChange}
            />
          ))}
        </div>
        <input type="submit" value="Add Event" className="btn" />
      </form>
    </Layout>
  );
};

export default AddEventPage;
