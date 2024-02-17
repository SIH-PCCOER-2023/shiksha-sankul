import React, { useContext, useEffect, useState } from "react";
import { sendGetRequest, sendPostRequest } from "../../../utils/sendHttp";
import { showAlert } from "../../../utils/alerts";
import UserContext from "../../../store/user-context";
import FacultyHeader from "../../Header/FacultyHeader";
import FacultySidebar from "../../Sidebar/FacultySidebar";
import Container from "react-bootstrap/Container";
import ContentCard from "./ContentCard"; // Import the ContentCard component

const ContentLibrary = () => {
  const userCtx = useContext(UserContext);
  const [contents, setContents] = useState([]);
  const [newContentFile, setNewContentFile] = useState(null);

  const sidebarLinks = [
    {
      icon: "fa-graduation-cap",
      text: "Student Management",
      url: "/faculty-dashboard",
    },
    {
      icon: "fa-chart-pie",
      text: "Analytics",
      url: "/analytics",
    },
    {
      icon: "fa-book-open",
      text: "Content Library",
      url: "/content-library",
    },
    {
      icon: "fa-comments",
      text: "Discussion Forum",
      url: "/discussionforum",
    },
  ];

  useEffect(() => {
    const fetchContents = async () => {
      try {
        // Sample data for testing, replace this with your API call
        const sampleContents = [
          {
            id: 1,
            fileName: "SamplePDF.pdf",
            url: "/sample-files/SamplePDF.pdf",
          },
          {
            id: 2,
            fileName: "SamplePPT.pptx",
            url: "/sample-files/SamplePPT.pptx",
          },
        ];
        setContents(sampleContents);
      } catch (error) {
        showAlert("error", error.message);
      }
    };
    fetchContents();
  }, []);

  const handleFileChange = (event) => {
    setNewContentFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!newContentFile) {
      showAlert("error", "Please select a file to upload.");
      return;
    }

    try {
      // Sample data for testing, replace this with your API call
      const uploadedContent = {
        id: Math.floor(Math.random() * 1000) + 1,
        fileName: newContentFile.name,
        url: URL.createObjectURL(newContentFile),
      };

      setContents([...contents, uploadedContent]);
      showAlert("success", "Content uploaded successfully!");
    } catch (error) {
      showAlert("error", error.message);
    }
  };

  return (
    <>
      <FacultyHeader />
      <div className="student-dash__heading">Content Library</div>
      <FacultySidebar navLinks={sidebarLinks} />
      <div className="upload-content-container">
        <div className="upload-content">
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload</button>
        </div>
      </div>
      <Container className="content-list-container">
        {contents.map((content) => (
          <ContentCard key={content.id} content={content} />
        ))}
      </Container>
    </>
  );
};

export default ContentLibrary;
