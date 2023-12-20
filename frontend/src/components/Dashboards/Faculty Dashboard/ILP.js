import { useEffect, useState } from 'react';
import DashboardHeader from '../../Header/DashboardHeader';
import Sidebar from '../../Sidebar/Sidebar';
import { sendGetRequest } from '../../../utils/sendHttp';
import StudentMgmt from './StudentMgmt';

const sidebarLinks = [
  {
    icon: 'fa-home',
    text: 'Dashboard',
    url: '/faculty-dashboard',
  },
  {
    icon: 'fa-calendar',
    text: 'Individual Learning Plan',
    url: '/faculty-dashboard/ilp',
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
    url: '/performance',
  },
  // {
  //   icon: 'fa-solid fa-comments',
  //   text: 'Discussion Forum',
  //   url: 'discussion.html',
  // },
];

const ILP = (props) => {
  const [ilps, setIlps] = useState([]);

  useEffect(() => {
    const loadIlps = async () => {
      try {
        const res = await sendGetRequest(
          'http://localhost:8080/api/v1/ilptemplates'
        );

        if (res.status === 200) {
          setIlps(res.data);
        }
      } catch (error) {}

      // setLoading(false);
    };

    loadIlps();
  }, []);

  return (
    <>
      <DashboardHeader />
      <Sidebar navLinks={sidebarLinks} />
      <StudentMgmt />
      <div className="faculty__ilp">
        {/* {ilps &&
          ilps.map((ilp, index) => (
            <div key={index}>
              <select id="templateOptions">
                {Object.entries(ilp).map((key, value) => (
                  <option key={key} value={key[1]}>
                    {key[0] === 'templateName' ? key[1] : ''}
                  </option>
                ))}
              </select>
            </div>
          ))} */}

        <select>
          {ilps &&
            ilps.map((ilp, index) => (
              <option key={index}>{ilp.templateName}</option>
            ))}
        </select>
      </div>
    </>
  );
};

export default ILP;
