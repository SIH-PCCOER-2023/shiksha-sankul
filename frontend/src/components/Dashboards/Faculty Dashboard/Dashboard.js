import StudentMgmt from './StudentMgmt';
import ILP from './ILP';

const Dashboard = (props) => {
  return (
    <>
      <div className="faculty-dash">
        <StudentMgmt />
        {/* <ILP /> */}
      </div>
    </>
  );
};

export default Dashboard;
