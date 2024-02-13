import { useEffect, useState } from 'react';
import FileUpload from '../../UI/FileUpload';
import { sendGetRequest } from '../../../utils/sendHttp';
import { showAlert } from '../../../utils/alerts';
import ILPDropdown from './ILPDropdown';

const StudentMgmt = (props) => {
  const [students, setStudents] = useState([]);
  const [createILP, setCreateILP] = useState(false);

  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getStudents = async () => {
      try {
        // setLoading(true);

        const res = await sendGetRequest(
          'http://localhost:8080/api/v1/student'
        );

        if (res.data.status === 'success') {
          showAlert('success', 'Students fetched');
          setStudents(res.data.data);
          // setLoading(false);
          console.log(students);
        }
      } catch (err) {
        showAlert('error', err.response.data.message);
      }
    };

    getStudents();
  }, []);

  const handleCreateILP = () => {
    setCreateILP(true);
  };

  return (
    <>
      <div className="student-mgmt">
        <div className="student-mgmt__heading--primary">Student Management</div>

        {/* <div className="student-mgmt--add">
          <div className="student-mgmt--bulk">
            <p>Add Students</p>
            <FileUpload />
          </div>
        </div> */}

        <div className="student-mgmt--get">
          <p>Students</p>
          {/* <button onClick={getStudents}>
            <i className="fa-solid fa-arrow-down"></i>
          </button> */}

          {students &&
            students.map((student, index) => (
              <div key={index} className="student-mgmt--student">
                {student.user && (
                  <p className="student-mgmt--name">
                    Name: {student.user?.name}
                  </p>
                )}
                {student.user && (
                  <button
                    className="student-mgmt--create"
                    key={index}
                    onClick={handleCreateILP}
                  >
                    {createILP ? <ILPDropdown /> : 'Create ILP'}
                  </button>
                )}
                {/* <button onClick={handleCreateIlp}>Create ILP</button> */}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default StudentMgmt;

