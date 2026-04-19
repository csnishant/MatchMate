// src/api/postApi.js

import axios from "axios";
import { POST_API_END_POINT } from "../utils/constant";

export const getAllPosts = (city) => {
  const query = city ? `?city=${city}` : "";

  return axios.get(`${POST_API_END_POINT}/all-posts${query}`, {
    withCredentials: true,
  });
};

// ✅ Get My Post
export const getMyPost = () => {
  return axios.get(`${POST_API_END_POINT}/my-post`, {
    withCredentials: true,
  });
};

// ✅ Toggle Post Status
export const togglePostStatus = (id) => {
  return axios.put(
    `${POST_API_END_POINT}/toggle/${id}`,
    {},
    { withCredentials: true },
  );
};

// ✅ Create Post
export const createPost = (data) => {
  return axios.post(`${POST_API_END_POINT}/create`, data, {
    withCredentials: true,
  });
};

// ✅ Update Post
export const updatePost = (id, data) => {
  return axios.put(`${POST_API_END_POINT}/update/${id}`, data, {
    withCredentials: true,
  });
};
