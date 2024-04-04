import { useContext, useEffect, useState } from "react";
import { sendGetRequest, sendPostRequest } from "../../../utils/sendHttp";
import { showAlert } from "../../../utils/alerts";
import UserContext from "../../../store/user-context";
import Container from "react-bootstrap/Container";
import FacultyHeader from "../../Header/FacultyHeader";
import FacultySidebar from "../../Sidebar/FacultySidebar";

const PDFUpload = () => {
  const userCtx = useContext(UserContext);
  const [pdfs, setPdfs] = useState([]);
  const [newPdfLink, setNewPdfLink] = useState("");
  const [newPdfTitle, setNewPdfTitle] = useState("");
  const [resourcesType, setResourcesType] = useState("slowresource");

  const sidebarLinks = [
    {
      icon: "fa-graduation-cap",
      text: "Student Management",
      url: "/faculty-dashboard",
    },
    {
      icon: "fa-chart-pie",
      text: "Analytics",
      url: "/analytics",
    },
    {
      icon: "fa-book-open",
      text: "Learning Resource Management",
      url: "/learningrm",
    },
    {
      icon: "fa-note-sticky",
      text: "Share Notes",
      url: "/pdfupload",
    },
    {
      icon: "fa-chart-line",
      text: "View Performance",
      url: "/performanceview",
    },
  ];

  useEffect(() => {
    const getPdfs = async () => {
      try {
        const slowPdfs = await sendGetRequest(
          "http://localhost:8080/api/v1/slowLearnerPdf"
        );
        const fastPdfs = await sendGetRequest(
          "http://localhost:8080/api/v1/fastLearnerPdf"
        );

        const combinedPdfs = [...slowPdfs.data.data, ...fastPdfs.data.data];
        setPdfs(combinedPdfs);
      } catch (error) {
        showAlert("error", error);
      }
    };

    getPdfs();
  }, []);

  const handleUpload = async () => {
    try {
      if (!newPdfLink.trim() || !newPdfTitle.trim()) {
        showAlert("error", "Please enter both link and title.");
        return;
      }

      // Validate URL
      const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
      if (!urlRegex.test(newPdfLink.trim())) {
        showAlert("error", "Please enter a valid URL.");
        return;
      }

      let endpoint = "";
      // Determine the endpoint based on the resourcesType
      if (resourcesType === "slowresource") {
        endpoint = "http://localhost:8080/api/v1/slowLearnerPdf";
      } else if (resourcesType === "fastresource") {
        endpoint = "http://localhost:8080/api/v1/fastLearnerPdf";
      }

      await sendPostRequest(endpoint, {
        title: newPdfTitle,
        link: newPdfLink,
      });

      // Fetch the updated list of PDFs
      const slowPdfs = await sendGetRequest(
        "http://localhost:8080/api/v1/slowLearnerPdf"
      );
      const fastPdfs = await sendGetRequest(
        "http://localhost:8080/api/v1/fastLearnerPdf"
      );

      // Combine the PDFs
      const combinedPdfs = [...slowPdfs.data.data, ...fastPdfs.data.data];
      setPdfs(combinedPdfs);

      // Clear input fields after successful upload
      setNewPdfLink("");
      setNewPdfTitle("");

      showAlert("success", "PDF uploaded successfully!");
    } catch (error) {
      showAlert("error", error);
    }
  };

  return (
    <>
      <FacultyHeader />
      <FacultySidebar navLinks={sidebarLinks} />
      <div className="upload-card-container">
        <div className="upload-card">
          <input
            type="text"
            placeholder="Paste PDF link"
            value={newPdfLink}
            onChange={(e) => setNewPdfLink(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter title"
            value={newPdfTitle}
            onChange={(e) => setNewPdfTitle(e.target.value)}
          />
          <select
            value={resourcesType}
            onChange={(e) => setResourcesType(e.target.value)}
          >
            <option value="slowresource">Slow Resource</option>
            <option value="fastresource">Fast Resource</option>
          </select>
          <button onClick={handleUpload}>Upload</button>
        </div>
      </div>
      <Container className="pdf-list-container">
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
      </Container>
    </>
  );
};

export default PDFUpload;
