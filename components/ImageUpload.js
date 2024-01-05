import React, { useState } from "react";
import { API_URL } from "@/config";

export default function ImageUpload({ evtId, imageUploaded }) {
  const [image, setImage] = useState(null);

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setButtonDisabled(true);
    const res = await fetch(`${API_URL}/api/upload`, {
      method: "POST",
      body: new FormData(e.target),
    });

    if (res.ok) {
      imageUploaded();
    }
    setButtonDisabled(false);
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const validate = () => {
    if (image) return false;
    return true;
  };

  return (
    <div>
      <h1>Upload Event Image</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="file" name="files" onChange={handleFileChange} />
          <input
            hidden
            type="text"
            name="ref"
            value="api::event.event"
            readOnly
          />
          <input hidden type="text" name="refId" value={evtId} readOnly />
          <input hidden type="text" name="field" value="image" readOnly />
        </div>
        <input
          type="submit"
          disabled={buttonDisabled || validate()}
          value="Upload"
          className="btn cursor-pointer disabled:cursor-not-allowed"
        />
      </form>
    </div>
  );
}
