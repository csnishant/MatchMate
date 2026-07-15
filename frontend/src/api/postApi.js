// src/api/postApi.js

import axios from "axios";
import { POST_API_END_POINT } from "../utils/constant";

export const getAllPosts = (filters, page = 1, limit = 4) => {
  const params = new URLSearchParams();

  if (filters.search) {
    params.append("city", filters.search);
  }

  if (filters.gender) {
    params.append("gender", filters.gender);
  }

  if (filters.university) {
    params.append("university", filters.university);
  }

  if (filters.hasRoom) {
    params.append("hasRoom", filters.hasRoom);
  }

  params.append("page", page);
  params.append("limit", limit);

  return axios.get(`${POST_API_END_POINT}/all-posts?${params.toString()}`, {
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
