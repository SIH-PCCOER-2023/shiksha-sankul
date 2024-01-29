import StudentMgmt from './StudentMgmt';
import ILP from './ILP';
import { sendGetRequest } from '../../../utils/sendHttp';
import { showAlert } from '../../../utils/alerts';
import { useEffect } from 'react';

const Dashboard = (props) => {
  // useEffect(() => {
  //   const getStudents = async () => {
  //     try {
  //       const res = await sendGetRequest('http://localhost:8080/api/v1/users');

  //       console.log(res);
  //     } catch (error) {
  //       showAlert('error', error);
  //     }
  //   };

  //   getStudents();
  // }, []);

  return (
    <>
      <div className="faculty-dash">
        {/* <StudentMgmt /> */}
        {/* <ILP /> */}
      </div>
    </>
  );
};

export default Dashboard;
