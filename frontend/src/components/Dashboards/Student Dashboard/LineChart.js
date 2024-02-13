// LineChart.js
import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { sendGetRequest } from "../../../utils/sendHttp";
import { showAlert } from "../../../utils/alerts";

const LineChart = ({ studentId }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (studentId) {
      fetchChartData(studentId);
    }
  }, [studentId]);

  const fetchChartData = async (studentId) => {
    try {
      const res = await sendGetRequest(
        `http://localhost:8080/api/v1/tests/${studentId}`
      );
      if (res.data.status === "success") {
        setChartData(res.data.data);
        renderChart();
      }
    } catch (err) {
      showAlert("error", err.response.data.message);
    }
  };

  const renderChart = () => {
    const labels = chartData.map((data) => data.label);
    const values = chartData.map((data) => data.value);

    const ctx = document.getElementById("lineChart");

    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Line Chart",
            data: values,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      },
    });
  };

  return (
    <div className="line-chart">
      <h2>Line Chart</h2>
      <canvas id="lineChart" width="400" height="400"></canvas>
    </div>
  );
};

export default LineChart;

// // Performance.js
// import React, { useContext } from "react";
// import LineChart from "./LineChart";
// import UserContext from "../../../store/user-context";
// import Sidebar from "../../Sidebar/Sidebar";
// import DashboardHeader from "../../Header/DashboardHeader";

// const Performance = (props) => {
//   const userCtx = useContext(UserContext);
//   // Assuming you have the studentId available in userCtx or props, pass it to LineChart
//   const studentId = userCtx.studentId; // or however you retrieve the studentId
//   // rest of your code
//   const sidebarLinks = [
//     {
//       icon: "fa-home",
//       text: "Dashboard",
//       url: "/student-dashboard",
//     },
//     {
//       icon: "fa-book-open",
//       text: "Learning Center",
//       url: "/learning-center",
//     },
//     {
//       icon: "fa-pen",
//       text: "Assessments",
//       url: "/assessments",
//     },
//     {
//       icon: "fa-solid fa-chart-pie",
//       text: "Performance",
//       url: "/performance",
//     },
//   ];

//   return (
//     <>
//       <DashboardHeader />
//       <div className="student-dash">
//         <div className="student-dash__heading">Performance</div>
//         <div className="performance-box">
//           <Sidebar navLinks={sidebarLinks} />
//           <div className="performance-container">
//             {/* Pass studentId as prop */}
//             <LineChart studentId={studentId} />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Performance;
