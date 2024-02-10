import { useContext, useEffect, useState } from "react";
// import DashboardHeader from "../../Header/DashboardHeader";
import FacultySidebar from "../../Sidebar/FacultySidebar";
import Dashboard from "./Dashboard";
import UserContext from "../../../store/user-context";
import { sendGetRequest, sendPostRequest } from "../../../utils/sendHttp";
import { showAlert } from "../../../utils/alerts";
import YouTubeCard from "../Student Dashboard/YoutubeCard";
import Container from "react-bootstrap/Container";
import FacultyHeader from "../../Header/FacultyHeader";

const LearningRM = (props) => {
  const userCtx = useContext(UserContext);
  const [resources, setResources] = useState(false);
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [newVideoTitle, setNewVideoTitle] = useState("");

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
    // {
    //   icon: 'fa-calendar',
    //   text: 'Individual Learning Plan',
    //   url: '/faculty-dashboard/ilp',
    // },
    {
      icon: "fa-book-open",
      text: "Learning Resource Management",
      url: "/learningrm",
    },
    // {
    //   icon: 'fa-pen',
    //   text: 'Assessment Scheduling',
    //   url: 'assessment-scheduling.html',
    // },
    // {
    //   icon: 'fa-list',
    //   text: 'Decide Criteria',
    //   url: 'decide-criteria.html',
    // },

    {
      icon: "fa-comments",
      text: "Discussion Forum",
      url: "/discussionforum",
    },
  ];

  useEffect(() => {
    const getLearningResources = async () => {
      try {
        const resources = await sendGetRequest(
          `http://localhost:8080/api/v1/resources/`
        );

        setResources(resources.data.data);
      } catch (error) {
        showAlert("error", error);
      }
    };

    getLearningResources();
  }, []);

  const handleUpload = async () => {
    try {
      // Send the new video data to the backend
      await sendPostRequest("http://localhost:8080/api/v1/resources/", {
        title: newVideoTitle,
        url: newVideoUrl,
      });

      // Fetch the updated list of resources from the backend
      const updatedResources = await sendGetRequest(
        `http://localhost:8080/api/v1/resources/`
      );

      // Update the state with the new list of resources
      setResources(updatedResources.data.data);

      // Clear the input fields after successful upload
      setNewVideoUrl("");
      setNewVideoTitle("");

      // Optionally, show a success message
      showAlert("success", "Video uploaded successfully!");
    } catch (error) {
      showAlert("error", error);
    }
  };

  return (
    <>
      {/* <DashboardHeader /> */}
      <FacultyHeader />
      <FacultySidebar navLinks={sidebarLinks} />
      <div className="upload-card-container">
        {/* Add input fields for the new video */}
        <div className="upload-card">
          <input
            type="text"
            placeholder="Paste YouTube embedded link"
            value={newVideoUrl}
            onChange={(e) => setNewVideoUrl(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter title"
            value={newVideoTitle}
            onChange={(e) => setNewVideoTitle(e.target.value)}
          />
          <button onClick={handleUpload}>Upload</button>
        </div>
      </div>
      {resources && (
        <div>
          <Container className="youtube-card-container">
            <YouTubeCard videoData={resources} />
          </Container>
        </div>
      )}
    </>
  );
};

export default LearningRM;
