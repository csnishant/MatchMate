import express from "express"
import isAuthenticated from "../middleware/authMiddleware.js";
import {
  getAcceptedRequests,
  getMyRequests,
  getReceivedRequests,
  sendRequest,
  updateRequestStatus,
} from "../controllers/request.controller.js";

const router = express.Router();

router.post("/send", isAuthenticated, sendRequest);

router.get("/accepted", isAuthenticated, getAcceptedRequests);
router.get("/requests", isAuthenticated, getMyRequests);
router.get("/received", isAuthenticated, getReceivedRequests);


router.put("/update/:requestId", isAuthenticated, updateRequestStatus);

export default router;
