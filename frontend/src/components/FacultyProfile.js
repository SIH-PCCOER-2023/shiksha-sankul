import Sidebar from "../components/Sidebar/Sidebar";

const FacultyProfile = (props) => {
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
    // {
    //   icon: 'fa-calendar',
    //   text: 'Individual Learning Plan',
    //   url: '/faculty-dashboard/ilp',
    // },
    {
      icon: "fa-book-open",
      text: "Learning Resource Management",
      url: "/learningrm",
    },
    // {
    //   icon: 'fa-pen',
    //   text: 'Assessment Scheduling',
    //   url: 'assessment-scheduling.html',
    // },
    // {
    //   icon: 'fa-list',
    //   text: 'Decide Criteria',
    //   url: 'decide-criteria.html',
    // },

    // {
    //   icon: "fa-comments",
    //   text: "Discussion Forum",
    //   url: "/discussionforum",
    // },
    {
      icon: "fa-note-sticky",
      text: "Share Notes",
      url: "/pdfupload",
    },
  ];

  return (
    <div className="user-profile">
      <Sidebar navLinks={sidebarLinks} />
      {/* <img src="img.jpg" alt="User Avatar" className="avatar" /> */}
      <div className="profile-container">
        <br></br>
        <br></br>
        <h1>Name: Faculty</h1>
        <p>Email: f@f.com</p>
        <p>College: PCCOER</p>
      </div>
    </div>
  );
};

export default FacultyProfile;
