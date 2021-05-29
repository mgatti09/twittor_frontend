import jwt_decode from "jwt-decode";
import { API_HOST, TOKEN } from "../utils/constant";

export function signUpApi(user) {
  const endpoint = `${API_HOST}/singup`;
  const userTemp = {
    ...user,
    email: user.email.toLowerCase(),
    birthdate: "1900-01-01T00:00:00Z",
  };
  delete userTemp.repeatPassword;

  const params = {
    method: "POST",
    Headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userTemp),
  };

  return fetch(endpoint, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300)
        return response.json();

      return { code: 404, message: "Email no disponible" };
    })
    .then((result) => {
      return result;
    })
    .catch((err) => err);
}

export function singInApi(user) {
  const endpoint = `${API_HOST}/login`;
  const data = {
    ...user,
    email: user.email.toLowerCase(),
  };

  const params = {
    method: "POST",
    Headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  return fetch(endpoint, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300)
        return response.json();

      return { code: 404, message: "Usuario o clave inválidos." };
    })
    .then((result) => {
      return result;
    })
    .catch((err) => err);
}

export function setTokenApi(token) {
  localStorage.setItem(TOKEN, token);
}

export function getTokenApi() {
  return localStorage.getItem(TOKEN);
}

export function logoutApi() {
  localStorage.removeItem(TOKEN);
}

export function isExpired(token) {
  const { exp } = jwt_decode(token);
  //Transformando en milisegundos
  const expire = exp * 1000;
  //fecha de hoy en milisegundos
  const timeout = expire - Date.now();

  return timeout < 0;
}

export function isUserLoggedInApi() {
  const token = getTokenApi();
  if (!token || isExpired(token)) {
    logoutApi();
    return null;
  }
  return jwt_decode(token);
}
