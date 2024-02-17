import React from "react";

const ContentCard = ({ content }) => {
  const handleDownload = () => {
    // You can implement the download logic here
    // For simplicity, let's assume the file URL is stored in the 'url' field of the content object
    window.open(content.url, "_blank");
  };

  return (
    <div className="content-card">
      <h3>{content.fileName}</h3>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default ContentCard;
