import { useContext, useEffect } from "react";

import Chart from "../../Chart";

import UserContext from "../../../store/user-context";

import Sidebar from "../../Sidebar/Sidebar";

import DashboardHeader from "../../Header/DashboardHeader";

const Performance = (props) => {
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
    {
      icon: "fa-solid fa-chart-pie",
      text: "Performance",
      url: "/performance",
    },
    // {
    //   icon: 'fa-solid fa-comments',
    //   text: 'Discussion Forum',
    //   url: 'discussion.html',
    // },
  ];

  const chartData = [
    {
      title: "Quiz",
      chartId: "6582d1c5-4d29-4304-8392-a018201da275",
      width: "500px",
      height: "300px",
    },
    {
      title: "Test 1",
      chartId: "6582d2d4-2cc4-4ba6-8d02-db93f377893a",
      width: "450px",
      height: "300px",
    },
  ];

  return (
    <>
      <DashboardHeader />
      <div className="student-dash">
        <div className="student-dash__heading">Performance</div>
        <div className="performance-box">
          <Sidebar navLinks={sidebarLinks} />
          <div className="performance-container">
            <Chart chartData={chartData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Performance;
