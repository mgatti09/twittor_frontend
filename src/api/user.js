import { API_HOST } from "../utils/constant";
import { getTokenApi } from "./auth";

export function getUserApi(id) {
  const endpoint = `${API_HOST}/viewprofile?id=${id}`;
  const token = getTokenApi();

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(endpoint, params)
    .then((response) => {
      // eslint-disable-next-line no-throw-literal
      if (response.status >= 400) throw null;
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => err);
}

export function uploadBannerApi(file) {
  const endpoint = `${API_HOST}/banner`;
  const token = getTokenApi();

  const formData = new FormData();
  formData.append("banner", file);

  const params = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  };

  return fetch(endpoint, params)
    .then((response) => response.json())
    .then((result) => result)
    .catch((err) => err);
}

export function uploadAvatarApi(file) {
  const endpoint = `${API_HOST}/avatar`;
  const token = getTokenApi();

  const formData = new FormData();
  formData.append("avatar", file);

  const params = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  };

  return fetch(endpoint, params)
    .then((response) => response.json())
    .then((result) => result)
    .catch((err) => err);
}

export function updateProfileApi(data) {
  const endpoint = `${API_HOST}/updateprofile`;
  const token = getTokenApi();

  const params = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(endpoint, params)
    .then((response) => response.json())
    .catch((err) => err);
}
