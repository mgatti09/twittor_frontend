/* eslint-disable no-useless-escape */
export function isValidEmail(email) {
  const validEmail =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return validEmail.test(String(email).toLowerCase());
}
