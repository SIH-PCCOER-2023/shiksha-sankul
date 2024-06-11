import React, { useState, useEffect } from "react";
import { sendGetRequest } from "../../../utils/sendHttp";
import { showAlert } from "../../../utils/alerts";
import Container from "react-bootstrap/Container";
import DashboardHeader from "../../Header/DashboardHeader";
import Sidebar from "../../Sidebar/Sidebar";
import { Link } from "react-router-dom";

const ILPList = () => {
  const [ILPs, setILPs] = useState([]);

  useEffect(() => {
    const fetchILPs = async () => {
      try {
        const response = await sendGetRequest(
          `http://localhost:8080/api/v1/ilps`
        );
        console.log("res: ", response);
        setILPs(response.data); // Assuming response.data is an array of ILPs with resources and notes
      } catch (error) {
        showAlert("error", error);
      }
    };

    fetchILPs();
  }, []);

  if (!ILPs) {
    return <div>Loading...</div>;
  }

  // Define your sidebar links here
  const sidebarLinks = [
    // Example sidebar links
    {
      icon: "fa-home",
      text: "Home",
      url: "/home",
    },
    {
      icon: "fa-info-circle",
      text: "About",
      url: "/about",
    },
  ];

  return (
    <>
      <DashboardHeader />
      <Sidebar navLinks={sidebarLinks} /> {/* Pass sidebarLinks here */}
      <Container>
        {ILPs.map((ILP, index) => (
          <ILPCard key={index} ILP={ILP} />
        ))}
      </Container>
    </>
  );
};

const ILPCard = ({ ILP }) => {
  return (
    <Link to={`/ilp-details`} state={{ ILP }}>
      <div className="ILPCard">
        <h3>{ILP.learningResources[0].topic}</h3>
      </div>
    </Link>
  );
};

export default ILPList;
