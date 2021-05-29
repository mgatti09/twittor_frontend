import { API_HOST } from "../utils/constant";
import { getTokenApi } from "./auth";

export function checkFollowApi(idUser) {
  const endpoint = `${API_HOST}/follow?id=${idUser}`;
  const token = getTokenApi();

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(endpoint, params)
    .then((response) => response.json())
    .then((result) => result)
    .catch((err) => err);
}

export function followApi(idUser) {
  const endpoint = `${API_HOST}/follow?id=${idUser}`;
  const token = getTokenApi();

  const params = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(endpoint, params)
    .then((response) => response.json())
    .then((result) => result)
    .catch((err) => err);
}

export function unfollowApi(idUser) {
  const endpoint = `${API_HOST}/follow?id=${idUser}`;
  const token = getTokenApi();

  const params = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(endpoint, params)
    .then((response) => response.json())
    .then((result) => result)
    .catch((err) => err);
}

export function getFollowsApi(paramsUrl) {
  const endpoint = `${API_HOST}/listUsers?${paramsUrl}`;
  const token = getTokenApi();

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(endpoint, params)
    .then((response) => response.json())
    .then((result) => result)
    .catch((err) => err);
}
