import React from "react";
import { useLocation } from "react-router-dom";
import ResourceCard from "./ResourceCard";
import NoteCard from "./NoteCard";

const ILPDetails = () => {
  const location = useLocation();
  const ILP = location.state.ILP;

  if (!ILP) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ILPDetails">
      <h3>{ILP.learningResources[0].topic}</h3>
      <div className="ILPResources">
        <div className="ResourceCardContainer">
          {ILP.learningResources.map((resource, index) => (
            <ResourceCard key={index} resource={resource} />
          ))}
        </div>
      </div>
      <div className="ILPNotes">
        <div className="NoteCardContainer">
          {ILP.notes.map((note, index) => (
            <NoteCard key={index} note={note} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ILPDetails;
