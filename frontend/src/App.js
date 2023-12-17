import './css/style.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './components/Signup-Login/Login';
import PrerequisiteTest from './components/PrerequisiteTest/PrerequisiteTest'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/test" element={<PrerequisiteTest />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
