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
