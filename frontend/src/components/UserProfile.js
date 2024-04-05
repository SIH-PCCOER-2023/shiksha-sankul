import { useContext } from "react";
import { Link } from "react-router-dom";

import Sidebar from "../components/Sidebar/Sidebar";
import DashboardHeader from "./Header/DashboardHeader";
import UserContext from "../store/user-context";

const UserProfile = (props) => {
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
      <Sidebar navLinks={sidebarLinks} />
      <div className="user-profile">
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

export default UserProfile;
