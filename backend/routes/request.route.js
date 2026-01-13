import express from "express";
import isAuthenticated from "../middleware/authMiddleware.js";
import {
  sendRequest,
  updateRequestStatus,
  getAcceptedRequests,
  getMyRequests,
  getReceivedRequests,
  getRequestStatus,
  deleteRequest, // <- import
} from "../controllers/request.controller.js";

const router = express.Router();

// send request
router.post("/send/:receiverId", isAuthenticated, sendRequest);

// update request (accept / reject)
router.put("/update/:requestId", isAuthenticated, updateRequestStatus);

// status check endpoint
router.get("/status/:receiverId", isAuthenticated, getRequestStatus); // <- add this

// lists
router.get("/accepted", isAuthenticated, getAcceptedRequests);
router.get("/sent", isAuthenticated, getMyRequests);
router.get("/received", isAuthenticated, getReceivedRequests);
router.delete("/delete/:requestId", isAuthenticated, deleteRequest);

export default router;
