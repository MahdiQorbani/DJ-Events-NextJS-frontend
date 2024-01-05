import React, { useState } from "react";
import { API_URL } from "@/config";

export default function ImageUpload({ evtId, imageUploaded }) {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("files", image);
    formData.append("ref", "event");
    formData.append("refId", evtId);
    formData.append("field", "image");

    const res = await fetch(`${API_URL}/api/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: { formData } }),
    });

    console.log(await res.json());
    console.log(formData);

    if (res.ok) {
      imageUploaded();
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div>
      <h1>Upload Event Image</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="file" onChange={handleFileChange} />
        </div>
        <input type="submit" value="Upload" className="btn" />
      </form>
    </div>
  );
}
