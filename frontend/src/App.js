import './css/style.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './components/Signup-Login/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
