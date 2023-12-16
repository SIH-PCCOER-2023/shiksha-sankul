function BtnClickNavigation(event) {
  if (!event.target.checked) {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  }
}
