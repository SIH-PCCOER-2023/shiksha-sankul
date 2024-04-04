import React, { useState } from "react";
import Container from "react-bootstrap/Container";

const IndividualLearningPlan = () => {
  // Simulated ILPs data for testing
  const [ILPs] = useState([
    { id: 1, title: "ILP 1" },
    { id: 2, title: "ILP 2" },
    { id: 3, title: "ILP 3" },
  ]);

  return (
    <Container>
      {ILPs.map((ILP, index) => (
        <ILPCard key={index} ILP={ILP} />
      ))}
    </Container>
  );
};

const ILPCard = ({ ILP }) => {
  const [showResources, setShowResources] = useState(false);

  // Simulated ILP resources data for testing
  const [ILPResources] = useState([
    {
      id: 1,
      title: "Introduction to React",
      type: "youtube",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: 2,
      title: "Getting Started with React",
      type: "pdf",
      url: "/path/to/pdf/getting_started_with_react.pdf",
    },
  ]);

  const toggleResources = () => {
    setShowResources(!showResources);
  };

  return (
    <div className="ILPCard">
      <h3>{ILP.title}</h3>
      <button onClick={toggleResources}>View</button>
      {showResources && (
        <div className="ILPResources">
          {ILPResources.map((resource, index) => (
            <ResourceCard key={index} resource={resource} />
          ))}
        </div>
      )}
    </div>
  );
};

const ResourceCard = ({ resource }) => {
  return (
    <div className="ResourceCard">
      <h4>{resource.title}</h4>
      {resource.type === "pdf" && (
        <embed
          src={resource.url}
          type="application/pdf"
          width="100%"
          height="600px"
        />
      )}
      {resource.type === "youtube" && (
        <iframe
          width="560"
          height="315"
          src={resource.url}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default IndividualLearningPlan;
