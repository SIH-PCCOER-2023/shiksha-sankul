import React, { useState } from "react";
import { sendPostRequest } from "../../../utils/sendHttp";
import { showAlert } from "../../../utils/alerts";
import "@fortawesome/fontawesome-free/css/all.css";

const ExcelUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      showAlert("error", "Please select a file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("uploadfile", selectedFile);

      const res = await sendPostRequest(
        `http://localhost:8080/api/v1/faculty/bulkAddStudents`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.status === "success") {
        showAlert("success", "Excel sheet submitted successfully");
      }
    } catch (err) {
      showAlert("error", "Failed to submit Excel sheet. Please try again.");
    }
  };

  return (
    <div>
      <h2>OR</h2>
      <h2>Submit Excel Sheet</h2>
      <div className="file-input-wrapper">
        <label htmlFor="file-upload" className="choose-file-btn">
          Choose File
        </label>
        <input type="file" id="file-upload" onChange={handleFileChange} />
        {selectedFile && (
          <div className="file-info">
            <i className="fas fa-file file-icon"></i>
            <span className="file-name">{selectedFile.name}</span>
          </div>
        )}
      </div>

      <button onClick={handleSubmit} className="upload-btn">
        Upload
      </button>
    </div>
  );
};

export default ExcelUpload;
