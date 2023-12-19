import Chart from '../../Chart';
import Box from '../../UI/Box';
import YouTubeCard from './YoutubeCard';

const Dashboard = (props) => {
  const boxData = [
    {
      title: 'Individual Learning Plan',
      data: [
        { iconClass: 'fa-solid fa-bullseye', label: 'Goals' },
        { iconClass: 'fa-solid fa-book', label: 'Learning Resources' },
        { iconClass: 'fa-solid fa-book', label: 'Grade' },
        { iconClass: 'fa-solid fa-book', label: 'Learning Style' },
      ],
    },
    {
      title: 'Notifications',
      data: [
        { iconClass: 'fas fa-clock', label: 'Faculty meet @9.00' },
        { iconClass: 'fas fa-check', label: 'Goals achieved' },
      ],
    },
  ];

  const chartData = {
    title: 'Progress',
    chartId: '6581920d-613e-413e-8f74-8bf49512f6a5',
    width: '450px',
    height: '300px',
  };

  const videoData = [
    {
      title: 'Stack',
      embedUrl: 'https://www.youtube.com/embed/7m1DMYAbdiY?si=bdxDdov2DsDzVdIW',
    },
    {
      title: 'Stack',
      embedUrl: 'https://www.youtube.com/embed/7m1DMYAbdiY?si=bdxDdov2DsDzVdIW',
    },
    {
      title: 'Stack',
      embedUrl: 'https://www.youtube.com/embed/7m1DMYAbdiY?si=bdxDdov2DsDzVdIW',
    },
  ];

  return (
    <>
      <div className="student-dash">
        <div className="student-dash__heading">Quick Options</div>

        <div className="box-container">
          <Box boxData={boxData} />
          <Chart chartData={chartData} />
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
