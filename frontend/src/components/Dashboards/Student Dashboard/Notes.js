import React, { useState, useEffect } from "react";
import { sendGetRequest } from "../../../utils/sendHttp";
import { showAlert } from "../../../utils/alerts";
import Sidebar from "../../Sidebar/Sidebar";
import DashboardHeader from "../../Header/DashboardHeader";
const Notes = () => {
  const [pdfs, setPdfs] = useState([]);
  const sidebarLinks = [
    {
      icon: "fa-home",
      text: "Dashboard",
      url: "/student-dashboard",
    },
    // {
    //   icon: 'fa-calendar',
    //   text: 'Individual Learning Plan',
    //   url: '/ilp',
    // },
    {
      icon: "fa-book-open",
      text: "Learning Center",
      url: "/learning-center",
    },
    {
      icon: "fa-pen",
      text: "Assessments",
      url: "/assessments",
    },
    // {
    //   icon: 'fa-thumbs-up',
    //   text: 'Our Recommendations',
    //   url: 'recommendations.html',
    // },
    // {
    //   icon: 'fa-solid fa-file-pdf',
    //   text: 'Certificates',
    //   url: 'certificates.html',
    // },
    {
      icon: "fa-solid fa-chart-pie",
      text: "Performance",
      url: "/performance",
    },
    {
      icon: "fa-solid fa-comments",
      text: "Discussion Forum",
      url: "/discussionforum",
    },
    {
      icon: "fa-note-sticky",
      text: "Notes",
      url: "/notes",
    },
  ];

  useEffect(() => {
    const getPdfs = async () => {
      try {
        const response = await sendGetRequest(
          `http://localhost:8080/api/v1/pdf`
        );
        setPdfs(response.data.data);
      } catch (error) {
        showAlert("error", error);
      }
    };

    getPdfs();
  }, []);

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
