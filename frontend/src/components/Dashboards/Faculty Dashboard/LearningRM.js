import { useContext, useEffect, useState } from "react";
import FacultySidebar from "../../Sidebar/FacultySidebar";
import FacultyHeader from "../../Header/FacultyHeader";
import { sendGetRequest, sendPostRequest } from "../../../utils/sendHttp";
import { showAlert } from "../../../utils/alerts";
import YouTubeCard from "../Student Dashboard/YoutubeCard";
import Container from "react-bootstrap/Container";
import UserContext from "../../../store/user-context";

const LearningRM = (props) => {
  const userCtx = useContext(UserContext);
  const [resources, setResources] = useState([]);
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [newVideoTitle, setNewVideoTitle] = useState("");
  const [resourcesType, setResourcesType] = useState("slowresource");

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
    {
      icon: "fa-note-sticky",
      text: "Share Notes",
      url: "/pdfupload",
    },
    {
      icon: "fa-chart-line",
      text: "View Performance",
      url: "/performanceview",
    },
    {
      icon: "fa-chart-line",
      text: "ILP",
      url: "/faculty-dashboard/ilp",
    },
  ];

  useEffect(() => {
    const getLearningResources = async () => {
      try {
        const slowResources = await sendGetRequest(
          `http://localhost:8080/api/v1/slowLearningResources/`
        );

        const fastResources = await sendGetRequest(
          `http://localhost:8080/api/v1/fastLearningResources/`
        );

        // Combine both slow and fast resources
        const combinedResources = [
          ...slowResources.data.data,
          ...fastResources.data.data,
        ];
        setResources(combinedResources);
      } catch (error) {
        showAlert("error", error);
      }
    };

    getLearningResources();
  }, []);

  const isValidURL = (url) => {
    // Regular expression for URL validation
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
  };

  const handleUpload = async () => {
    try {
      // Check if either URL, title, or resourcesType field is empty
      if (
        !newVideoUrl.trim() ||
        !newVideoTitle.trim() ||
        !resourcesType.trim()
      ) {
        showAlert("error", "Please enter all fields.");
        return; // Stop further execution
      }

      // Check if the provided URL is valid
      if (!isValidURL(newVideoUrl.trim())) {
        showAlert("error", "Please enter a valid URL.");
        return; // Stop further execution
      }

      let endpoint = "";
      // Determine the endpoint based on the resourcesType
      if (resourcesType === "slowresource") {
        endpoint = "http://localhost:8080/api/v1/slowLearningResources/";
      } else if (resourcesType === "fastresource") {
        endpoint = "http://localhost:8080/api/v1/fastLearningResources/";
      }

      // Send the new video data to the appropriate endpoint
      await sendPostRequest(endpoint, {
        title: newVideoTitle,
        url: newVideoUrl,
        resourcesType: resourcesType, // Include resourcesType in the payload
      });

      // Fetch both slow and fast resources after successful upload
      const slowResources = await sendGetRequest(
        `http://localhost:8080/api/v1/slowLearningResources/`
      );

      const fastResources = await sendGetRequest(
        `http://localhost:8080/api/v1/fastLearningResources/`
      );

      // Combine both slow and fast resources
      const combinedResources = [
        ...slowResources.data.data,
        ...fastResources.data.data,
      ];

      // Update the state with the new list of resources
      setResources(combinedResources);

      // Clear the input fields after successful upload
      setNewVideoUrl("");
      setNewVideoTitle("");
      setResourcesType("slowresource");

      // Optionally, show a success message
      showAlert("success", "Video uploaded successfully!");
    } catch (error) {
      showAlert("error", error);
    }
  };

  return (
    <>
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
          <select
            value={resourcesType}
            onChange={(e) => setResourcesType(e.target.value)}
          >
            <option value="slowresource">Slow Resource</option>
            <option value="fastresource">Fast Resource</option>
          </select>
          <button onClick={handleUpload}>Upload</button>
        </div>
      </div>
      {resources && (
        <div>
          <Container className="youtube-card-container">
            {/* Pass resources to YouTubeCard */}
            <YouTubeCard videoData={resources} />
          </Container>
        </div>
      )}
    </>
  );
};

export default LearningRM;
