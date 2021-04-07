import React, { useRef } from "react";

export const ProfileImage = ({ id }) => {
  const fileInput = useRef(null);
  const fileChange = (files) => {
    console.log(files);
  };
  return (
    <div className="profile-image">
      <img className="image" src="/profile-placeholder.png" alt="profile" />
      <input
        className="file-input"
        type="file"
        accept=".png, .jpg"
        ref={fileInput}
        onChange={(e) => fileChange(e.target.files)}
      />
      <button className="upload-btn" onClick={() => fileInput.current.click()}>
        Upload photo
      </button>
    </div>
  );
};
