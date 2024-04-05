import { useContext } from "react";

import DashboardHeader from "../../Header/DashboardHeader";
import Sidebar from "../../Sidebar/Sidebar";
import Dashboard from "./Dashboard";
import PrerequisiteTest from "../../PrerequisiteTest/PrerequisiteTest";
import UserContext from "../../../store/user-context";

const StudentDashboard = (props) => {
  const userCtx = useContext(UserContext);

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
      <Sidebar
        navLinks={
          // userCtx.user.prereqCompleted
          //   ? sidebarLinks
          //   : [
          //       {
          //         icon: 'fa-pen',
          //         text: 'Prerequisite Test',
          //         url: '/pre-requisiste',
          //       },
          //     ]
          sidebarLinks
        }
      />
      <Dashboard />
      {/* {!userCtx.user.prereqCompleted && <PrerequisiteTest />} */}
    </>
  );
};

export default StudentDashboard;
