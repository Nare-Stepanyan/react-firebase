import React, { useRef, useState, useEffect } from "react";
import { uploadImage, getDownloadUrl } from "./firebase/user";

export const ProfileImage = ({ id }) => {
  const fileInput = useRef(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    getDownloadUrl(id).then((url) => !!url && setImageUrl(url));
  }, [id]);

  const fileChange = async (files) => {
    const ref = await uploadImage(id, files[0], updateProgress);
    const downloadUrl = await ref.getDownloadURL();
    setImageUrl(downloadUrl);
  };

  const updateProgress = (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setUploadProgress(progress);
  };
  return (
    <div className="profile-image">
      <img
        className="image"
        src={imageUrl || "/profile-placeholder.png"}
        alt="profile"
      />
      <input
        className="file-input"
        type="file"
        accept=".png, .jpg"
        ref={fileInput}
        onChange={(e) => fileChange(e.target.files)}
      />
      <progress
        className="progress"
        max="100"
        value={uploadProgress}></progress>
      <button className="upload-btn" onClick={() => fileInput.current.click()}>
        Upload photo
      </button>
    </div>
  );
};
