// Performance.js
import React, { useState } from "react";
import TestScoreFetcher from "../Student Dashboard/TestScoreFetcher";
import FacultySidebar from "../../Sidebar/FacultySidebar";
import FacultyHeader from "../../Header/FacultyHeader";
import LineChart from "../Student Dashboard/LineChart";
const PerformanceView = (props) => {
  const [testIds, setTestIds] = useState([]);
  const [scores, setScores] = useState([]);
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
      url: "/learningrm",
    },
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

  const handleTestScores = (fetchedTestIds, fetchedScores) => {
    setTestIds(fetchedTestIds);
    setScores(fetchedScores);
  };

  return (
    <>
      <FacultyHeader />
      <FacultySidebar navLinks={sidebarLinks} />
      <div className="performance-container">
        {/* Move TestScoreFetcher component inside Performance */}
        <TestScoreFetcher onSuccess={handleTestScores} />

        {/* Card behind the LineChart */}
        <div className="line-card">
          <div className="performance-box">
            <LineChart labels={testIds} values={scores} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PerformanceView;
