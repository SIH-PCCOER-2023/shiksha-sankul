import { useContext } from 'react';

import DashboardHeader from '../../Header/DashboardHeader';
import Sidebar from '../../Sidebar/Sidebar';
import Dashboard from './Dashboard';
import PrerequisiteTest from '../../PrerequisiteTest/PrerequisiteTest';
import UserContext from '../../../store/user-context';

const StudentDashboard = (props) => {
  const userCtx = useContext(UserContext);

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
      url: 'performance.html',
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
      {/* {!userCtx.user.prereqCompleted && <PrerequisiteTest />} */}
    </>
  );
};

export default StudentDashboard;
