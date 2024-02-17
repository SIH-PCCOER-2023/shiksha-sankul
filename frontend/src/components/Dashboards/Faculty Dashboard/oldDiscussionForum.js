import DashboardHeader from "../../Header/DashboardHeader";
import Sidebar from "../../Sidebar/Sidebar";
import UserContext from "../../../store/user-context";
import { useContext, useEffect } from "react";
const DiscussionForum = (props) => {
  const userCtx = useContext(UserContext);
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

  return (
    <>
      <DashboardHeader />
      <Sidebar navLinks={sidebarLinks} />
    </>
  );
};

export default DiscussionForum;
