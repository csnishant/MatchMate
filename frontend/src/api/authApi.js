import axios from "axios";
import { AUTH_API_END_POINT } from "../utils/constant";

export const loginUser = (data) => {
  return axios.post(`${AUTH_API_END_POINT}/login`, data, {
    withCredentials: true,
  });
};


export const signupUser = (data) => {
  return axios.post(`${AUTH_API_END_POINT}/signup`, data, {
    withCredentials: true,
  });
};
