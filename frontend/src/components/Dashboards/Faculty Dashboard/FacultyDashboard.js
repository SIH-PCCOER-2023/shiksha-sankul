import DashboardHeader from "../../Header/DashboardHeader";
import Sidebar from "../../Sidebar/Sidebar";
import Dashboard from "./Dashboard";
import CRUD from "./CRUD";

const FacultyDashboard = (props) => {
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
      url: "learning-resource-management.html",
    },

    {
      icon: "fa-comments",
      text: "Discussion Forum",
      url: "/",
    },
  ];

  return (
    <>
      <DashboardHeader />
      {/* <Sidebar navLinks={sidebarLinks} /> */}
      {/* <Dashboard /> */}
      <CRUD />
    </>
  );
};

export default FacultyDashboard;
