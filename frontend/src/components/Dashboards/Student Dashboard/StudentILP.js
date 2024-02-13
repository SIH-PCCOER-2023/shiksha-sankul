import { useContext } from 'react';

import DashboardHeader from '../../Header/DashboardHeader';
import Sidebar from '../../Sidebar/Sidebar';
// import Dashboard from './Dashboard';

import UserContext from '../../../store/user-context';
import YouTubeCard from './YoutubeCard';

const StudentILP = (props) => {
  const userCtx = useContext(UserContext);

  const sidebarLinks = [
    {
      icon: 'fa-home',
      text: 'Dashboard',
      url: '/student-dashboard',
    },
    // {
    //   icon: 'fa-calendar',
    //   text: 'Individual Learning Plan',
    //   url: '/ilp',
    // },
    {
      icon: 'fa-book-open',
      text: 'Learning Center',
      url: '/learning-center',
    },
    {
      icon: 'fa-pen',
      text: 'Assessments',
      url: '/assessments',
    },
    // {
    //   icon: 'fa-thumbs-up',
    //   text: 'Our Recommendations',
    //   url: 'recommendations.html',
    // },
    // {
    //   icon: 'fa-solid fa-file-pdf',
    //   text: 'Certificates',
    //   url: 'certificates.html',
    // },
    {
      icon: 'fa-solid fa-chart-pie',
      text: 'Performance',
      url: '/performance',
    },
    // {
    //   icon: 'fa-solid fa-comments',
    //   text: 'Discussion Forum',
    //   url: 'discussion.html',
    // },
  ];

  return (
    <>
      <DashboardHeader />
      <Sidebar navLinks={sidebarLinks} />
      {/* <Dashboard /> */}
      <div className="student__ilp">
        <h1>{userCtx.user.name}'s Individual Learning Plan</h1>
        <h2>Goals</h2>
        <div>
          <h3>Improve Maths</h3>
          <ul>
            <li>Practice Addition</li>
            <li>Learn Counting</li>
            <li>Factorization</li>
          </ul>
        </div>
        <h2>Resources</h2>
        <YouTubeCard
          videoData={[
            {
              title: 'Addition',
              url: 'https://www.youtube.com/embed/ZvL9aDGNHqA?si=SRRJmbxj-ujS7cuK',
            },
          ]}
        />
      </div>
    </>
  );
};

export default StudentILP;
