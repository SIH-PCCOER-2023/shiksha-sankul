import React, { useRef, useImperativeHandle } from 'react';

const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(ref, () => {
    return {
      focus: activate,
    };
  });

  return (
    <>
      <label htmlFor={props.id} onClick={props.labelClick}>
        {props.label}
      </label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        placeholder={props.placeholder}
        name={props.name}
        required={props.required}
        hidden={props.hidden}
        onChange={props.onChange}
        onBlur={props.onBlur}
        className={`control ${props.isValid === false ? 'invalid' : ''}`}
        min={props.min}
        max={props.max}
        accept={props.accept}
        pattern={props.pattern}
        title={props.title}
      />
    </>
  );
});

export default Input;
