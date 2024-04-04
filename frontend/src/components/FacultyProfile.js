import Sidebar from "../components/Sidebar/Sidebar";
import DashboardHeader from "./Header/DashboardHeader";
import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../store/user-context";

const FacultyProfile = (props) => {
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

    // {
    //   icon: "fa-comments",
    //   text: "Discussion Forum",
    //   url: "/discussionforum",
    // },
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
  ];

  return (
    <>
      <DashboardHeader />
      <div className="user-profile">
        <Sidebar navLinks={sidebarLinks} />
        {/* <img src="img.jpg" alt="User Avatar" className="avatar" /> */}
        <div className="profile-container">
          <br></br>
          <br></br>
          <p className="name">Name: {userCtx.user.name}</p>
          <p>Email: {userCtx.user.email}</p>
          <p>Year: SE</p>
          <p>College: PCCOER</p>
        </div>
      </div>
    </>
  );
};

export default FacultyProfile;
