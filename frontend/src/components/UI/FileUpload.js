import { useState } from 'react';
import { showAlert } from '../../utils/alerts';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    handleFile(file);
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (file) {
      const fileName = file.name.toLowerCase();
      if (fileName.endsWith('.xlsx')) {
        setSelectedFile(file);
      } else {
        setSelectedFile(null);
        showAlert('error', 'Only excel files are allowed (.xlsx)');
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="file-upload-container">
      <input
        type="file"
        accept=".xlsx"
        onChange={handleFileChange}
        className="file-input"
        hidden
        id="bulk-add-students"
      />
      <label
        className="drop-area"
        onDrop={handleFileDrop}
        onDragOver={handleDragOver}
        htmlFor="bulk-add-students"
      >
        <div className="upload-icon">
          <i className="fa-solid fa-arrow-up"></i>
        </div>
        <div className="upload-text">Drag & Drop or Click to Upload</div>
      </label>
      {selectedFile && (
        <div className="selected-file">Selected File: {selectedFile.name}</div>
      )}
    </div>
  );
};

export default FileUpload;
