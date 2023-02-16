const isBtnDisable = (email, password, username = false) => {
  if (
    username.current === null ||
    email.current === null ||
    password.current === null
  ) {
    return true;
  }

  if (username && username.current.children[0].value === '') return true;
  if (email.current.children[0].value === '') return true;
  if (password.current.children[0].value === '') return true;

  return false;
};

export default isBtnDisable;
