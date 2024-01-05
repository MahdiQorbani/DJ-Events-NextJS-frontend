import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa";

export default function Modal({ show, onClose, children, title }) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => setIsBrowser(true));

  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div className="absolute flex justify-center items-center top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)]">
      <div className="w-[500px] h-[600px] rounded-3xl p-5 z-100 bg-white">
        <div className="flex justify-end text-2xl">
          <a href="#" onClick={handleClose}>
            <FaTimes />
          </a>
        </div>

        {title && <div>{title}</div>}
        <div className="pt-3">{children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else return null;
}

// https://devrecipes.net/modal-component-with-next-js/
