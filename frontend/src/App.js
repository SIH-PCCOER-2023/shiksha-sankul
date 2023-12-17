import './css/style.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './components/Signup-Login/Login';
import StudentDashboard from './components/Dashboards/Student Dashboard/StudentDashboard';
import { UserContextProvider } from './store/user-context';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
