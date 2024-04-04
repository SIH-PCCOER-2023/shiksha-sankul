import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import DashboardHeader from "../../Header/DashboardHeader";
import LineChart from "../Student Dashboard/LineChart";
import { sendGetRequest } from "../../../utils/sendHttp"; // Import HTTP request function
import UserContext from "../../../store/user-context"; // Adjust the path based on your project structure

const Performance = () => {
  const [testIds, setTestIds] = useState([]);
  const [scores, setScores] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const userCtx = useContext(UserContext); // Access user context

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

  useEffect(() => {
    // Fetch user data and obtain scores
    const fetchUserData = async () => {
      try {
        const res = await sendGetRequest(
          `http://localhost:8080/api/v1/users/${userCtx.user.id}`
        );
        console.log(res);

        if (res.data.status === "success") {
          const obtainedScores = res.data.data.data.obtainedScores;
          setScores(obtainedScores); // Set obtained scores
          setTestIds(
            Array.from({ length: obtainedScores.length }, (_, i) => i + 1)
          ); // Assuming test IDs start from 1
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("An error occurred while fetching user data", error);
      }
    };

    fetchUserData(); // Fetch user data on component mount
  }, [userCtx.user.id]); // Fetch data when user id changes

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const res = await sendGetRequest(
        `http://localhost:8080/api/v1/student/obtainedScore/${userCtx.user.id}`
      );
      console.log(res);

      if (res.data.status === "success") {
        const updatedScores = res.data.data.data.obtainedScores;
        setScores(updatedScores); // Update obtained scores
        setTestIds(
          Array.from({ length: updatedScores.length }, (_, i) => i + 1)
        ); // Update test IDs
      } else {
        console.error("Failed to fetch updated scores");
      }
    } catch (error) {
      console.error("An error occurred while fetching updated scores", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <>
      <DashboardHeader />
      <Sidebar navLinks={sidebarLinks} />
      <div className="performance-container">
        {/* Card behind the LineChart */}
        <div className="line-card">
          <div className="performance-box">
            <LineChart labels={testIds} values={scores} />
          </div>
        </div>
        <div className="refresh-button-container">
          <button onClick={handleRefresh} disabled={isRefreshing}>
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Performance;
