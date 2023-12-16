import logo_1 from './../../assets/images/aicte-logo.png';
import logo_2 from './../../assets/images/logo.png';
import logo_name from './../../assets/images/logo-name.png';

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
        <img src={logo_1} alt="Logo 1" className="navigation__logo-img"></img>
        <img src={logo_2} alt="Logo 2" className="navigation__logo-img"></img>
        <img
          src={logo_name}
          alt="Logo Name"
          className="navigation__logo-img"
        ></img>
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
            <a href="#home" className="navigation__link">
              <span>01</span>Home
            </a>
          </li>
          <li className="navigation__item">
            <a href="#about" className="navigation__link">
              <span>02</span>About Us
            </a>
          </li>
          <li className="navigation__item">
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
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
