import { useContext, useEffect, useState } from "react";
import DashboardHeader from "../../Header/DashboardHeader";
import Sidebar from "../../Sidebar/Sidebar";
import UserContext from "../../../store/user-context";
import { sendGetRequest } from "../../../utils/sendHttp";
import { showAlert } from "../../../utils/alerts";
import YouTubeCard from "./YoutubeCard";
import Container from "react-bootstrap/Container";

const LearningCenter = (props) => {
  const userCtx = useContext(UserContext);
  const [resources, setResources] = useState(false);

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
    const getLearningResources = async () => {
      try {
        // Fetch user information from context
        const { user } = userCtx;
        if (!user || !user.learnerType) {
          showAlert("error", "User information not found.");
          return;
        }

        // Determine endpoint based on user type or any other relevant condition
        let endpoint = "";
        if (user.learnerType === "slow") {
          endpoint = "http://localhost:8080/api/v1/slowLearningResources/";
        } else if (user.learnerType === "fast") {
          endpoint = "http://localhost:8080/api/v1/fastLearningResources/";
        } else {
          // Handle other cases if necessary
          showAlert("error", "Invalid learner type.");
          return;
        }

        // Fetch resources based on endpoint
        const resources = await sendGetRequest(endpoint);
        setResources(resources.data.data);
      } catch (error) {
        showAlert("error", error);
      }
    };

    getLearningResources();
  }, [userCtx]);

  return (
    <>
      <DashboardHeader />
      <Sidebar navLinks={sidebarLinks} />
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

export default LearningCenter;
