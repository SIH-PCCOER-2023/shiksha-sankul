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
