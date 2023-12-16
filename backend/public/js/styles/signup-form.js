function passwordVisibleHandler(event) {
  if (event.target.getAttribute('visible') === 'true') {
    event.target.setAttribute('visible', false);
    event.target.setAttribute(
      'class',
      'fa-solid fa-eye-slash signup__form--eye-icon'
    );
    event.target.parentElement.parentElement.children[1].type = 'password';
  } else {
    event.target.setAttribute('visible', true);
    event.target.setAttribute(
      'class',
      'fa-solid fa-eye signup__form--eye-icon'
    );
    event.target.parentElement.parentElement.children[1].type = 'string';
  }
}
