// src/api/userApi.js

import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";

// ✅ Update Profile API
export const updateUserProfile = (id, data) => {
  return axios.put(`${USER_API_END_POINT}/profile/${id}`, data, {
    withCredentials: true,
  });
};
