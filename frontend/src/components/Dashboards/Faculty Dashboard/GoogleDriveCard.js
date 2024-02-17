import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const GoogleDriveCard = ({ resources }) => {
  return (
    <Row>
      {resources.map((resource, index) => (
        <Col key={index} className="google-drive-card">
          <p>{resource.title}</p>
          <div className="resource-link">
            <a
              href="https://drive.google.com/file/d/1eBCexoWxDvhnoTJOafrem2yPs_wvK9mz/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Resource
            </a>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default GoogleDriveCard;
