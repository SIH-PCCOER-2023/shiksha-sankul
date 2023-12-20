import { useEffect, useState } from 'react';
import FileUpload from '../../UI/FileUpload';
import { sendGetRequest } from '../../../utils/sendHttp';
import { showAlert } from '../../../utils/alerts';

const StudentMgmt = (props) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const getStudents = async () => {
    try {
      setLoading(true);

      const res = await sendGetRequest('http://localhost:8080/api/v1/student');

      if (res.data.status === 'success') {
        showAlert('success', 'Students fetched');
        setStudents(res.data.data);
        setLoading(false);
        console.log(students);
      }
    } catch (err) {
      showAlert('error', err.response.data.message);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <>
      <div className="student-mgmt">
        <div className="student-mgmt__heading--primary">Student Management</div>

        <div className="student-mgmt--add">
          <div className="student-mgmt--bulk">
            <p>Add Students</p>
            <FileUpload />
          </div>
        </div>

        <div className="student-mgmt--get">
          <p>Get Students</p>
          <button onClick={getStudents}>
            <i className="fa-solid fa-arrow-down"></i>
          </button>

          {loading === true ? (
            <div>Loading...</div>
          ) : (
            students &&
            students.map((student, index) => (
              <div key={index} className="student-mgmt--student">
                <p>Name: {!loading && student.user?._id}</p>
                {/* <button onClick={handleCreateIlp}>Create ILP</button> */}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default StudentMgmt;
