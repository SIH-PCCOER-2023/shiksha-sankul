import Sidebar from "../components/Sidebar/Sidebar";
const UserProfile = (props) => {
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
    {
      icon: "fa-solid fa-chart-pie",
      text: "Performance",
      url: "/performance",
    },
    // {
    //   icon: 'fa-solid fa-comments',
    //   text: 'Discussion Forum',
    //   url: 'discussion.html',
    // },
    {
      icon: "fa-note-sticky",
      text: "Notes",
      url: "/notes",
    },
  ];

  return (
    <div className="user-profile">
      <Sidebar navLinks={sidebarLinks} />
      {/* <img src="img.jpg" alt="User Avatar" className="avatar" /> */}
      <div className="profile-container">
        <br></br>
        <br></br>
        <h1>Name: John</h1>
        <p>Email: abc@gmail.com</p>
        <p>Year: 2nd yr </p>
        <p>College: PCCOER</p>
      </div>
    </div>
  );
};

export default UserProfile;
