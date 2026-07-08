import axios from "axios";
import { REQUEST_API_END_POINT } from "../utils/constant";

export const fetchMyRequestsData = async () => {
  try {
    const res = await axios.get(`${REQUEST_API_END_POINT}/sent`, {
      withCredentials: true,
    });
    if (res.data.success) {
      return res.data.sentRequests;
    }
    return [];
  } catch (error) {
    console.error("Error fetching sent request:", error);
    return [];
  }
};

export const deleteSentRequestApi = async (requestId) => {
  try {
    const res = await axios.delete(
      `${REQUEST_API_END_POINT}/delete/${requestId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },

        withCredentials: true,
      },
    );
    return res.data;
  } catch (error) {
    console.error("error deleting request: ", error);
    return error.response?.data || { success: false, message: "Server error" };
  }
};
