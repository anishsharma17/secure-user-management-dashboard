// import axios from "axios";
// const BACKEND_URL = process.env.REACT_APP_BACKEND_API_URL;

// export const axiosClient = axios.create({ baseURL: BACKEND_URL });

import axios from "axios";

const getAccessToken = function () {
  try {
    return JSON.parse(window.localStorage.getItem("auth_ls") || '').access_token;
  } catch (e) {
    return null;
  }
};

const baseURL =
  process.env.REACT_APP_API_SERVER || "https://reqres.in";


export const axiosClient = axios.create({
  baseURL,
  maxBodyLength: Infinity,
  headers: {
    access_token: getAccessToken(),
  },
  withCredentials: true,
});
