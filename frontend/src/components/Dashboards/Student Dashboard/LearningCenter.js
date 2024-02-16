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
    // {
    //   icon: 'fa-calendar',
    //   text: 'Individual Learning Plan',
    //   url: '/ilp',
    // },
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
    // {
    //   icon: 'fa-thumbs-up',
    //   text: 'Our Recommendations',
    //   url: 'recommendations.html',
    // },
    // {
    //   icon: 'fa-solid fa-file-pdf',
    //   text: 'Certificates',
    //   url: 'certificates.html',
    // },
    {
      icon: "fa-solid fa-chart-pie",
      text: "Performance",
      url: "/performance",
    },
    {
      icon: "fa-solid fa-comments",
      text: "Discussion Forum",
      url: "/discussionforum",
    },
    {
      icon: "fa-note-sticky",
      text: "Notes",
      url: "/notes",
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
