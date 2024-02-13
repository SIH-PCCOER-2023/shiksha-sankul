import React, { useContext } from "react";
import { Link } from "react-router-dom";

import profilePic from "../../assets/images/pic-1.jpg";

import UserContext from "../../store/user-context";

const FacultySidebar = (props) => {
  const userCtx = useContext(UserContext);

  const { navLinks } = props;

  return (
    <div className="sidebar">
      {/* <div className="sidebar__closebtn">
        <i className="fas fa-times"></i>
      </div> */}

      <div className="sidebar__profile">
        <img
          src={profilePic}
          className="sidebar__profile--image"
          alt="ProfilePic"
        />
        <h3 className="sidebar__profile--name">{userCtx.user.name}</h3>
        <Link to="/facultyprofile" className="sidebar__btn">
          View Profile
        </Link>
      </div>

      <nav className="sidebar__navbar">
        {navLinks.map((link, index) => (
          <Link key={index} to={link.url} className="sidebar__navbar--link">
            <i className={`fas ${link.icon} sidebar__navbar--icon`}></i>
            <span className="sidebar__navbar--text">{link.text}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default FacultySidebar;
