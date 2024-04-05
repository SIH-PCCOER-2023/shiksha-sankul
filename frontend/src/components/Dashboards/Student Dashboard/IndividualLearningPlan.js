import React, { useState, useEffect, useContext } from "react";
import { sendGetRequest } from "../../../utils/sendHttp";
import { showAlert } from "../../../utils/alerts";
import UserContext from "../../../store/user-context";
import Container from "react-bootstrap/Container";
import DashboardHeader from "../../Header/DashboardHeader";
import Sidebar from "../../Sidebar/Sidebar";

const IndividualLearningPlan = () => {
  const userCtx = useContext(UserContext);
  const [ILPs, setILPs] = useState([]);

  const sidebarLinks = [
    {
      icon: "fa-home",
      text: "Dashboard",
      url: "/student-dashboard",
    },
    {
      icon: "fa-pen",
      text: "Assessments",
      url: "/assessments",
    },
    {
      icon: "fa-solid fa-chart-pie",
      text: "Performance",
      url: "/performance",
    },
    {
      icon: "fa-solid fa-layer-group",
      text: "ILP",
      url: "/individuallearningplan",
    },
    {
      icon: "fa-book-open",
      text: "Learning Center",
      url: "/learning-center",
    },
    {
      icon: "fa-note-sticky",
      text: "Notes",
      url: "/notes",
    },
    {
      icon: "fa-solid fa-comments",
      text: "Discussion Forum",
      url: "/discussionforum",
    },
  ];

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

  if (!ILPs) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <DashboardHeader />
      <Sidebar navLinks={sidebarLinks} />
      <Container>
        {ILPs.map((ILP, index) => (
          <ILPCard key={index} ILP={ILP} />
        ))}
      </Container>
    </>
  );
};

const ILPCard = ({ ILP }) => {
  const [showResources, setShowResources] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  const toggleResources = () => {
    setShowResources(!showResources);
  };

  const toggleNotes = () => {
    setShowNotes(!showNotes);
  };

  return (
    <div className="ILPCard">
      <h3>{ILP.learningResources[0].topic}</h3>
      <button onClick={toggleResources}>View Resources</button>
      {showResources && (
        <div className="ILPResources">
          <div className="ResourceCardContainer">
            {ILP.learningResources.map((resource, index) => (
              <ResourceCard key={index} resource={resource} />
            ))}
          </div>
        </div>
      )}
      <button onClick={toggleNotes}>View Notes</button>
      {showNotes && (
        <div className="ILPNotes">
          <div className="NoteCardContainer">
            {ILP.notes.map((note, index) => (
              <NoteCard key={index} note={note} />
            ))}
          </div>
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

const NoteCard = ({ note }) => {
  const handleViewNote = () => {
    window.open(note.link, "_blank");
  };

  return (
    <div className="NoteCard">
      <h4>{note.title}</h4>
      <button onClick={handleViewNote}>Note</button>
    </div>
  );
};

export default IndividualLearningPlan;
