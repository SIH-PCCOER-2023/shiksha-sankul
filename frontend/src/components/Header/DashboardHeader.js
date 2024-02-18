import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { showAlert } from "../../utils/alerts";
import { sendGetRequest } from "../../utils/sendHttp";

import ProfilePic from "../../assets/images/pic-1.jpg";
import logo_1 from "../../assets/images/logo.png";
import AuthContext from "../../store/auth-context";
import UserContext from "../../store/user-context";

const DashboardHeader = (props) => {
  const authCtx = useContext(AuthContext);
  const userCtx = useContext(UserContext);

  let navigate = useNavigate();

  const [isProfileActive, setProfileActive] = useState(false);

  const profileClickHandler = () => {
    isProfileActive ? setProfileActive(false) : setProfileActive(true);
  };

  const logoutHandler = async () => {
    const res = await sendGetRequest(
      "http://localhost:8080/api/v1/auth/logout"
    );

    if (res.data.status === "success") {
      showAlert("success", "Logged out successfully");

      authCtx.logout();
      userCtx.removeUserHandler();

      navigate("/");
    }
  };

  return (
    <header className="dash-header">
      <div className="dash-header__left">
        <div className="dash-header__logo">
          <img src={logo_1} alt="Logo 1"></img>
          <p>Shiksha Sankul</p>
        </div>
      </div>

      <div className="dash-header__center">
        <p>Learn, Adapt N' Thrive</p>
      </div>

      <div className="dash-header__right">
        {/* <div id="menu-btn" className="fas fa-bars"></div> */}
        <div onClick={profileClickHandler}>
          <i className="fa-solid fa-user"></i>
        </div>
      </div>

      <div
        className={`dash-header__profile ${isProfileActive ? "active" : ""}`}
      >
        <img src={ProfilePic} className="image" alt="" />
        <h3 className="name">{userCtx.user.name}</h3>
        <p className="role">{authCtx.userType}</p>
        <div className="dash-header__profile--cta">
          <Link to="/profile" className="link">
            View Profile
          </Link>

          <div className="link" onClick={logoutHandler}>
            Logout
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
