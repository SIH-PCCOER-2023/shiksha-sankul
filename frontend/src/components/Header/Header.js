import logo_1 from './../../assets/images/logo.png';
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

// Other code remains unchanged


const BtnClickNavigation = (event) => {
  if (!event.target.checked) {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  }
};

const Header = (props) => {
  return (
    <div className="navigation">
      <div className="navigation__logo">
        <div className="navigation__logo--left">
          <img src={logo_1} alt="Logo 1" className="navigation__logo-img"></img>
          <p>Shiksha Sankul</p>
        </div>

        <div className="navigation__logo--center">
          <p>Learn, Adapt N' Thrive</p>
        </div>
      </div>

      <input
        type="checkbox"
        className="navigation__checkbox"
        id="navi-toggle"
        onClick={BtnClickNavigation}
      />
      <label htmlFor="navi-toggle" className="navigation__button">
        <span className="navigation__icon"></span>
      </label>
      <div className="navigation__background">&nbsp;</div>
      <nav className="navigation__nav">
        <ul className="navigation__list">
        <li className="navigation__item">
            <Link to="/homepage" className="navigation__link">
              <span>01</span>Home
            </Link>
          </li>
          <li className="navigation__item">
            <Link to="/aboutpage" className="navigation__link">
              <span>02</span>About Us
            </Link>
          </li>
          {/* <li className="navigation__item">
            <a href="#pricing" className="navigation__link">
              <span>03</span>Features
            </a>
          </li>
          <li className="navigation__item">
            <a href="#features" className="navigation__link">
              <span>04</span>Feedback
            </a>
          </li>
          <li className="navigation__item">
            <a href="#contact" className="navigation__link">
              <span>05</span>Testimonials
            </a>
          </li> */}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
