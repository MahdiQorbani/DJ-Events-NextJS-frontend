import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import Joi from "joi-browser";
import { FaImage } from "react-icons/fa";
import slugify from "react-slugify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/components/Layout";
import Modal from "@/components/common/Modal";
import ImageUpload from "@/components/ImageUpload";
import useForm from "@/components/common/form";
import { API_URL } from "@/config";

const EditEventPage = ({ evt }) => {
  const { attributes: data } = evt.data;
  const [values, setValues] = useState({
    name: data.name,
    performers: data.performers,
    venue: data.venue,
    address: data.address,
    date: data.date,
    time: data.time,
    description: data.description,
  });

  const [errors, setErrors] = useState({});

  const [imagePreview, setImagePreview] = useState(
    data.image.data ? data.image.data.attributes.formats.thumbnail.url : null
  );

  const [showModal, setShowModal] = useState(false);

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
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: { slug: slug, ...values } }),
      };

      const res = await fetch(`${API_URL}/api/events/${evt.data.id}`, request);

      if (!res.ok) {
        toast.error("Somthing Went Wrong");
        console.log(await res.json());
        console.log(request);
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

  const openImageModal = () => {
    setShowModal(true);
  };

  const imageUploaded = async () => {
    const res = await fetch(`${API_URL}/api/events/${evt.data.id}?populate=*`);
    const newData = await res.json();
    setImagePreview(
      newData.data.attributes.image.data
        ? newData.data.attributes.image.data.attributes.formats.thumbnail.url
        : null
    );
    setShowModal(false);
  };

  return (
    <Layout title="Edit Event">
      <Link href="/events"> {"<"} Go Back</Link>
      <h1>Add Event</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-5">
          {keys.map((key) => renderInput(key, `evnet ${key}`))}
        </div>
        {renderButton("Update Event")}
      </form>

      <h2 className="mt-5">Event Image:</h2>
      {imagePreview ? (
        <Image
          src={imagePreview}
          width="0"
          height="0"
          sizes="100vw"
          className="w-auto h-auto"
          alt=""
        />
      ) : (
        <div>
          <p>No image uploaded</p>
        </div>
      )}

      <div>
        <button
          onClick={() => openImageModal()}
          className="btn-secondary flex space-x-2 mt-5"
        >
          <FaImage /> <span>Set Iamge</span>
        </button>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload evtId={evt.data.id} imageUploaded={imageUploaded} />
      </Modal>
    </Layout>
  );
};

export default EditEventPage;

export async function getServerSideProps({ params: { id }, req }) {
  const res = await fetch(`${API_URL}/api/events/${id}?populate=*`);
  const evt = await res.json();

  return {
    props: {
      evt,
    },
  };
}
