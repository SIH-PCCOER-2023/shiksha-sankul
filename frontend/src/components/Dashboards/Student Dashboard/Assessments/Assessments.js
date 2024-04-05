import { Link } from "react-router-dom";

import DashboardHeader from "../../../Header/DashboardHeader";
import Sidebar from "../../../Sidebar/Sidebar";

const Assessments = (props) => {
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

  return (
    <>
      <DashboardHeader />
      <Sidebar navLinks={sidebarLinks} />
      <div className="student-assessments">
        <div className="student-grid">
          <Link
            className="student-assessments__academic"
            to="/assessments/academic-test"
          >
            {/* Academic Tests */}
            Pre-Requisite Test
          </Link>

          <Link
            className="student-assessments__cognitive"
            to="/assessments/cognitive-test"
          >
            {/* Cognitive Tests */}
            Quiz 1
          </Link>

          <Link
            className="student-assessments__learning"
            to="/assessments/learning-test"
          >
            {/* Learning Style Tests */}
            Quiz 2
          </Link>

          <Link
            className="student-assessments__comm"
            to="/assessments/communication-test"
          >
            {/* Communication Tests */}
            Quiz 3
          </Link>
        </div>
      </div>
    </>
  );
};

export default Assessments;
