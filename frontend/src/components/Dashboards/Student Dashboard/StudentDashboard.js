import DashboardHeader from '../../Header/DashboardHeader';
import Sidebar from '../../Sidebar/Sidebar';
import Dashboard from './Dashboard';

const StudentDashboard = (props) => {
  const sidebarLinks = [
    {
      icon: 'fa-home',
      text: 'Dashboard',
      url: '/student-dashboard',
    },
    {
      icon: 'fa-book-open',
      text: 'Learning Center',
      url: 'learning.html',
    },
    {
      icon: 'fa-pen',
      text: 'Tests',
      url: 'test.html',
    },
    {
      icon: 'fa-thumbs-up',
      text: 'Our Recommendations',
      url: 'recommendations.html',
    },
    {
      icon: 'fa-solid fa-file-pdf',
      text: 'Certificates',
      url: 'certificates.html',
    },
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
      <Dashboard />
    </>
  );
};

export default StudentDashboard;
