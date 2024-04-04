import { useContext, useEffect } from "react";
import { showAlert } from "../../../utils/alerts";
import { sendGetRequest } from "../../../utils/sendHttp";
import Chart from "../../Chart";
import Box from "../../UI/Box";
import YouTubeCard from "./YoutubeCard";
import UserContext from "../../../store/user-context";
import TodoList from "./ToDoList";

const Dashboard = (props) => {
  const userCtx = useContext(UserContext);
  const boxData = [
    // {
    //   title: 'Individual Learning Plan',
    //   data: [
    //     { iconClass: 'fa-solid fa-bullseye', label: 'Goals' },
    //     { iconClass: 'fa-solid fa-book', label: 'Learning Resources' },
    //     { iconClass: 'fa-solid fa-book', label: 'Grade' },
    //     { iconClass: 'fa-solid fa-book', label: 'Learning Style' },
    //   ],
    // },
    // {
    //   title: 'Notifications',
    //   data: [
    //     { iconClass: 'fas fa-clock', label: 'Faculty meet @9.00' },
    //     { iconClass: 'fas fa-check', label: 'Goals achieved' },
    //   ],
    // },
  ];

  const chartData = [
    {
      title: "Progress",
      chartId: "65cb2ba7-00bd-466c-8f6e-7bd3bfc0e25b",
      width: "500px",
      height: "300px",
    },
    // {
    //   title: "Progress",
    //   chartId: "6582c81f-2847-443e-86fd-94cfc7b7f6c3",
    //   width: "450px",
    //   height: "300px",
    // },
  ];

  // const videoData = [
  //   {
  //     title: "Stack",
  //     embedUrl: "https://www.youtube.com/embed/7m1DMYAbdiY?si=bdxDdov2DsDzVdIW",
  //   },
  //   {
  //     title: "Stack",
  //     embedUrl: "https://www.youtube.com/embed/7m1DMYAbdiY?si=bdxDdov2DsDzVdIW",
  //   },
  //   {
  //     title: "Stack",
  //     embedUrl: "https://www.youtube.com/embed/7m1DMYAbdiY?si=bdxDdov2DsDzVdIW",
  //   },
  // ];

  return (
    <>
      <div className="student-dash">
        <div className="student-dash__heading">Progress</div>

        <div className="box-container">
          <Box boxData={boxData} />
          <Chart chartData={chartData} />
          <TodoList/>
        </div>

        {/* <div className="student-dash__heading">Recommendations</div>
        <div className="youtube-card-container">
          <YouTubeCard videoData={videoData} />
        </div> */}
      </div>
    </>
  );
};

export default Dashboard;
