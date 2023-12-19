import { Link } from 'react-router-dom';

import DashboardHeader from '../../Header/DashboardHeader';
import Sidebar from '../../Sidebar/Sidebar';

const Assessments = (props) => {
  const sidebarLinks = [
    {
      icon: 'fa-home',
      text: 'Dashboard',
      url: '/student-dashboard',
    },
    {
      icon: 'fa-calendar',
      text: 'Individual Learning Plan',
      url: '/ilp',
    },
    {
      icon: 'fa-book-open',
      text: 'Learning Center',
      url: 'learning.html',
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
      url: 'performance.html',
    },
    {
      icon: 'fa-solid fa-comments',
      text: 'Discussion Forum',
      url: 'discussion.html',
    },
  ];

  return (
    <>
      <DashboardHeader />
      <Sidebar navLinks={sidebarLinks} />
      <div className="student-assessments">
        <div className="student-grid">
          <Link className="student-assessments__academic" to="/pre-requisite">
            Academic Tests
          </Link>
          <div className="student-assessments__cognitive">Cognitive Tests</div>
          <div className="student-assessments__learning">
            Learning Style Tests
          </div>
          <div className="student-assessments__comm">Communication Tests</div>
        </div>
      </div>
    </>
  );
};

export default Assessments;
