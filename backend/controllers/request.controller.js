import Request from "../models/request.js";

/* ===== SEND REQUEST ===== */

export const sendRequest = async (req, res) => {
  try {
    const senderId = req.userId;
    const receiverId = req.params.receiverId;

    console.log("Send Request API called");
    console.log("Sender ID:", senderId);
    console.log("Receiver ID:", receiverId);

    if (!receiverId) {
      return res.status(400).json({ message: "Receiver ID missing" });
    }

    // ❌ khud ko request
    if (senderId === receiverId) {
      return res
        .status(400)
        .json({ message: "You cannot send request to yourself" });
    }

    // 🔍 check already exists
    const existingRequest = await Request.findOne({
      sender: senderId,
      receiver: receiverId,
    });

    if (existingRequest) {
      return res.status(400).json({
        message: `Request already ${existingRequest.status}`,
      });
    }

    // ✅ create new request
    const newRequest = new Request({
      sender: senderId,
      receiver: receiverId,
      status: "pending",
    });

    await newRequest.save(); // 🔥 MOST IMPORTANT LINE

    res.status(201).json({
      success: true,
      message: "Request sent successfully",
      request: newRequest,
    });
  } catch (err) {
    console.error("Send Request Error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};



/* ===== ACCEPT / REJECT REQUEST ===== */
export const updateRequestStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body; // accepted / rejected

    const request = await Request.findById(requestId);

    if (!request) return res.status(404).json({ message: "Request not found" });

    // Only receiver can accept/reject
    if (request.receiver.toString() !== req.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    request.status = status;
    await request.save();

    res.status(200).json({
      success: true,
      message: `Request ${status}`,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update request" });
  }
};
export const getAcceptedRequests = async (req, res) => {
  try {
    const userId = req.userId;

    const requests = await Request.find({
      status: "accepted",
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .populate("sender receiver", "name profilePic phone")
      .lean();

    res.status(200).json({
      success: true,
      requests,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch accepted requests" });
  }
};

/* ===== GET MY REQUESTS ===== */
export const getMyRequests = async (req, res) => {
  try {
    const userId = req.userId;

    const requests = await Request.find({
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .populate("sender", "name profilePic")
      .populate("receiver", "name profilePic")
      .sort({ createdAt: -1 })
      .lean();

    // Optional: separate sent & received (frontend easy ho jata hai)
    const sentRequests = requests.filter(
      (r) => r.sender._id.toString() === userId
    );

    const receivedRequests = requests.filter(
      (r) => r.receiver._id.toString() === userId
    );

    res.status(200).json({
      success: true,
      sentRequests,
      receivedRequests,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch requests" });
  }
};

/* ===== GET RECEIVED REQUESTS ===== */
export const getReceivedRequests = async (req, res) => {
  try {
    const userId = req.userId;

    const receivedRequests = await Request.find({
      receiver: userId,
    })
      .populate("sender", "name profilePic")
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      receivedRequests,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch received requests",
    });
  }
};


export const getRequestStatus = async (req, res) => {
  try {
    const senderId = req.userId;
    const { receiverId } = req.params;

    const request = await Request.findOne({
      sender: senderId,
      receiver: receiverId,
    });

    if (!request) {
      return res.json({ status: "none" });
    }

    return res.json({ status: request.status });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Status check failed" });
  }
};
