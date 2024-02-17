import { useContext, useEffect, useState } from "react";
import { sendGetRequest, sendPostRequest } from "../../../utils/sendHttp";
import { showAlert } from "../../../utils/alerts";
import Container from "react-bootstrap/Container";
import FacultyHeader from "../../Header/FacultyHeader";
import FacultySidebar from "../../Sidebar/FacultySidebar";
import UserContext from "../../../store/user-context";
import GoogleDriveCard from "./GoogleDriveCard";

const GoogleDriveResources = () => {
  const userCtx = useContext(UserContext);
  const [resources, setResources] = useState([]);
  const [newResourceLink, setNewResourceLink] = useState("");
  const [newResourceTitle, setNewResourceTitle] = useState("");

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
      text: "Learning Resource Management",
      url: "/learningrm",
    },
    // {
    //   icon: "fa-comments",
    //   text: "Discussion Forum",
    //   url: "/discussionforum",
    // },
    {
      icon: "fa-note-sticky",
      text: "Share Notes",
      url: "/googledriveresources",
    },
  ];

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await sendGetRequest(
          `http://localhost:8080/api/v1/pdf`
        );
        console.log(resources);
        console.log(response);
        setResources(response.data.data);
      } catch (error) {
        showAlert("error", error.message);
      }
    };

    fetchResources();
  }, []);

  const handleUpload = async () => {
    try {
      if (!newResourceLink.trim() || !newResourceTitle.trim()) {
        showAlert("error", "Please enter both link and title.");
        return;
      }

      await sendPostRequest("http://localhost:8080/api/v1/pdf", {
        title: newResourceTitle,
        link: newResourceLink,
      });

      const updatedResources = await sendGetRequest(
        `http://localhost:8080/api/v1/pdf`
      );
      setResources(updatedResources.data.data);

      setNewResourceLink("");
      setNewResourceTitle("");

      showAlert("success", "Resource uploaded successfully!");
    } catch (error) {
      showAlert("error", error.message);
    }
  };

  return (
    <>
      <FacultyHeader />
      <FacultySidebar navLinks={sidebarLinks} />
      <div className="upload-card-container">
        <div className="upload-card">
          <input
            type="text"
            placeholder="Paste Google Drive link"
            value={newResourceLink}
            onChange={(e) => setNewResourceLink(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter title"
            value={newResourceTitle}
            onChange={(e) => setNewResourceTitle(e.target.value)}
          />
          <button onClick={handleUpload}>Upload</button>
        </div>
      </div>
      {resources && (
        <div>
          <Container className="google-drive-card-container">
            <GoogleDriveCard resources={resources} />
          </Container>
        </div>
      )}
    </>
  );
};

export default GoogleDriveResources;
