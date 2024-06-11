import React from "react";

const ResourceCard = ({ resource }) => {
  return (
    <div className="ResourceCard">
      <h4>{resource.title}</h4>
      {resource.url.includes(".pdf") ? (
        <a href={resource.url} target="_blank" rel="noopener noreferrer">
          View PDF
        </a>
      ) : (
        <iframe
          width="320"
          height="165"
          src={resource.url}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default ResourceCard;
