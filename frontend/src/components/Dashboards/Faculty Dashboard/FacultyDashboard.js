import DashboardHeader from '../../Header/DashboardHeader';
import Sidebar from '../../Sidebar/Sidebar';
import StudentMgmt from './StudentMgmt';
import Dashboard from './Dashboard';

const FacultyDashboard = (props) => {
  const sidebarLinks = [
    {
      icon: 'fa-graduation-cap',
      text: 'Student Management',
      url: '/faculty-dashboard',
    },
    {
      icon: 'fa-calendar',
      text: 'Individual Learning Plan',
      url: '/faculty-dashboard/ilp',
    },
    {
      icon: 'fa-book-open',
      text: 'Learning Resource Management',
      url: 'learning-resource-management.html',
    },
    {
      icon: 'fa-pen',
      text: 'Assessment Scheduling',
      url: 'assessment-scheduling.html',
    },
    {
      icon: 'fa-list',
      text: 'Decide Criteria',
      url: 'decide-criteria.html',
    },
    {
      icon: 'fa-chart-pie',
      text: 'Analytics',
      url: 'analytics.html',
    },
    // {
    //   icon: 'fa-comments',
    //   text: 'Discussion Forum',
    //   url: 'discussion.html',
    // },
  ];

  return (
    <>
      <DashboardHeader />
      <Sidebar navLinks={sidebarLinks} />
      <Dashboard />
    </>
  );
};

export default FacultyDashboard;
