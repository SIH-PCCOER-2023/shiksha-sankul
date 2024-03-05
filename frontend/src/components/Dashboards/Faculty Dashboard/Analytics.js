import DashboardHeader from "../../Header/DashboardHeader";
import FacultySidebar from "../../Sidebar/FacultySidebar";
import UserContext from "../../../store/user-context";
import { useState, useContext, useEffect } from "react";
import ChartF from "./ChartF";
import { sendGetRequest } from "../../../utils/sendHttp";
import { showAlert } from "../../../utils/alerts";

const Analytics = (props) => {
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

  const [students, setStudents] = useState([]);
  const [slowLearners, setSlowLearners] = useState([]);
  const [fastLearners, setFastLearners] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await sendGetRequest("http://localhost:8080/api/v1/student");
      console.log(res);
      if (res.data.status === "success") {
        showAlert("success", "Students fetched successfully");
        setStudents(res.data.data);
        categorizeStudents(res.data.data);
      }
    } catch (err) {
      showAlert("error", err.response.data.message);
    }
  };

  const categorizeStudents = (students) => {
    const slowLearnersArray = [];
    const fastLearnersArray = [];

    students.forEach((student) => {
      if (student.user?.learnerType === "slow") {
        slowLearnersArray.push(student);
      } else if (student.user?.learnerType === "fast") {
        fastLearnersArray.push(student);
      }
    });

    setSlowLearners(slowLearnersArray);
    setFastLearners(fastLearnersArray);
  };

  const chartData = [
    {
      title: "Progress",
      chartId: "65c74ab7-3795-4309-83a6-7d4ef9e6b902",
      width: "500px",
      height: "300px",
    },
    {
      title: "Progress",
      chartId: "65c746e9-b040-4d71-8906-5fef247d94d1",
      width: "450px",
      height: "300px",
    },
  ];

  return (
    <>
      <DashboardHeader />
      <FacultySidebar navLinks={sidebarLinks} />
      <div className="student-dash">
        <div className="student-dash__heading">Analytics</div>
        <div className="box-container">
          <ChartF chartData={chartData} />
        </div>
      </div>
      <div className="App2">
        <div className="card3">
          <h2>Slow Learners</h2>
          <ul>
            {slowLearners.map((student, index) => (
              <li key={index}>{student.user?.name}</li>
            ))}
          </ul>
        </div>
        <div className="card4">
          <h2>Fast Learners</h2>
          <ul>
            {fastLearners.map((student, index) => (
              <li key={index}>{student.user?.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Analytics;
