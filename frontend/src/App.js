import "./css/style.css";
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Signup-Login/Login";

import StudentDashboard from "./components/Dashboards/Student Dashboard/StudentDashboard";
import FacultyDashboard from "./components/Dashboards/Faculty Dashboard/FacultyDashboard";
import { UserContextProvider } from "./store/user-context";
import UserProfile from "./components/UserProfile";
// import PrerequisiteTest from './components/PrerequisiteTest/PrerequisiteTest';
import Assessments from "./components/Dashboards/Student Dashboard/Assessments/Assessments";
import Test from "./components/Dashboards/Student Dashboard/Assessments/Test";
import ILP from "./components/Dashboards/Faculty Dashboard/ILP";
import LearningCenter from "./components/Dashboards/Student Dashboard/LearningCenter";
import StudentILP from "./components/Dashboards/Student Dashboard/StudentILP";
import Performance from "./components/Dashboards/Student Dashboard/Performance";

import Analytics from "./components/Dashboards/Faculty Dashboard/Analytics";

import LearningRM from "./components/Dashboards/Faculty Dashboard/LearningRM";
import FacultyHeader from "./components/Header/FacultyHeader";
import FacultyProfile from "./components/FacultyProfile";
import FacultySidebar from "./components/Sidebar/FacultySidebar";
import ExcelUpload from "./components/Dashboards/Faculty Dashboard/ExcelUpload";
import ContentLibrary from "./components/Dashboards/Faculty Dashboard/ContentLibrary";
import GoogleDriveResources from "./components/Dashboards/Faculty Dashboard/GoogleDriveResources";
import PDFUpload from "./components/Dashboards/Faculty Dashboard/PDFUpload";
import Notes from "./components/Dashboards/Student Dashboard/Notes";

import DiscussionForum from "./components/Dashboards/Student Dashboard/DiscussionForum";

import HomePage from "./components/Header/HomePage";
import AboutPage from "./components/Header/AboutPage";

import TodoList from "./components/Dashboards/Student Dashboard/ToDoList";
import PerformanceView from "./components/Dashboards/Faculty Dashboard/PerformanceView";
import IndividualLearningPlan from "./components/Dashboards/Student Dashboard/IndividualLearningPlan";

import ILPDetails from "./components/Dashboards/Student Dashboard/ILPDetails";
import ILPList from "./components/Dashboards/Student Dashboard/ILPList";

function App() {
  // const navigate = useNavigate();
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

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
          <Route path="/learning-center" element={<LearningCenter />} />

          <Route path="/ilp" element={<StudentILP />} />

          <Route path="/performance" element={<Performance />} />

          <Route path="/analytics" element={<Analytics />} />

          <Route path="/learningrm" element={<LearningRM />} />

          <Route path="/facultyprofile" element={<FacultyProfile />} />

          <Route path="/facultyheader" element={<FacultyHeader />} />

          <Route path="/facultysidebar" element={<FacultySidebar />} />

          <Route path="/excelupload" element={<ExcelUpload />} />

          <Route path="/contentlibrary" element={<ContentLibrary />} />

          <Route path="/pdfupload" element={<PDFUpload />} />

          <Route path="/notes" element={<Notes />} />

          <Route
            path="/googledriveresources"
            element={<GoogleDriveResources />}
          />

          <Route path="/discussionforum" element={<DiscussionForum />} />

          <Route path="/homepage" element={<HomePage />} />

          <Route path="/aboutpage" element={<AboutPage />} />

          <Route path="/todolist" element={<TodoList />} />

          <Route path="/performanceview" element={<PerformanceView />} />

          <Route
            path="/individuallearningplan"
            element={<IndividualLearningPlan />}
          />

          <Route path="/ilp-details" element={<ILPDetails />} />

          <Route path="/ilp-list" element={<ILPList />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
