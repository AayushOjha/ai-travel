import axios from "axios";
import Cookies from "js-cookie";
import { USER_TOKEN, ApiBaseUrl } from "./constants";

// Stringify the params
axios.interceptors.request.use((config) => {
  config.baseURL = ApiBaseUrl;

  // Adding default headers
  config.headers["Content-Type"] = "application/json";

  const accessToken = Cookies.get(USER_TOKEN);

  config.headers["token"] = accessToken;

  return config;
});

const getProfile = () => {
  return axios.get(`${ApiBaseUrl}/users/get-profile`);
};

const Api = { getProfile };
export default Api;
