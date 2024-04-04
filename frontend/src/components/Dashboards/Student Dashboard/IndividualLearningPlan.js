import React, { useState, useEffect, useContext } from "react";
import { sendGetRequest } from "../../../utils/sendHttp";
import { showAlert } from "../../../utils/alerts";
import UserContext from "../../../store/user-context";
import Container from "react-bootstrap/Container";

const IndividualLearningPlan = () => {
  const userCtx = useContext(UserContext);
  const [ILPs, setILPs] = useState([]);

  useEffect(() => {
    const fetchILPs = async () => {
      try {
        const response = await sendGetRequest(
          `http://localhost:8080/api/v1/ilps/${userCtx.user.id}`
        );
        console.log("res: ", response);
        setILPs(response.data.data.data); // Access the nested data array
      } catch (error) {
        showAlert("error", error);
      }
    };

    fetchILPs();
  }, [userCtx.user.id]);

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

  const toggleResources = () => {
    setShowResources(!showResources);
  };

  return (
    <div className="ILPCard">
      <h3>{ILP.learningResources[0].topic}</h3>
      <button onClick={toggleResources}>View</button>
      {showResources && (
        <div className="ILPResources">
          {ILP.learningResources.map((resource, index) => (
            <ResourceCard key={index} resource={resource} />
          ))}
          {ILP.notes.map((note, index) => (
            <ResourceCard key={index} resource={note} />
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
      {resource.url.includes(".pdf") ? (
        <a href={resource.url} target="_blank" rel="noopener noreferrer">
          View PDF
        </a>
      ) : (
        <iframe
          width="560"
          height="315"
          src={resource.url}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      )}
    </div>
  );
};

export default IndividualLearningPlan;
