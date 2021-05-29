import { API_HOST } from "../utils/constant";
import { getTokenApi } from "./auth";

export function tweetApi(message) {
  const endpoint = `${API_HOST}/tweet`;
  const token = getTokenApi();

  const data = { message };

  const params = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(endpoint, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300)
        return { code: response.status, message: "Tweet enviado." };

      return { code: 500, message: "Error del servidor" };
    })
    .catch((err) => err);
}

export function getTweetsApi(idUser, page) {
  const endpoint = `${API_HOST}/tweets?id=${idUser}&page=${page}`;
  const token = getTokenApi();

  const params = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(endpoint, params)
    .then((response) => response.json())
    .catch((err) => err);
}

export function getTweetsIFollowApi(page = 1) {
  const endpoint = `${API_HOST}/tweetsIFollow?page=${page}`;
  const token = getTokenApi();

  const params = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(endpoint, params)
    .then((response) => response.json())
    .catch((err) => err);
}
