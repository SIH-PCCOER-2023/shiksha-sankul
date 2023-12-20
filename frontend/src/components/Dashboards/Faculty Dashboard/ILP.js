import DashboardHeader from '../../Header/DashboardHeader';
import Sidebar from '../../Sidebar/Sidebar';

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
  // {
  //   icon: 'fa-solid fa-comments',
  //   text: 'Discussion Forum',
  //   url: 'discussion.html',
  // },
];

const ILP = (props) => {
  return (
    <div className="faculty__ilp">
      <DashboardHeader />
      <Sidebar navLinks={sidebarLinks} />
    </div>
  );
};

export default ILP;
