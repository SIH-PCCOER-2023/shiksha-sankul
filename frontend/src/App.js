import './css/style.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './components/Signup-Login/Login';

import StudentDashboard from './components/Dashboards/Student Dashboard/StudentDashboard';
import FacultyDashboard from './components/Dashboards/Faculty Dashboard/FacultyDashboard';
import { UserContextProvider } from './store/user-context';
import UserProfile from './components/UserProfile';
// import PrerequisiteTest from './components/PrerequisiteTest/PrerequisiteTest';
import Assessments from './components/Dashboards/Student Dashboard/Assessments/Assessments';
import Test from './components/Dashboards/Student Dashboard/Assessments/Test';
import ILP from './components/Dashboards/Faculty Dashboard/ILP';

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/assessments" element={<Assessments />} />

          <Route
            path="/assessments/academic-test"
            element={<Test testType="ACADEMIC" />}
          />

          <Route
            path="/assessments/cognitive-test"
            element={<Test testType="COGNITIVE" />}
          />

          <Route
            path="/assessments/learning-test"
            element={<Test testType="LEARNING STYLE" />}
          />

          <Route
            path="/assessments/communication-test"
            element={<Test testType="COMMUNICATION" />}
          />

          <Route path="/faculty-dashboard/ilp" element={<ILP />} />

          {/* <Route path="/pre-requisite" element={<PrerequisiteTest />} /> */}
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
