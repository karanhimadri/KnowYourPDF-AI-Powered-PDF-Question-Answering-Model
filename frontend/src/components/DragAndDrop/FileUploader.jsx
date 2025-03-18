import React, { useState } from "react";
import "./FileUploader.css";
import { useDispatch } from "react-redux";
import { uploadFile } from "../../features/files/fileSlice";
import { handleFileDisribution } from "../../features/files/fileSlice";

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const dispatch = useDispatch();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile && droppedFile.type === "application/pdf") {
        setFile(droppedFile);
        dispatch(uploadFile(droppedFile));
        dispatch(handleFileDisribution(droppedFile));
      } else if (droppedFile) {
        alert("Please upload a valid PDF file.");
      }
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      dispatch(uploadFile(selectedFile));
      dispatch(handleFileDisribution(selectedFile));
    } else if (selectedFile) {
      alert("Please upload a valid PDF file.");
    }
  };

  return (
    <div
      className={`file-uploader ${dragActive ? "active" : ""}`}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
    >
      <p className="upload-text">Drag & Drop PDF Here</p>
      <p className="or-text">or</p>

      <label className="file-label">
        Choose File
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="file-input"
        />
      </label>

      {file && <p className="file-name">Selected File: {file.name}</p>}
    </div>
  );
};

export default FileUploader;
