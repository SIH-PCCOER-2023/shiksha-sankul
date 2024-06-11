import React from "react";

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

export default NoteCard;
