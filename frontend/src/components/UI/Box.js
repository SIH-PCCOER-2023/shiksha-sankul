const Box = ({ boxData }) => {
  return (
    <>
      {boxData.map((box, index) => (
        <div className="box" key={index}>
          <h3 className="box__title">{box.title}</h3>
          <div className="box__content">
            {box.data.map((button, index) => (
              <button key={index} className="box__link">
                <i className={button.iconClass}></i>
                <span>{button.label}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default Box;
