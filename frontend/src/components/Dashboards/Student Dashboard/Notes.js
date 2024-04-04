import { sendGetRequest } from "../../../utils/sendHttp";
import { showAlert } from "../../../utils/alerts";
import Sidebar from "../../Sidebar/Sidebar";
import DashboardHeader from "../../Header/DashboardHeader";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../../store/user-context";

const Notes = () => {
  const userCtx = useContext(UserContext);
  const [pdfs, setPdfs] = useState([]);
  const sidebarLinks = [
    {
      icon: "fa-home",
      text: "Dashboard",
      url: "/student-dashboard",
    },
    {
      icon: "fa-pen",
      text: "Assessments",
      url: "/assessments",
    },
    {
      icon: "fa-solid fa-chart-pie",
      text: "Performance",
      url: "/performance",
    },
    {
      icon: "fa-solid fa-layer-group",
      text: "ILP",
      url: "/individuallearningplan",
    },
    {
      icon: "fa-book-open",
      text: "Learning Center",
      url: "/learning-center",
    },
    {
      icon: "fa-note-sticky",
      text: "Notes",
      url: "/notes",
    },
    {
      icon: "fa-solid fa-comments",
      text: "Discussion Forum",
      url: "/discussionforum",
    },
  ];

  useEffect(() => {
    const getPdfs = async () => {
      try {
        // Fetch user information from context
        const { user } = userCtx;
        if (!user || !user.learnerType) {
          showAlert("error", "User information not found.");
          return;
        }

        // Determine endpoint based on user type or any other relevant condition
        let endpoint = "";
        if (user.learnerType === "slow") {
          endpoint = "http://localhost:8080/api/v1/slowLearnerPdf/";
        } else if (user.learnerType === "fast") {
          endpoint = "http://localhost:8080/api/v1/fastLearnerPdf/";
        } else {
          // Handle other cases if necessary
          showAlert("error", "Invalid learner type.");
          return;
        }

        // Fetch resources based on endpoint
        const resources = await sendGetRequest(endpoint);

        setPdfs(resources.data.data);
      } catch (error) {
        showAlert("error", error);
      }
    };

    getPdfs();
  }, [userCtx]);

  return (
    <>
      <DashboardHeader />
      <Sidebar navLinks={sidebarLinks} />
      <div className="pdf-list-container">
        <div className="pdf-grid">
          {pdfs.map((pdf, index) => (
            <div className="pdf-card" key={index}>
              <div className="pdf-info">
                <h3>{pdf.title}</h3>
                <a href={pdf.link} target="_blank" rel="noopener noreferrer">
                  <button>View</button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Notes;
