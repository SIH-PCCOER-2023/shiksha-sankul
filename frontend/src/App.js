import './css/style.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './components/Signup-Login/Login';

import StudentDashboard from './components/Dashboards/Student Dashboard/StudentDashboard';
import FacultyDashboard from './components/Dashboards/Faculty Dashboard/FacultyDashboard';
import { UserContextProvider } from './store/user-context';
import UserProfile from './components/UserProfile';
import PrerequisiteTest from './components/PrerequisiteTest/PrerequisiteTest';
import Assessments from './components/Dashboards/Student Dashboard/Assessments';

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
          <Route path="/pre-requisite" element={<PrerequisiteTest />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
