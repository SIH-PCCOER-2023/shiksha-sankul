import { useContext, useEffect, useState } from "react";

import DashboardHeader from "../../Header/DashboardHeader";
import Sidebar from "../../Sidebar/Sidebar";
import Dashboard from "./Dashboard";

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
      icon: "fa-book-open",
      text: "Learning Center",
      url: "/learning-center",
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
      icon: "fa-note-sticky",
      text: "Notes",
      url: "/",
    },
  ];

  useEffect(() => {
    const getLearningResources = async () => {
      try {
        const resources = await sendGetRequest(
          `http://localhost:8080/api/v1/resources/`
        );

        setResources(resources.data.data);
        console.log(resources);
      } catch (error) {
        showAlert("error", error);
      }
    };

    getLearningResources();
  }, []);

  return (
    <>
      <DashboardHeader />
      <Sidebar navLinks={sidebarLinks} />
      {/* {!userCtx.user.prereqCompleted && <PrerequisiteTest />} */}
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
