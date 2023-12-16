const Sidebar = (props) => {
  return (
    <ul className="sidebar">
      {Object.entries(props.icons).map((icon, index) => {
        const disabledItemStyle = props.disabled.includes(icon[0])
          ? 'sidebar__item sidebar__link--disabled'
          : 'sidebar__item';

        return (
          <li className={disabledItemStyle} key={index}>
            <i className={`sidebar__icon ${icon[1]}`}></i>
            <a className="sidebar__link" href={icon[0]}>
              {icon[0]}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default Sidebar;
