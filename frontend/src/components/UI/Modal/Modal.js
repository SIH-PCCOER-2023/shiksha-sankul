import React, { useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

const Modal = (props) => {
  const closeOnEscapeKeyDown = useCallback(
    (e) => {
      if ((e.charCode || e.keyCode) === 27) {
        props.close();
      }
    },
    [props]
  );

  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
    };
  }, [closeOnEscapeKeyDown]);

  return ReactDOM.createPortal(
    <CSSTransition
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div className="modal">
        <div className="modal__content">
          <div className="modal__header">
            <div>
              <p className="modal__header--heading">
                <i className={props.icon}></i>
                {props.header}
              </p>
              <p className="modal__header--text">{props.text}</p>
            </div>
            <a href="#modal" className="modal__close" onClick={props.close}>
              &times;
            </a>
          </div>
          <div className="modal__body">{props.children}</div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById('root')
  );
};

export default Modal;
