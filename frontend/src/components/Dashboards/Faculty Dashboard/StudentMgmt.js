import FileUpload from '../../UI/FileUpload';

const StudentMgmt = (props) => {
  return (
    <>
      <div className="student-mgmt">
        <h1 className="student-mgmt__heading--primary">Student Management</h1>

        <div className="student-mgmt--add">
          <div className="student-mgmt--bulk">
            <p>Add Students</p>
            <FileUpload />
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentMgmt;
