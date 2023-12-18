import Chart from '../../Chart';
import Box from '../../UI/Box';
import YouTubeCard from './YoutubeCard';

const Dashboard = (props) => {
  const boxData = [
    {
      title: 'Data Structures',
      data: [
        { iconClass: 'fas fa-code', label: 'development' },
        { iconClass: 'fas fa-chart-simple', label: 'business' },
      ],
    },
    {
      title: 'Algorithms',
      data: [
        { iconClass: 'fas fa-code', label: 'development' },
        { iconClass: 'fas fa-chart-simple', label: 'business' },
      ],
    },
  ];

  const chartData = {
    title: 'Progress',
    chartId: '657be61c-32fd-4a94-8363-e9cde12a05df',
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

        <div className="student-dash__heading">Recommendations</div>
        <div className="youtube-card-container">
          <YouTubeCard videoData={videoData} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
