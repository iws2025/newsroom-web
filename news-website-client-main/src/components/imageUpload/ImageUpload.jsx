// src/components/ImageUpload.js
import React, { useState } from "react";
import { toast } from "react-toastify";
import UserDefaultImg from "../../assets/img/user.jpg"

const ImageUpload = ({ image, setImage }) => {
  const [selectedFile, setSelectedFile] = useState(null); 
  const [previewUrl, setPreviewUrl] = useState(null); 
  const [uploadedUrl, setUploadedUrl] = useState(null); 
  const [loading, setLoading] = useState(false); 

  const CLOUDINARY_CLOUD_NAME = "dvvyj75uf";
  const CLOUDINARY_UPLOAD_PRESET = "news-website"; 
  const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); 
      setUploadedUrl(null); 
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select an image first!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      toast.success("Image uploaded successfully!");
      setImage(data.secure_url); 
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ marginBottom: "20px" }}
      />
      { (previewUrl || image) && 
        <div>
            <img
            src={previewUrl ? previewUrl : image}
            alt="Preview"
            style={{ width: "100%", objectFit: "cover"}}
            />
        </div>
      }
      <button
        onClick={handleUpload}
        disabled={loading || !selectedFile}
        style={{ marginTop: "20px", padding: "10px 20px" }}
        className="btn btn-primary font-weight-semi-bold"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default ImageUpload;